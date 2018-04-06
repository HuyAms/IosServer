const User = require('../api/user/userModel');
const Item = require('../api/item/itemModel');
const _ = require('lodash');

console.log('Seeding the Database');

const users = [
  {
    'username': 'test1',
    'password': 'test1',
    'email': 'test1@gmail.com',
    'phoneNumber': '0111111111',
    'point':'1'
  },
  {
    'username': 'test2',
    'password': 'test2',
    'email': 'test2@gmail.com',
    'phoneNumber': '0121111111',
    'point':'1'
  },
  {
    'username': 'test3',
    'password': 'test3',
    'email': 'test3@gmail.com',
    'phoneNumber': '01311111111',
    'point':'1'
  },
];

const items = [
  {
    'itemName': 'mobile',
    'description': 'testDescription',
    'price': '1',
    'category': 'devices',
    'imgPath': 'testPath',
  },
  {
    'itemName': 'laptop',
    'description': 'testDescription',
    'price': '1',
    'category': 'devices',
    'imgPath': 'testPath',
  },
  {
    'itemName': 'shirt',
    'description': 'testDescription',
    'price': '0',
    'category': 'clothing',
    'imgPath': 'testPath',
  },
];

const createDoc = (model, doc) => {
  return new Promise((resolve, reject) => {
    new model(doc).save((err, saved) => {
      return err ? reject(err) : resolve(saved);
    });
  });
};

const cleanDB = () => {
  console.log('...cleaning the DB');
  const cleanPromises = [User, Item].map((model) => {
    return model.remove().exec();
  });
  return Promise.all(cleanPromises);
};

const createUsers = (data) => {
  const promises = users.map((user) => {
    return createDoc(User, user);
  });

  return Promise.all(promises).then((users) => {
    return _.merge({users: users}, data || {});
  });
};

const createItems = (data) => {

  const addSeller = (item, seller) => {
    item.seller = seller._id;
  };

  const newItems = items.map((item, i) => {
    addSeller(item, data.users[i])
    return createDoc(Item, item);
  });

  return Promise.all(newItems)
  .then(function(savedItem) {
    console.log('Seeded DB with 3 Users, 3 Items')
  })
};

cleanDB()
.then(createUsers)
.then(createItems)
