const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        postId: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        desc: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Post',
        tableName: 'posts',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  }

  static associate(db) {
    db.Post.belongsToMany(db.Spec, {
      foreignKey: 'postId',
      as: 'PostSpecs',
      through: 'postSpec',
    });
    db.Post.belongsTo(db.Product, { foreignKey: 'postId' });
    db.Post.hasMany(db.Tag, { foreignKey: 'postId' });
  }
};
