const fs = require('fs');
const path = require('path');

fs.readdir(__dirname, (err, files) => {
  // если есть ошибка, выбрасываем ошибку
  if (err) throw err;

  // переменные где хранятся пути до изначальных папок и до итоговой папки
  const pathToOriginalDir = path.resolve(__dirname, 'styles');
  const pathToResultDir = path.resolve(__dirname, 'project-dist');

  fs.readdir(pathToOriginalDir, (err, files) => {
    // если есть ошибка, выбрасываем ошибку
    if (err) throw err;

    fs.access(path.resolve(pathToResultDir, 'bundle.css'), fs.F_OK, (err) => {
      // удаляем файл если он есть
      fs.unlink(path.resolve(pathToResultDir, 'bundle.css'), (err) => {});

      files.forEach((elem) => {
        if (elem.includes('.css')) {
          console.log(`Найден подохдящий файл, считываю ${elem}`);
          const pathToReadingFile = path.resolve(pathToOriginalDir, elem);

          fs.readFile(pathToReadingFile, 'utf-8', (err, data) => {
            // создаю файл с итоговым текстом и записываю в него данные из других файлов стилей
            fs.appendFile(path.resolve(pathToResultDir, 'bundle.css'), data, () =>
              console.log(`Текст из файла ${elem} добавлен`)
            );
          });
        } else {
          return console.log(`Неподходящий файл ${elem} пропущен`);
        }
      });
    });
  });
});
