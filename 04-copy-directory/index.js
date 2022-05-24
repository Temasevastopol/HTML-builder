const fs = require('fs');
const path = require ('path');


fs.stat(path.join(__dirname, 'files-copy'), err=>{
  if(err) throw err;    
  fs.readdir(path.join(__dirname, 'files-copy'), (err, data)=>{
    if(err) throw err; 
    for( let file of data){  
      console.log(path.join(__dirname,'files-copy', file));  
      fs.unlinkSync(path.join(__dirname,'files-copy', file), err =>{
        if(err) throw err;  
        console.log('Folder files-copy is empty'); 
      });
    }
    // удаление папки______если понадобиться
    // fs.rmdir(path.join(__dirname, 'files-copy'), err=>{
    //   if(err) throw err;   
    //   console.log('');
    // });  
  });
});
fs.mkdir(__dirname+'/files-copy',{recursive : true}, err =>{
  if(err) throw err;  
});
const newPath = path.join(__dirname, 'files-copy');
const oldPath = path.join(__dirname, 'files');
console.log(newPath, oldPath);
fs.readdir(oldPath, (err, data)=>{
  if(err) throw err;
  data.forEach(file =>{    
    fs.copyFile(oldPath+'\\'+file, newPath+'\\'+file, err=>{
      if(err) throw err;
      console.log('Файл скопирован');
    });
  });
});