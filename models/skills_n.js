'use strict';
module.exports = function(sequelize, DataTypes) {
  var skills_n = sequelize.define('skills_n', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return skills_n;
};