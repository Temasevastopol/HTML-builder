const fs = require ('fs');
const path = require ('path');
let fileName ='';
fs.readdir('secret-folder', (err, data)=>{
  data.forEach(file => {  
    fs.stat('secret-folder/'+file, (err, stats)=>{
      if(err) throw err;
      if (stats.isFile()){
        fileName = file.split('.').slice(0,1).toString();
        console.log(fileName +'     '+ path.extname(file).slice(1) +'        '+ stats.size);
      }   
    });  
  });
});