const fs = require('fs');

fs.readdir(__dirname, (err) => {
  // если есть ошибка, выбрасываем ошибку
  if (err) throw err;

  // переменные где хранятся пути до изначальных папок и до скопированной папки
  const pathToOriginalDir = `${__dirname}\\files`;
  const pathToCopiedDir = `${__dirname}\\files-copy`;

  // создаю папку по пути dirname/название папки
  fs.mkdir(pathToCopiedDir, () => console.log(`Путь до скопированной папки: ${pathToCopiedDir}`));

  fs.readdir(pathToOriginalDir, (err, files) => {
    // если есть ошибка, выбрасываем ошибку
    if (err) throw err;

    files.forEach((elem) => {
      // путь до изначального элементка и до скопированного
      const pathToOldFile = `${pathToOriginalDir}\\${elem}`;
      const pathToNewFile = `${pathToCopiedDir}\\${elem}`;

      // копипую файлы
      fs.copyFile(pathToOldFile, pathToNewFile, () => console.log(`Файл ${elem} успешно скопированы`));
    });
  });
});
