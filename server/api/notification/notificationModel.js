const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotiSchema = new Schema({

  notiType: {
    type: Number,
    required: true,
  },

  isRead: {
    type: Boolean,
    required: true,
    default: false
  },

  order: {
    type: Schema.Types.ObjectId,
    ref: 'order',
    required: true
  },

  item: {
    type: Schema.Types.ObjectId,
    ref: 'item',
    required: true
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  time: {
    type: Date,
    default: Date.now,
  },

  notiBody: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }

});

module.exports = mongoose.model('notification', NotiSchema);