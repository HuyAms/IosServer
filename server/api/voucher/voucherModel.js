const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoucherSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  imgPath: {
    type: String,
    required: true
  },

  expiration : {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('voucher', VoucherSchema);
