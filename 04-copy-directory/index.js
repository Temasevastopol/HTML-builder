const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const copyPath = path.join(__dirname, 'files-copy');
const oldPath = path.join(__dirname, 'files');

console.log(copyPath);

rimraf(copyPath, ()=>{
  console.log('Directoy files-copy was deleted');    
  makeDir();     
});

function makeDir(){
  fs.mkdir(__dirname+'/files-copy',{recursive : true}, err =>{
    if(err) throw err;  
  }); 
  copyFiles();  
}

function copyFiles(){
  fs.readdir(oldPath, (err, data)=>{
    if(err) throw err;
    console.log(data);
    data.forEach(file =>{    
      fs.copyFile(oldPath+'\\'+file, copyPath+'\\'+file, err=>{
        if(err) throw err;
        console.log('File was copied');
      });
    });
  });
}
