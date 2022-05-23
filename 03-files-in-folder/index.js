const fs = require ('fs');
const path = require ('path');
fs.readdir('secret-folder', (err, data)=>{
  data.forEach(file => {
    let fileName ='';

    fs.stat('secret-folder/'+file, (err, stats)=>{
      if(err) throw err;
      if (stats.isFile()){
        fileName = file.split('.').slice(0,1).toString();
        console.log(fileName +'     '+ path.extname(file).slice(1) +'        '+ stats.size);
      }   
    });  
  });
});