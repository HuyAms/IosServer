const Item = require('../api/item/itemModel');
const User = require('../api/user/userModel');
const error = require('../util/error');

exports.verifyItem = (req, res, next) => {
  const itemId = req.body.itemId;
  Item.findById(itemId).populate('seller').exec().then((item) => {
    if (item.status == 'sold') {
      next(error.badRequestError('This item has been sold', 11));
    } else {
      req.item = item;
      next();
    }
  }, (err) => {
    next(error.notFoundError('Cannot find item with that id', 1));
  });
};

exports.verifyBuyerPurchase = (req, res, next) => {
  const buyerId = req.user._id;
  const sellerId = req.item.seller._id;

  if (buyerId.equals(sellerId)) {
    next(error.badRequestError('Cannot buy your own item', 12));
  } else {

    User.findById(buyerId).select('-password').exec().then((buyer) => {
      if (!buyer) {
        next(error.notFoundError('Cannot find buyer with that id'));
      } else {
        //checkpoint
        console.log('buyer point: ', buyer.point);
        console.log('price: ', req.item.price);
        if (buyer.point < req.item.price) {
          console.log('not have enought point');
          next(error.badRequestError(
              'You do not have enough point to buy this item', 13));
        } else {
          next();
        }
      }
    }, (err) => {
      next(error.notFoundError('Cannot find buyer with that id'));
    });

  }
};

exports.processSellerDeal = (req, res, next) => {
  const price = req.item.price;
  const sellerId = req.item.seller._id;

  User.findById(sellerId).then((seller) => {
    if (!seller) {
      next(error.notFoundError('Cannot find seller with that id'));
    } else {
      seller.point += price;

      seller.save((err, saved) => {
        if (err) {
          next(err);
        } else {
          next();
        }
      });

    }
  }, (err) => {
    next(error.notFoundError('Cannot find seller with that id'));
  });

};

exports.processBuyerDell = (req, res, next) => {
  const price = req.item.price;
  const buyerId = req.user._id;

  User.findById(buyerId).then((buyer) => {
    if (!buyer) {
      next(error.notFoundError('Cannot find buyer with that id'));
    } else {
      buyer.point -= price;

      buyer.save((err, saved) => {
        if (err) {
          next(err);
        } else {
          next();
        }
      });
    }
  }, (err) => {
    next(error.notFoundError('Cannot find buyer with that id'));
  });
};

exports.updateItemStatus = (req, res, next) => {
  const item = req.item;
  item.status = 'sold';

  item.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      req.item = saved;
      next();
    }
  });

};


