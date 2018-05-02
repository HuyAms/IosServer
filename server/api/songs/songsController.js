const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');
const jsonfile = require('jsonfile');
const path = require('path');

exports.get = (req, res, next) => {
  const fileName = 'songs.json';
  const file = path.normalize(__dirname + '/../../../public/songs/' +
      fileName);
  console.log('path: ' + file);
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      next(error.internalServerError());
    } else {
      res.json(obj);
    }
  });

};