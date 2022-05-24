const fs = require('fs');
const path = require ('path');

fs.mkdir(__dirname+'/files-copy',{recursive : true}, err =>{
  if(err) throw err;  
});
const newPath = path.join(__dirname, 'files-copy');
const oldPath = path.join(__dirname, 'files');
console.log(newPath, oldPath);
fs.readdir(__dirname+'/files', (err, data)=>{
  if(err) throw err;
  data.forEach(file =>{    
    fs.copyFile(oldPath+'\\'+file, newPath+'\\'+file, err=>{
      if(err) throw err;
      console.log('Файл скопирован');
    });
  });
});