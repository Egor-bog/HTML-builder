const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, {withFileTypes: true}, (err, files) => {
    if (err) {
        throw err
    }
  for (let file of files) {
    if (file.isFile()) {
      let fileFolder = path.join(__dirname, `secret-folder/${file.name}`);
      fs.stat(fileFolder, (err, stats) => {
        if (err) {
            throw err
        }
        const fileName = `${file.name.split('.')[0]}`;
        const extName = `${path.extname(file.name).split('.')[1]}`;
        const fileSize = `${(stats.size / 1024).toFixed(3)}kb`;
        console.log(`${fileName} - ${extName} - ${fileSize}`);
      });
    }
  }
});
