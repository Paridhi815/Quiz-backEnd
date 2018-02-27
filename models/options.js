'use strict';
module.exports = (sequelize, DataTypes) => {
  var options = sequelize.define('options', {
    qid: DataTypes.INTEGER,
    option: DataTypes.STRING
  }, {});
  options.associate = function(models) {
    // associations can be defined here
  };
  return options;
};