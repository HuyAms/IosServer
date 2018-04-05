const Item = require('./itemModel');
const _ = require('lodash');
const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');

exports.params = (req, res, next, id) => {
  Item.findById(id).populate('seller', '_id username').exec().then((item) => {
    if (!item) {
      next(error.notFoundError('Cannot find item with that id'));
    } else {
      req.item = item;
      next();
    }
  }, (err) => {
    next(error.notFoundError('Cannot find item with that id'));
  });
};

exports.get = (req, res, next) => {
  Item.find({}).populate('seller', '_id username').exec().then((items) => {
    res.json(responseHandler.successResponse(items));
  }, (err) => {
    next(err.internalServerError());
  });
};

exports.getItemFilter = (req, res, next) => {
  const category = req.query.category;
  console.log(category)
  Item.find({category: category}).populate('seller', '_id username').exec().then((items) => {
    res.json(responseHandler.successResponse(items));
  }, (err) => {
    next(err.internalServerError());
  });
};


exports.getOne = (req, res, next) => {
  const item = req.item;
  res.json(responseHandler.successResponse(item));
};

exports.put = (req, res, next) => {
  const item = req.item;
  const update = req.body;
  _.merge(item, update);
  item.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(responseHandler.successResponse(saved));
    }
  });
};

exports.post = (req, res, next) => {
  const newItem = req.body;
  newItem.seller = req.user._id;

  Item.create(newItem).then((item) => {
    res.json(responseHandler.successResponse(item));
  }, (err) => {
    next(error.internalServerError());
  });
};

exports.delete = (req, res, next) => {
  req.item.remove((err, removed) => {
    if (err) {
      next(error.internalServerError());
    } else {
      res.json(responseHandler.successResponse(removed));
    }
  });
};
