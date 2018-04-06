const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  //id from item
  item: {
    type: Schema.Types.ObjectId,
    ref: 'item',
    required: true,
  },

  //id from buyer
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  //id from seller
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  time: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('order', OrderSchema);
