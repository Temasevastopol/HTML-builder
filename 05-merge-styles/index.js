const fs = require('fs');
const path = require('path');
let fileItem ='';

let bundleCss = fs.createWriteStream(path.join(__dirname, 'project-dist','bundle.css'));
fs.readdir(path.join(__dirname, 'styles'), (err, data)=>{
  if(err) throw err;
  data.forEach(file=>{
    if(path.extname(file).slice(1)==='css'){      
      let stream = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
      stream.on('data', chunk => fileItem += chunk); 
      stream.on('end', ()=>{
        fileItem += '\n';
        bundleCss.write(fileItem);        
      });
      stream.on('error', error => console.log('error ', error.message));                
    }   
  });     
});

