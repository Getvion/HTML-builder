const fs = require('fs');
const path = require('path');

fs.readdir(__dirname, (err) => {
  // если есть ошибка, выбрасываем ошибку
  if (err) throw err;

  // переменные где хранятся пути до изначальных папок и до скопированной папки
  const pathToOriginalDir = path.resolve(__dirname, 'files');
  const pathToCopiedDir = path.resolve(__dirname, 'files-copy');

  fs.rm(pathToCopiedDir, { recursive: true, force: true }, (err) => {
    if (err) console.log(err);

    fs.mkdir(pathToCopiedDir, { recursive: true }, (err) => {
      if (err) console.log(err);
    });

    fs.readdir(pathToOriginalDir, (err, files) => {
      // если есть ошибка, выбрасываем ошибку
      if (err) throw err;

      files.forEach((elem) => {
        // путь до изначального элементка и до скопированного
        const pathToOldFile = path.resolve(pathToOriginalDir, elem);
        const pathToNewFile = path.resolve(pathToCopiedDir, elem);

        // копипую файлы
        fs.copyFile(pathToOldFile, pathToNewFile, (err) => {
          if (err) throw Error;
        });
      });
    });
  });
});
