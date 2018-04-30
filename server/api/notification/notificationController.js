const Notification = require('./notificationModel');
const _ = require('lodash');
const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');

exports.params = (req, res, next, id) => {
  Notification.findById(id)
  .populate('notiBody', '_id username phoneNumber email badge numberOfRecycledItems avatarPath')
  .populate('item', '_id itemName imgPath')
  .exec().then((notification) => {
    if (!notification) {
      next(error.notFoundError('Cannot find noti with that id', 1));
    } else {
      req.notification = notification;
      next();
    }
  }, (err) => {
    next(error.notFoundError('Cannot find noti with that id', 1));
  });
};

exports.get = (req, res, next) => {
  let userId = req.user._id;
  Notification.find({user: userId})
  .sort({time: -1})
  .select('-user')
  .populate('notiBody', '_id username phoneNumber email badge numberOfRecycledItems avatarPath')
  .populate('item', '_id itemName description price category status time seller imgPath')
  .exec()
  .then((notifications) => {
    res.json(responseHandler.successResponse(notifications));
  }, (err) => {
    next(error.internalServerError());
  });
};

exports.put = (req, res, next) => {
  let noti = req.notification;
  noti.isRead = true

  noti.save((err, saved) => {
    if (err) {
      next(error.internalServerError());
    } else {
      res.json(responseHandler.successResponse({status: "Successfully update notification"}));
    }
  });
};
