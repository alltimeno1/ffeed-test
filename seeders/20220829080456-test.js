'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const currentTime = new Date()
      .toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '');

    await queryInterface.bulkInsert(
      'specs',
      [
        { name: 'Antique', createdAt: currentTime, updatedAt: currentTime },
        { name: 'Modern', createdAt: currentTime, updatedAt: currentTime },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'products',
      [
        { name: 'Chair', createdAt: currentTime, updatedAt: currentTime },
        { name: 'Desk', createdAt: currentTime, updatedAt: currentTime },
      ],
      {}
    );
  },
};
