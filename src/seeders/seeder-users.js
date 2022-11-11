'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //bulkinsert: chen nhieu ban ghi 1 luc
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '12345',
      firstName: 'John',
      lastName: 'Doe',
      address: 'USA',
      gender: '1',
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
