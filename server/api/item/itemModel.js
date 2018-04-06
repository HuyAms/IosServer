const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },

  imgPath: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  status: {
    type: String,
    enum: ['available', 'sold'],
    default: 'available',
    required: true,
  },

  category: {
    type: String,
    enum: ['clothing', 'homewares', 'accessories', 'devices', 'others'],
    required: true,
  },

  time: {
    type: Date,
    default: Date.now,
  },

  lng: Number,

  lat: Number,

  //id from seller
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('item', ItemSchema);