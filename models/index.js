const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const { database, username, password } = require('../config/config')[env];
const Post = require('./post');
const Product = require('./product');
const Spec = require('./spec');
const Tag = require('./tag');

const sequelize = new Sequelize(database, username, password, {
  host: process.env.SEQUELIZE_HOST,
  dialect: 'mysql',
  timezone: '+09:00',
  dialectOptions: {
    charset: 'utf8mb4',
    dateStrings: true,
    typeCast: true,
  },
  timezone: '+09:00',
  logging: false,
});

const db = { sequelize, Post, Spec, Product, Tag };

Product.init(sequelize);
Spec.init(sequelize);
Post.init(sequelize);
Tag.init(sequelize);

Product.associate(db);
Spec.associate(db);
Post.associate(db);
Tag.associate(db);

module.exports = db;
