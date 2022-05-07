const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const projectPath = path.join(__dirname, 'project-dist');

const output = fs.createWriteStream(path.join(projectPath, 'bundle.css'));
fs.readdir(stylesPath, (err, files) => {console.log(files)
    if (err) throw err;

    files.forEach(file => { 
        if(path.extname(file) === '.css') {console.log('true')
            const input = fs.createReadStream(path.join(stylesPath, file));
            input.on('data', data => {
              output.write(data.toString() + '\n');
            })
        }
    })
})

