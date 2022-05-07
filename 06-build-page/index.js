const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');


const newFolder = path.join(__dirname, 'project-dist');
const stylesPath = path.join(__dirname, 'styles');
const oldAssetss = path.join(__dirname, 'assets');
const newAssetss = path.join(newFolder, 'assets');
const template = fs.createReadStream(path.join(__dirname, 'template.html'));
const componentsHtml = path.join(__dirname, 'components');
let templateString = '';

let newPath = path.join(__dirname, 'project-dist')

let arrPath = [newFolder];

let arrDirectorys = ['project-dist'];



fs.mkdir(newFolder, {recursive: true}, err => {
  if (err) throw err;
});

deleteFolder(newFolder)  

function deleteFolder(pathF) { console.log(pathF)
    fs.readdir(pathF, {withFileTypes: true}, function(err, files) {
      if(err) throw err;
        let dirArr = [];
        files.forEach(file => {
          if(file.isDirectory()) {
            dirArr.push(file.name)
          }
          if(file.isFile()) {fs.unlink(path.join(pathF, `${file.name}`), err => {if(err) throw err;})}  
        });
        if(dirArr) deleteFolderTwo (dirArr, pathF)
    })  
}

function deleteFolderTwo(dirArr, pathF) {
  let newDirArr = []
  for ( let i = 0; i < dirArr.length; i++) {
    fs.readdir(path.join(pathF, dirArr[i]), {withFileTypes: true}, function(err, files) { 
      {if(err) throw err;}
      if(files.length == 0) {
        fs.rmdir(path.join(pathF, dirArr[i]), err => {if(err) throw err;})
        console.log(path.join(pathF, '..'))
        deleteFolderTwo(dirArr, path.join(pathF, '..'))
      }
      files.forEach(file => {
        if(file.isDirectory()) {
          newDirArr.push(file.name); 
        }  
        if(file.isFile()) {fs.unlink(path.join(pathF, dirArr[i], file.name), err => {if(err) throw err;})} 
      })
      if(newDirArr.length > 0) {
        deleteFolderTwo( newDirArr , path.join(pathF, dirArr[i])); 
      } else if(newDirArr.length = 0) { deleteFolderTwo(dirArr, pathF)}
    })
  }
}  




  // for ( let i = 0; i < files.length; i++) { 
  //   console.log(path.join(__dirname, files[i]).name)
  //   let pathFile = path.join(__dirname, files[i])
  //   fs.stat(pathFile, (err, file) => {
  //     if (err) {
  //       console.error(err)
  //       return
  //     }

  //   })  
  //   if(file.isDirectory()) {
  //     delFils(pathFile)
  //   } else {
  //     fs.unlink(pathFile, err => {
  //       if(err) throw err
  //     })
  //   } 
  // }
    //files.forEach(file => fs.unlink(path.join(__dirname, file)))





//console.log(map)  

// fs.mkdir(newFolder, {
//   recursive: true
// }, err => {
//   if (err) throw err;
// });

// async function copyDir(oldAssetss, newAssetss) {
//   await fs.promises.mkdir(newAssetss, {
//     recursive: true
//   }, (err) => {
//     if (err) throw err;
//   });
//   const files = await fs.promises.readdir(oldAssetss, {
//     withFileTypes: true
//   });
//   files.forEach(async (file) => {
//     if (file.isFile()) {
//       const oldFile = path.join(oldAssetss, file.name);
//       const newFile = path.join(newAssetss, file.name);
//       await fs.promises.copyFile(oldFile, newFile);
//     } else {
//       copyDir(path.join(oldAssetss, file.name), path.join(newAssetss, file.name));
//     }
//   });
// }
// copyDir(oldAssetss, newAssetss);

// fs.readdir(stylesPath, (err, files) => {
//   const cssFile = fs.createWriteStream(path.join(newFolder, 'style.css'));
//   if (err) throw err;
//   for (let i = 0; i < files.length; i++) {
//     let extension = path.extname(files[i]).split('.').pop();
//     if (extension === 'css') {
//       const input = fs.createReadStream(path.join(stylesPath, files[i]));
//       input.on('data', data => {
//         cssFile.write(data.toString() + '\n');
//       });
//     }
//   }
// });

// async function creteHtmlPage() {
//   const htmlFile = fs.createWriteStream(path.join(newFolder, 'index.html'));
//   template.on('data', data => {
//     templateString = data.toString();
//     fs.readdir(componentsHtml, {
//       withFileTypes: true
//     }, (err, files) => {
//       if (err) throw err;
//       files.forEach((item, i) => {
//         if (item.isFile() && path.parse(item.name).ext === '.html') {
//           const readComp = fs.createReadStream(path.join(__dirname, 'components', item.name));
//           const nameComp = path.parse(item.name).name;
//           const extens = `{{${nameComp}}}`;
//           readComp.on('data', data => {
//             templateString = templateString.replace(extens, data.toString());
//             if (i === files.length - 1) {
//               htmlFile.write(templateString);
//             }
//           });
//         }
//       });
//     });
//   });
// }
// creteHtmlPage();