// not working
const glob = require('glob');
const sharp = require('sharp');
const path = require('path');

const targetResizeSizes = {
  thumb: 150,
  small: 320,
  medium: 640,
  large: 1080,
};

glob('public/assets/image/sample/unsplash/*.jpg', null, (er, files) => {
  console.log(files);
  for (let i = 0; i < 2; i += 1) {
    const ext = 'jpg';
    const noExtFileName = path.basename(`${files[i]}`, `.${ext}`);
    sharp(files[i])
      .resize(targetResizeSizes.small)
      .toFile(`${noExtFileName}_small.${ext}`, (err, info) => {
        if (err) {
          throw err;
        }
        console.log(info);
      });
  }
});
