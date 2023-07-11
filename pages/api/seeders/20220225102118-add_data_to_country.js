'use strict';
var countries = require('../config/countries');
for (var i in countries) {
  delete countries[i]["regions"];
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('country',
      countries
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('country', null, {});

  }
};