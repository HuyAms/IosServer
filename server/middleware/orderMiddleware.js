const Item = require('../api/item/itemModel');
const Voucher = require('../api/voucher/voucherModel');
const User = require('../api/user/userModel');
const error = require('../util/error');

exports.verifyItem = (req, res, next) => {
  const itemId = req.params.itemId;
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

exports.verifyVoucher = (req, res, next) => {
  const voucherId = req.params.voucherId;
  Voucher.findById(voucherId).then((voucher) => {
    req.voucher = voucher;
    next();
  }).catch((err) => {
    next(error.notFoundError('Cannot find voucher with that id', 2));
  });
}

exports.verifyBuyerPurchase = (req, res, next) => {
  const buyer = req.user;
  const buyerId = req.user._id;

  let price;
  if (req.item === undefined) {
    price =  req.voucher.price;
  } else {
    price = req.item.price
    const sellerId = req.item.seller._id;
    if (buyerId.equals(sellerId)) {
      next(error.badRequestError('Cannot buy your own item', 12));
    }
  }

  if (buyer.point < price) {
    next(error.badRequestError(
        'You do not have enough point to buy this item', 13));
  } else {
    next();
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

exports.processBuyerDeal = (req, res, next) => {
  let price;
  if (req.item === undefined) {
    price =  req.voucher.price;
  } else {
    price = req.item.price
  }
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
