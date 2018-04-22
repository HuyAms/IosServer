const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderVoucherSchema = new Schema({
  //id from item
  voucher: {
    type: Schema.Types.ObjectId,
    ref: 'voucher',
    required: true,
  },

  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  time: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('order_voucher', OrderVoucherSchema);
