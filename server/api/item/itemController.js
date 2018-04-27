const Item = require('./itemModel');
const _ = require('lodash');
const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');

exports.params = (req, res, next, id) => {
  Item.findById(id).populate('seller', '_id username avatarPath').exec().then((item) => {
    if (!item) {
      next(error.notFoundError('Cannot find item with that id', 1));
    } else {
      req.item = item;
      next();
    }
  }, (err) => {
    next(error.notFoundError('Cannot find item with that id', 1));
  });
};

exports.get = (req, res, next) => {
  Item.find({status: 'available'}).
      sort({time: -1}).
      populate('seller', '_id username avatarPath').
      exec().
      then((items) => {
        res.json(responseHandler.successResponse(items));
      }, (err) => {
        next(error.internalServerError());
      });
};

exports.getItemFilter = (req, res, next) => {
  let filter = {};
  const category = req.query.category;
  if (category) {
    filter = _.merge(filter, {category: category});
  }

  const price = req.query.price;
  if (price) {
    filter = _.merge(filter, {price: price});
  }

  filter = _.merge(filter, {status: "available"});

  Item.find(filter).sort({time: -1}).populate('seller', '_id username avatarPath').exec().then((items) => {
    res.json(responseHandler.successResponse(items));
  }, (err) => {
    next(error.internalServerError());
  });
};

exports.getOne = (req, res, next) => {
  const item = req.item;
  res.json(responseHandler.successResponse(item));
};

exports.getItemMe = (req, res, next) => {
  const uId = req.user._id;
  Item.find({seller: uId, status: 'available'}).sort({time: -1}).then((items) => {
    res.json(responseHandler.successResponse(items));
  }, (err) => {
    console.log(err);
    next(error.internalServerError());
  });
};

exports.getItemForUser = (req, res, next) => {
  const uId = req.params.uId;
  Item.find({seller: uId, status: 'available'}).
      sort({time: -1}).
      exec().
      then((items) => {
        res.json(responseHandler.successResponse(items));
      }, (err) => {
        next(error.internalServerError());
      });
};

exports.put = (req, res, next) => {
  const userId = req.user._id;
  const sellerId = req.item.seller._id;

  if (!userId.equals(sellerId)) {
    next(error.badRequestError("You dont have permission to edit this item", 10));
  }

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
  const userId = req.user._id;
  const sellerId = req.item.seller._id;

  if (!userId.equals(sellerId)) {
    next(error.badRequestError("You dont have permission to delete this item", 10));
  }

  req.item.remove((err, removed) => {
    if (err) {
      next(error.internalServerError());
    } else {
      res.json(responseHandler.successResponse(removed));
    }
  });
};
