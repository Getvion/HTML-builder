const fs = require('fs');

fs.readdir(__dirname, (err) => {
  // если есть ошибка, выбрасываем ошибку
  if (err) throw err;

  // переменные где хранятся пути до изначальных папок и до итоговой папки
  const pathToOriginalDir = `${__dirname}\\styles`;
  const pathToResultDir = `${__dirname}\\project-dist`;

  fs.readdir(pathToOriginalDir, (err, files) => {
    // если есть ошибка, выбрасываем ошибку
    if (err) throw err;

    files.forEach((elem) => {
      if (elem.includes('.css')) {
        console.log(`Найден подохдящий файл, считываю ${elem}`);
        const pathToReadingFile = `${pathToOriginalDir}\\${elem}`;

        fs.readFile(pathToReadingFile, 'utf8', (err, data) => {
          // создаю файл с итоговым текстом и записываю в него данные из других файлов стилей
          fs.appendFile(`${pathToResultDir}\\bundle.css`, data, () =>
            console.log(`Текст из файла ${elem} добавлен`)
          );
        });
      } else {
        return console.log(`Неподходящий файл ${elem} пропущен`);
      }
    });
  });
});
