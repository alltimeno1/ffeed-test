const Sequelize = require('sequelize');

module.exports = class Specs extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        specId: {
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
        modelName: 'Spec',
        tableName: 'specs',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  }

  static associate(db) {
    db.Spec.belongsToMany(db.Post, {
      foreignKey: 'specId',
      as: 'PostSpecs',
      through: 'postSpec',
    });
  }
};
