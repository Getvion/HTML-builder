const fs = require('fs');

fs.readdir(`${__dirname}/secret-folder`, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((elem) => {
    if (!elem.isFile()) return;

    fs.stat(`${__dirname}/secret-folder/${elem.name}`, (error, status) => {
      const [fileName, fileExtension] = elem.name.split('.');

      console.log(`${fileName} - ${fileExtension} - ${(status.size / 1024).toFixed(2)} кб.`);
    });
  });
});
