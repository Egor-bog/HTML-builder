
const { promises: fs, access } = require('fs');
const path = require('path');

async function copyDir(start, copy) {
    await fs.mkdir(copy, { recursive: true }, (err) => {
        if(err) throw err; 
     });
     
    let files = await fs.readdir(start, { withFileTypes: true });

    for (let file of files) {
        let startPath = path.join(start, file.name);
        let copyPath = path.join(copy, file.name);
        if (file.isDirectory()) {
            await copyDir(startPath, copyPath)
        }else {
            await fs.copyFile(startPath, copyPath);
        }   
    }
}
 
copyDir(path.join(__dirname, '/files'), path.join(__dirname, '/files-copy'));