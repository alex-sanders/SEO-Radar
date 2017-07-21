'use strict';
module.exports = function(sequelize, DataTypes) {
  var users_n = sequelize.define('users_n', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    pin: DataTypes.INTEGER,
    titleId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users_n;
};