#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <fcntl.h>
#include <errno.h>
#include <sys/stat.h>

#define PORT 8080
#define BUFFER_SIZE 1024

// Структура для содержимого файла
typedef struct {
    char* data;
    size_t size;
} file_content_t;

// Функция для определения MIME-типа по расширению файла
const char* get_content_type(const char* filename) {
    char* ext = strrchr(filename, '.');
    if (!ext) return "text/plain";
    
    ext++;
    
    if (strcmp(ext, "html") == 0) return "text/html";
    if (strcmp(ext, "css") == 0) return "text/css";
    if (strcmp(ext, "js") == 0) return "application/javascript";
    if (strcmp(ext, "jpg") == 0 || strcmp(ext, "jpeg") == 0) return "image/jpeg";
    if (strcmp(ext, "png") == 0) return "image/png";
    if (strcmp(ext, "svg") == 0) return "image/svg+xml";
    if (strcmp(ext, "ico") == 0) return "image/x-icon";
    
    return "text/plain";
}

// Чтение файла в память
file_content_t read_file(const char* filename) {
    file_content_t content = {NULL, 0};
    FILE* file = fopen(filename, "rb");
    
    if (!file) {
        printf("Could not open file: %s\n", filename);
        return content;
    }
    
    // Определяем размер файла
    fseek(file, 0, SEEK_END);
    content.size = ftell(file);
    fseek(file, 0, SEEK_SET);
    
    // Выделяем память и читаем файл
    content.data = malloc(content.size);
    if (content.data) {
        fread(content.data, 1, content.size, file);
    } else {
        content.size = 0;
    }
    
    fclose(file);
    return content;
}

// Обработка HTTP-запроса
void handle_request(int client_socket, const char* root_dir) {
    char buffer[BUFFER_SIZE] = {0};
    int bytes_read = read(client_socket, buffer, BUFFER_SIZE - 1);
    
    if (bytes_read <= 0) {
        close(client_socket);
        return;
    }
    
    // Извлекаем путь из HTTP-запроса
    char method[10], path[255], protocol[10];
    sscanf(buffer, "%s %s %s", method, path, protocol);
    
    // Обеспечиваем безопасность пути
    if (strstr(path, "..")) {
        const char* response = "HTTP/1.1 403 Forbidden\r\nContent-Length: 9\r\n\r\nForbidden";
        write(client_socket, response, strlen(response));
        close(client_socket);
        return;
    }
    
    // Если запрос к корню, отдаем index.html
    if (strcmp(path, "/") == 0) {
        strcpy(path, "/index.html");
    }
    
    // Формируем полный путь к файлу
    char filepath[300];
    snprintf(filepath, sizeof(filepath), "%s%s", root_dir, path);
    
    // Проверяем, существует ли файл
    struct stat path_stat;
    if (stat(filepath, &path_stat) != 0 || !S_ISREG(path_stat.st_mode)) {
        const char* not_found = "HTTP/1.1 404 Not Found\r\nContent-Length: 9\r\n\r\nNot Found";
        write(client_socket, not_found, strlen(not_found));
        close(client_socket);
        return;
    }
    
    // Читаем содержимое файла
    file_content_t content = read_file(filepath);
    if (!content.data) {
        const char* server_error = "HTTP/1.1 500 Internal Server Error\r\nContent-Length: 21\r\n\r\nInternal Server Error";
        write(client_socket, server_error, strlen(server_error));
        close(client_socket);
        return;
    }
    
    // Формируем HTTP-ответ
    char header[BUFFER_SIZE];
    snprintf(header, BUFFER_SIZE,
             "HTTP/1.1 200 OK\r\n"
             "Content-Type: %s\r\n"
             "Content-Length: %zu\r\n"
             "Connection: close\r\n"
             "\r\n",
             get_content_type(filepath), content.size);
    
    // Отправляем заголовок
    write(client_socket, header, strlen(header));
    
    // Отправляем содержимое файла
    write(client_socket, content.data, content.size);
    
    // Освобождаем память и закрываем соединение
    free(content.data);
    close(client_socket);
}

int main(int argc, char* argv[]) {
    int server_fd, client_socket;
    struct sockaddr_in address;
    int opt = 1;
    int addrlen = sizeof(address);
    int port = PORT;
    char* root_dir = ".";
    
    // Обработка аргументов командной строки
    if (argc >= 2) {
        port = atoi(argv[1]);
    }
    
    if (argc >= 3) {
        root_dir = argv[2];
    }
    
    printf("Starting server on port %d with root directory: %s\n", port, root_dir);
    
    // Создаем сокет
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("Socket creation failed");
        exit(EXIT_FAILURE);
    }
    
    // Настраиваем сокет для повторного использования порта
    if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt))) {
        perror("setsockopt failed");
        exit(EXIT_FAILURE);
    }
    
    // Настраиваем адрес сервера
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(port);
    
    // Привязываем сокет к порту
    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) < 0) {
        perror("Bind failed");
        exit(EXIT_FAILURE);
    }
    
    // Начинаем прослушивание соединений
    if (listen(server_fd, 10) < 0) {
        perror("Listen failed");
        exit(EXIT_FAILURE);
    }
    
    printf("Server is running. Access at http://localhost:%d/\n", port);
    printf("Press Ctrl+C to stop.\n");
    
    // Бесконечный цикл приема соединений
    while (1) {
        if ((client_socket = accept(server_fd, (struct sockaddr*)&address, (socklen_t*)&addrlen)) < 0) {
            perror("Accept failed");
            continue;
        }
        
        // Обрабатываем запрос
        handle_request(client_socket, root_dir);
    }
    
    return 0;
}