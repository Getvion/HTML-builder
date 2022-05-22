const fs = require('fs');

const { stdin, stdout } = process;

stdout.write('Привет, напиши что нибудь \n');

const file = fs.createWriteStream('./02-write-file/file.txt');

stdin.on('data', (data) => {
  data.toString() === `exit\r\n` ? process.exit() : stdout.write(`Вот твое сообщение: ${data}`);

  file.write(data.toString());
});
