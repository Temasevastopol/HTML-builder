const fs = require('fs').promises;
const { createReadStream, createWriteStream } = require('fs');
const path = require('path');

const componentsPath = path.resolve(__dirname, 'components');
const outputPath = path.resolve(__dirname, 'project-dist');
console.log('outputPath = ' + outputPath );


fs.mkdir(outputPath, {
  recursive: true, 
  force: true
})
  .then(mergeStyles())
  .then(copyAssets())
  .then(() => fs.readdir(componentsPath))
  .then((files) =>
    createHTML(
      files
        .filter((file) => path.extname(file) == '.html')
        .map((file) => file.replace('.html', ''))
    )
  );


function mergeStyles() {
  const stylesPath = path.resolve(__dirname, 'styles');
  const writeStream = createWriteStream(path.resolve(outputPath, 'style.css'));
  fs.readdir(stylesPath).then((files) => {
    files
      .filter((file) => path.extname(file) == '.css')
      .forEach((el) => {
        createReadStream(path.resolve(stylesPath, el)).on('data', (data) => {
          writeStream.write(data.toString('utf-8'));
        });
      });
  });
}

function copyAssets() {
  const assetsPath = path.resolve(__dirname, 'assets');
  const outputAssetsPath = path.resolve(outputPath, 'assets');
  fs.mkdir(outputAssetsPath, {
    recursive: true,
  }).then(
    fs.readdir(assetsPath).then((folders) => {
      folders.forEach((folder) => {
        fs.mkdir(path.resolve(outputAssetsPath, folder), {
          recursive: true,
        }).then(
          fs
            .readdir(path.resolve(assetsPath, folder))
            .then((files) =>
              files.forEach((file) =>
                fs.copyFile(
                  path.resolve(assetsPath, folder, file),
                  path.resolve(outputAssetsPath, folder, file)
                )
              )
            )
        );
      });
    })
  );
}

function createHTML(files) {
  fs.readFile(path.resolve(__dirname, 'template.html'))
    .then((text) => {
      text = text.toString('utf-8');
      return Promise.all(
        files.map((file) =>
          fs
            .readFile(path.resolve(componentsPath, `${file}.html`))
            .then((res) => res.toString('utf-8'))
            .then((res) => {
              text = text.replace(`{{${file}}}`, res);
              return text;
            })
        )
      ).then((text) => {
        return text[text.length - 1];
      });
    })
    .then((res) => fs.writeFile(path.resolve(outputPath, 'index.html'), res));
}