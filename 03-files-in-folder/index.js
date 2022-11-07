const fs = require ('fs');
const path = require ('path');
let fileName =[];
fs.readdir(path.join(__dirname ,'secret-folder'), (err, data)=>{ 
  for (let file of data) {      
    fs.stat('secret-folder/'+file, (err, stats)=>{
      if(err) throw err;
      if (stats.isFile()){        
        fileName = file.split('.');          
        console.log(fileName[0] +'     '+ fileName[1] +'        '+ stats.size);        
      }   
    });    
  }   
});

