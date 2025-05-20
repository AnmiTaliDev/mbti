document.addEventListener('DOMContentLoaded', function() {
    // Типы MBTI и их данные
    const typesData = {
        "ISTJ": {
            description: "Методичны. Надежны. Организованы. Ценят традиции и правила.",
            functions: ["Si", "Te", "Fi", "Ne"],
            strengths: [
                "Организованность",
                "Надежность",
                "Внимание к деталям",
                "Ответственность"
            ],
            weaknesses: [
                "Жесткость",
                "Сопротивление переменам",
                "Избыточная серьезность",
                "Недостаток гибкости"
            ],
            group: "ST"
        },
        "ISFJ": {
            description: "Заботливы. Преданны. Внимательны к деталям. Создают комфорт и безопасность.",
            functions: ["Si", "Fe", "Ti", "Ne"],
            strengths: [
                "Надежность",
                "Внимание к деталям",
                "Забота о других",
                "Практичность"
            ],
            weaknesses: [
                "Трудности с переменам",
                "Самопожертвование",
                "Избегание конфликтов",
                "Перфекционизм"
            ],
            group: "SF"
        },
        "INFJ": {
            description: "Проницательны. Вдохновляют других. Ищут глубину. Видят скрытые мотивы.",
            functions: ["Ni", "Fe", "Ti", "Se"],
            strengths: [
                "Глубокое понимание людей",
                "Стратегическое мышление",
                "Верность своим идеалам",
                "Творческие решения"
            ],
            weaknesses: [
                "Перфекционизм",
                "Эмоциональное выгорание",
                "Сложно говорить 'нет'",
                "Избегание конфликтов"
            ],
            group: "NF"
        },
        "INTJ": {
            description: "Стратеги. Независимы. Аналитичны. Видят суть систем. Создают долгосрочные планы.",
            functions: ["Ni", "Te", "Fi", "Se"],
            strengths: [
                "Стратегическое мышление",
                "Независимость",
                "Решительность",
                "Аналитические способности"
            ],
            weaknesses: [
                "Перфекционизм",
                "Недостаток эмпатии",
                "Трудности с эмоциями",
                "Высокие ожидания"
            ],
            group: "NT"
        },
        "ISTP": {
            description: "Мастера техники. Логичны. Собраны. Решают проблемы здесь и сейчас.",
            functions: ["Ti", "Se", "Ni", "Fe"],
            strengths: [
                "Технические навыки",
                "Решение проблем",
                "Спокойствие",
                "Автономность"
            ],
            weaknesses: [
                "Необязательность",
                "Трудности с обязательствами",
                "Избегание эмоций",
                "Импульсивность"
            ],
            group: "ST"
        },
        "ISFP": {
            description: "Чувствительны. Эстетика. Жизнь моментом. Аутентичны. Избегают конфликтов.",
            functions: ["Fi", "Se", "Ni", "Te"],
            strengths: [
                "Художественное чутье",
                "Чувство прекрасного",
                "Аутентичность",
                "Практичность"
            ],
            weaknesses: [
                "Избегание конфликтов",
                "Сопротивление структуре",
                "Трудности с критикой",
                "Прокрастинация"
            ],
            group: "SF"
        },
        "INFP": {
            description: "Идеалисты. Поэтичны. Верны ценностям. Ищут аутентичность.",
            functions: ["Fi", "Ne", "Si", "Te"],
            strengths: [
                "Творческий подход",
                "Сильные личные ценности",
                "Эмпатия",
                "Гибкость"
            ],
            weaknesses: [
                "Самокритичность",
                "Избегание практических деталей",
                "Эмоциональная чувствительность",
                "Прокрастинация"
            ],
            group: "NF"
        },
        "INTP": {
            description: "Глубокий анализ. Логика. Концептуальное мышление. Видят противоречия.",
            functions: ["Ti", "Ne", "Si", "Fe"],
            strengths: [
                "Логический анализ",
                "Концептуальное мышление",
                "Объективность",
                "Изобретательность"
            ],
            weaknesses: [
                "Прокрастинация",
                "Трудности с практикой",
                "Социальная неловкость",
                "Пренебрежение эмоциями"
            ],
            group: "NT"
        },
        "ESTP": {
            description: "Действие. Риск. Практичность. Решают проблемы на месте. Энергичны.",
            functions: ["Se", "Ti", "Fe", "Ni"],
            strengths: [
                "Решительность",
                "Практичность",
                "Адаптивность",
                "Убедительность"
            ],
            weaknesses: [
                "Импульсивность",
                "Избегание обязательств",
                "Недостаток планирования",
                "Игнорирование последствий"
            ],
            group: "ST"
        },
        "ESFP": {
            description: "Спонтанны. Энергичны. Живут моментом. Создают атмосферу радости.",
            functions: ["Se", "Fi", "Te", "Ni"],
            strengths: [
                "Энтузиазм",
                "Спонтанность",
                "Социальные навыки",
                "Практичность"
            ],
            weaknesses: [
                "Импульсивность",
                "Трудности с планированием",
                "Избегание абстракций",
                "Чувствительность к критике"
            ],
            group: "SF"
        },
        "ENFP": {
            description: "Энтузиасты. Видят возможности. Спонтанны. Генерируют идеи. Вдохновляют других.",
            functions: ["Ne", "Fi", "Te", "Si"],
            strengths: [
                "Креативность",
                "Энтузиазм",
                "Умение вдохновлять",
                "Адаптивность"
            ],
            weaknesses: [
                "Неорганизованность",
                "Прокрастинация",
                "Трудности с рутиной",
                "Эмоциональная чувствительность"
            ],
            group: "NF"
        },
        "ENTP": {
            description: "Инноваторы. Дебаты. Интеллектуальный вызов. Видят связи между идеями.",
            functions: ["Ne", "Ti", "Fe", "Si"],
            strengths: [
                "Креативность",
                "Убедительность",
                "Быстрое мышление",
                "Адаптивность"
            ],
            weaknesses: [
                "Прокрастинация",
                "Недостаток фокуса",
                "Импульсивность",
                "Склонность к спорам"
            ],
            group: "NT"
        },
        "ESTJ": {
            description: "Организаторы. Эффективность. Структура. Придерживаются правил.",
            functions: ["Te", "Si", "Ne", "Fi"],
            strengths: [
                "Организаторские способности",
                "Прямолинейность",
                "Надежность",
                "Решительность"
            ],
            weaknesses: [
                "Негибкость",
                "Трудности с эмоциями",
                "Доминирование",
                "Нетерпимость"
            ],
            group: "ST"
        },
        "ESFJ": {
            description: "Социальные. Заботливы. Практичны. Создают гармонию. Внимательны к традициям.",
            functions: ["Fe", "Si", "Ne", "Ti"],
            strengths: [
                "Социальные навыки",
                "Организованность",
                "Практичность",
                "Надежность"
            ],
            weaknesses: [
                "Избегание конфликтов",
                "Чувствительность к критике",
                "Потребность в одобрении",
                "Жесткость суждений"
            ],
            group: "SF"
        },
        "ENFJ": {
            description: "Харизматичны. Вдохновляют других. Чувствуют настроения. Естественные лидеры.",
            functions: ["Fe", "Ni", "Se", "Ti"],
            strengths: [
                "Лидерские качества",
                "Эмпатия",
                "Умение мотивировать",
                "Организованность"
            ],
            weaknesses: [
                "Избегание критики",
                "Самопожертвование",
                "Идеализм",
                "Жажда одобрения"
            ],
            group: "NF"
        },
        "ENTJ": {
            description: "Организаторы. Лидеры. Эффективность. Стратегическое планирование.",
            functions: ["Te", "Ni", "Se", "Fi"],
            strengths: [
                "Лидерские качества",
                "Организованность",
                "Стратегическое мышление",
                "Амбициозность"
            ],
            weaknesses: [
                "Нетерпеливость",
                "Доминирование",
                "Недостаток эмпатии",
                "Трудности с эмоциями"
            ],
            group: "NT"
        }
    };

    // Элементы интерфейса для выбора режима
    const expressTestBtn = document.getElementById('express-test');
    const standardTestBtn = document.getElementById('standard-test');
    const detailedTestBtn = document.getElementById('detailed-test');
    const startTestBtn = document.getElementById('start-test');
    const testModeSection = document.querySelector('.test-intro');
    const testDescriptionSection = document.getElementById('test-description');
    const expressDescription = document.getElementById('express-description');
    const standardDescription = document.getElementById('standard-description');
    const detailedDescription = document.getElementById('detailed-description');
    const testContainer = document.getElementById('test-container');

    // Элементы интерфейса для навигации по тесту
    const prevQuestionBtn = document.getElementById('prev-question');
    const nextQuestionBtn = document.getElementById('next-question');
    const progressFill = document.getElementById('progress-fill');
    const currentQuestionEl = document.getElementById('current-question');
    const totalQuestionsEl = document.getElementById('total-questions');

    // Элементы для результатов
    const resultSection = document.getElementById('result');
    const mbtiResult = document.getElementById('mbti-result');
    const resultDescription = document.getElementById('result-description');
    const strengthsList = document.getElementById('strengths-list');
    const weaknessesList = document.getElementById('weaknesses-list');
    const cognitiveStack = document.getElementById('cognitive-stack');
    const typeLink = document.getElementById('type-link');
    const resetButton = document.getElementById('reset-test');
    
    // Элементы для шкал результатов
    const eiScoreFill = document.getElementById('ei-score-fill');
    const snScoreFill = document.getElementById('sn-score-fill');
    const tfScoreFill = document.getElementById('tf-score-fill');
    const jpScoreFill = document.getElementById('jp-score-fill');

    // Переменные для управления тестом
    let testMode = '';
    let questions = [];
    let currentQuestionIndex = 0;
    let scores = {
        'E': 0, 'I': 0,
        'S': 0, 'N': 0,
        'T': 0, 'F': 0,
        'J': 0, 'P': 0
    };

    // Инициализация обработчиков событий
    function init() {
        // Обработчики кнопок выбора режима
        expressTestBtn.addEventListener('click', () => selectTestMode('express'));
        standardTestBtn.addEventListener('click', () => selectTestMode('standard'));
        detailedTestBtn.addEventListener('click', () => selectTestMode('detailed'));
        startTestBtn.addEventListener('click', startTest);
        
        // Обработчики навигации по тесту
        prevQuestionBtn.addEventListener('click', showPrevQuestion);
        nextQuestionBtn.addEventListener('click', handleNextQuestion);
        
        // Обработчик сброса теста
        resetButton.addEventListener('click', resetTest);
    }

    // Выбор режима тестирования
    function selectTestMode(mode) {
        testMode = mode;
        
        // Скрыть выбор режима и показать описание
        testModeSection.classList.add('hidden');
        testDescriptionSection.classList.remove('hidden');
        
        // Скрыть все описания
        expressDescription.classList.add('hidden');
        standardDescription.classList.add('hidden');
        detailedDescription.classList.add('hidden');
        
        // Показать выбранное описание
        if (mode === 'express') {
            expressDescription.classList.remove('hidden');
        } else if (mode === 'standard') {
            standardDescription.classList.remove('hidden');
        } else if (mode === 'detailed') {
            detailedDescription.classList.remove('hidden');
        }
    }

    // Запуск теста
    function startTest() {
        // Выбираем вопросы в зависимости от режима
        selectQuestions();
        
        // Скрыть описание и показать контейнер с тестом
        testDescriptionSection.classList.add('hidden');
        testContainer.classList.remove('hidden');
        
        // Обновить счетчик вопросов
        totalQuestionsEl.textContent = questions.length;
        
        // Показать первый вопрос
        showQuestion(0);
    }

    // Выбор вопросов в зависимости от режима
    function selectQuestions() {
        // Сбросить список вопросов
        questions = [];
        
        // Все доступные вопросы
        const allQuestions = document.querySelectorAll('.question');
        
        if (testMode === 'express') {
            // Выбираем по одному вопросу для каждой дихотомии
            questions.push(document.getElementById('q-ei-1'));
            questions.push(document.getElementById('q-sn-1'));
            questions.push(document.getElementById('q-tf-1'));
            questions.push(document.getElementById('q-jp-1'));
        } else if (testMode === 'standard') {
            // Выбираем по 3 вопроса для каждой дихотомии
            for (let i = 1; i <= 3; i++) {
                questions.push(document.getElementById(`q-ei-${i}`));
                questions.push(document.getElementById(`q-sn-${i}`));
                questions.push(document.getElementById(`q-tf-${i}`));
                questions.push(document.getElementById(`q-jp-${i}`));
            }
        } else if (testMode === 'detailed') {
            // Используем все вопросы (по 6 для каждой дихотомии)
            allQuestions.forEach(q => questions.push(q));
        }
    }

    // Показать вопрос с указанным индексом
    function showQuestion(index) {
        // Скрыть все вопросы
        document.querySelectorAll('.question').forEach(q => q.classList.add('hidden'));
        
        // Показать текущий вопрос
        questions[index].classList.remove('hidden');
        
        // Обновить счетчик и прогресс
        currentQuestionIndex = index;
        currentQuestionEl.textContent = index + 1;
        updateProgress();
        
        // Управление кнопками навигации
        prevQuestionBtn.disabled = index === 0;
        nextQuestionBtn.textContent = index === questions.length - 1 ? 'Завершить' : 'Далее';
    }

    // Обновить прогресс-бар
    function updateProgress() {
        const percent = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressFill.style.width = `${percent}%`;
    }

    // Показать предыдущий вопрос
    function showPrevQuestion() {
        if (currentQuestionIndex > 0) {
            showQuestion(currentQuestionIndex - 1);
        }
    }

    // Обработка нажатия "Далее" или "Завершить"
    function handleNextQuestion() {
        // Проверка, выбран ли ответ
        const currentQuestion = questions[currentQuestionIndex];
        const questionName = currentQuestion.querySelector('input').name;
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
        
        if (!selectedOption) {
            alert('Пожалуйста, выберите один из вариантов ответа');
            return;
        }
        
        // Если последний вопрос, показываем результат
        if (currentQuestionIndex === questions.length - 1) {
            calculateResults();
            return;
        }
        
        // Иначе показываем следующий вопрос
        showQuestion(currentQuestionIndex + 1);
    }

    // Подсчет результатов
    function calculateResults() {
        // Сброс всех счетчиков
        scores = {
            'E': 0, 'I': 0,
            'S': 0, 'N': 0,
            'T': 0, 'F': 0,
            'J': 0, 'P': 0
        };
        
        // Подсчет голосов за каждую букву
        questions.forEach(question => {
            const dimension = question.getAttribute('data-dimension');
            const questionName = question.querySelector('input').name;
            const selectedValue = document.querySelector(`input[name="${questionName}"]:checked`).value;
            
            scores[selectedValue]++;
        });
        
        // Определяем тип MBTI
        const result = [
            scores['E'] > scores['I'] ? 'E' : 'I',
            scores['S'] > scores['N'] ? 'S' : 'N',
            scores['T'] > scores['F'] ? 'T' : 'F',
            scores['J'] > scores['P'] ? 'J' : 'P'
        ].join('');
        
        // Показываем результат
        displayResult(result);
    }

    // Отображение результата
    function displayResult(type) {
        // Скрыть контейнер теста
        testContainer.classList.add('hidden');
        
        // Получаем данные типа
        const typeData = typesData[type];
        
        // Заполняем результат
        mbtiResult.textContent = type;
        resultDescription.textContent = typeData.description;
        
        // Очищаем и заполняем списки сильных и слабых сторон
        strengthsList.innerHTML = '';
        weaknessesList.innerHTML = '';
        
        typeData.strengths.forEach(strength => {
            const li = document.createElement('li');
            li.textContent = strength;
            strengthsList.appendChild(li);
        });
        
        typeData.weaknesses.forEach(weakness => {
            const li = document.createElement('li');
            li.textContent = weakness;
            weaknessesList.appendChild(li);
        });
        
        // Заполняем когнитивный стек
        cognitiveStack.innerHTML = `<p>${typeData.functions.join(' → ')}</p>`;
        
        // Устанавливаем ссылку на страницу типа
        typeLink.href = `x${typeData.group}x.html`;
        
        // Обновляем шкалы результатов
        updateScoreVisuals();
        
        // Показываем результат
        resultSection.classList.remove('hidden');
        
        // Прокручиваем страницу к результату
        resultSection.scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Обновляем визуальное отображение шкал результатов
    function updateScoreVisuals() {
        const totalEI = scores['E'] + scores['I'];
        const totalSN = scores['S'] + scores['N'];
        const totalTF = scores['T'] + scores['F'];
        const totalJP = scores['J'] + scores['P'];
        
        const eiPercent = (scores['I'] / totalEI) * 100;
        const snPercent = (scores['N'] / totalSN) * 100;
        const tfPercent = (scores['F'] / totalTF) * 100;
        const jpPercent = (scores['P'] / totalJP) * 100;
        
        eiScoreFill.style.width = `${eiPercent}%`;
        snScoreFill.style.width = `${snPercent}%`;
        tfScoreFill.style.width = `${tfPercent}%`;
        jpScoreFill.style.width = `${jpPercent}%`;
    }

    // Сброс теста
    function resetTest() {
        // Сбрасываем выбранные ответы
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Сбрасываем индекс вопроса
        currentQuestionIndex = 0;
        
        // Скрываем результат
        resultSection.classList.add('hidden');
        
        // Показываем выбор режима
        testModeSection.classList.remove('hidden');
        
        // Прокручиваем страницу вверх к началу теста
        window.scrollTo({
            top: document.querySelector('.test-intro').offsetTop,
            behavior: 'smooth'
        });
    }

    // Запускаем инициализацию
    init();
});