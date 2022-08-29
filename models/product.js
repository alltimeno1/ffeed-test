const Sequelize = require('sequelize');

module.exports = class Product extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        productId: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Product',
        tableName: 'products',
        paranoid: false,
        charset: 'utf8mb4',
        collate: ' utf8mb4_unicode_ci',
      }
    );
  }

  static associate(db) {
    db.Product.hasMany(db.Post, { foreignKey: 'productId' });
  }
};
