const multer = require('multer');
const path = require('path');
const error = require('../util/error');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/photos');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.fieldname + '.' + getExtension(file));
  },
});

const getExtension = (file) => {
  return file.originalname.substr(file.originalname.lastIndexOf('.') + 1,
      file.originalname.length);
};

const upload = multer({
  fileFilter: function(req, file, next) {
    const filetypes = /jpeg|jpg|png/;
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return next(null, true);
    }
    next(error.badRequestError('Invalid photo type'));
  },
  storage: storage,
});

module.exports = upload;