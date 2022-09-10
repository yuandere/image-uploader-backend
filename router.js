const express = require('express')
const multer = require('multer')
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/images')
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replaceAll(' ','');
    const fileShort = fileName.slice(0, fileName.indexOf('.'));
    const fileType = fileName.substring(fileName.indexOf('.'));
    cb(null, fileShort + '-' + Date.now() + fileType)
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10000000,
  },

  fileFilter(res, file, cb) {
    if (
      !file.originalname.endsWith('.jpg') &&
      !file.originalname.endsWith('.jpeg') &&
      !file.originalname.endsWith('.png')
    ) {
      return cb(new Error('Please upload a valid image!'));
    }
    cb(undefined, true);
  },

});

// router.get('/', (req, res) => {
//   res.send('default response achieved')
// })

router.post('/upload', upload.single('picture'), (req, res) => {
  const filename = req?.file.filename;
  res.status(200).send(req.headers.host + '/images/' + filename);
});

// router.get('/images/:image', (req, res) => {
//   res.sendFile(path.join(__dirname, 'images', req.params.image));
// });

module.exports = router;