project('mbti-server', 'c',
  version : '1.0.0',
  default_options : ['warning_level=3'])

executable('mbti-server',
  'main.c',
  install : true)

# Копирование HTML, CSS и JS файлов в директорию сборки
install_data(
  [
    '../index.html',
    '../xNFx.html',
    '../xNTx.html',
    '../xSFx.html',
    '../xSTx.html',
    '../test.html',
    '../test.js',
    '../styles.css'
  ],
  install_dir : get_option('datadir') / 'mbti-server'
)