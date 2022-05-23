const fs = require('fs');
const path = require('path');

const createFolder = (dirPath, dirName) => {
  fs.access(dirPath, (error) => {
    error ? fs.mkdir(dirPath, () => console.log(`Папка ${dirName} создана в ${dirPath}`)) : null;
  });
};

const createStyles = (pathToStyleDir, projectDistDir) => {
  fs.readdir(pathToStyleDir, (_, files) => {
    fs.access(path.resolve(projectDistDir, 'style.css'), fs.F_OK, () => {
      fs.unlink(path.resolve(projectDistDir, 'style.css'), () => {});

      files.forEach((elem) => {
        if (elem.includes('.css')) {
          const pathToReadingFile = path.resolve(pathToStyleDir, elem);

          fs.readFile(pathToReadingFile, 'utf-8', (_, data) => {
            fs.appendFile(path.resolve(projectDistDir, 'style.css'), data, () => {});
          });
        }
      });
    });
  });
};

const copyDir = (folderPath, folderCopyPath) => {
  fs.rm(folderCopyPath, { recursive: true, force: true }, (err) => {
    if (err) throw err;

    fs.mkdir(folderCopyPath, { recursive: true }, () => {});

    fs.readdir(folderPath, { withFileTypes: true }, (_, files) => {
      files.forEach((file) => {
        const fileName = file.name;
        const fileOriginalPath = path.join(folderPath, fileName);
        const fileCopyPath = path.join(folderCopyPath, fileName);

        if (file.isFile()) {
          fs.copyFile(fileOriginalPath, fileCopyPath, () => {});
        } else {
          copyDir(fileOriginalPath, fileCopyPath);
        }
      });
    });
  });
};

const createHTML = (HTMLFilePath, HTMLTemplatePath) => {
  fs.copyFile(HTMLTemplatePath, HTMLFilePath, () => {});

  fs.readFile(HTMLTemplatePath, 'utf-8', (err, fileData) => {
    if (err) throw err;

    let templateData = fileData;
    const templateTags = fileData.match(/{{\w+}}/g);

    templateTags.forEach((tag) => {
      const tagPath = path.join(__dirname, '/components', `${tag.slice(2, -2)}.html`);

      fs.readFile(tagPath, 'utf-8', (err, dataTag) => {
        if (err) throw err;

        templateData = templateData.replace(tag, dataTag);

        fs.writeFile(HTMLFilePath, templateData, () => {});
      });
    });
  });
};

const buildPage = () => {
  const pathToStyleDir = path.resolve(__dirname, 'styles');
  const assetsPath = path.resolve(__dirname, 'assets');
  const HTMLTemplatePath = path.resolve(__dirname, 'template.html');

  const projectDistDir = path.resolve(__dirname, 'project-dist');
  const assetsCopyPath = path.resolve(projectDistDir, 'assets');
  const HTMLFilePath = path.join(projectDistDir, 'index.html');

  createFolder(projectDistDir, 'project-dist');
  copyDir(assetsPath, assetsCopyPath);
  createStyles(pathToStyleDir, projectDistDir);
  createHTML(HTMLFilePath, HTMLTemplatePath);
};

buildPage();
