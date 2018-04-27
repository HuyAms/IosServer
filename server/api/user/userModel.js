const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const config = require('../../config/config');
const stripeSecretKey = config.secrets.stripeSecretKey;
const stripe = require('stripe')(stripeSecretKey);


const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },

  // Stripe customer ID storing the payment sources.
  stripeCustomerId: String,

  //we should hash password before saving it in Database
  //dont store the password as plain text
  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  phoneNumber: {
    type: Number,
    unique: true,
    required: true
  },

  avatarPath: {
    type: String,
    required: false
  },

  point: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },

  badge: {
    type: String,
    required: true,
    enum: [
      'Mercury',
      'Mars',
      'Venus',
      'Earth',
      'Neptune',
      'Uranus',
      'Saturn',
      'Jupiter'],
    default: 'Mercury'
  },

  numberOfRecycledItems: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }

});

UserSchema.plugin(uniqueValidator, { message: '{PATH}' });

//middleware that will run before a document is created
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  };
  this.password = this.encryptPassword(this.password);
  next();
});

UserSchema.methods = {

  //check the passwords on signin
  authenticate: function(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },

  //hashpassword
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return '';
    } else {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  },

  getBadge: function(numberOfRecycledItems) {
    if (numberOfRecycledItems >= 0 && numberOfRecycledItems < 3) {
      return 'Mercury'
    } else if (numberOfRecycledItems >= 3 && numberOfRecycledItems < 5) {
      return 'Mars'
    } else if (numberOfRecycledItems >= 5 && numberOfRecycledItems < 10) {
      return 'Venus'
    } else if (numberOfRecycledItems >= 10 && numberOfRecycledItems < 15) {
      return 'Earth'
    } else if (numberOfRecycledItems >= 15 && numberOfRecycledItems < 20) {
      return 'Neptune'
    } else if (numberOfRecycledItems >= 20 && numberOfRecycledItems < 30) {
      return 'Uranus'
    } else if (numberOfRecycledItems >= 30 && numberOfRecycledItems < 50) {
      return 'Saturn'
    } else {
      return 'Jupiter'
    }
  }
};

module.exports = mongoose.model('user', UserSchema);
