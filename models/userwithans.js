'use strict';
module.exports = (sequelize, DataTypes) => {
  var userwithans = sequelize.define('userwithans', {
    quizzer: DataTypes.STRING,
    qid: DataTypes.INTEGER,
    selectedoption: DataTypes.STRING
  }, {});
  userwithans.associate = function(models) {
    // associations can be defined here
  };
  return userwithans;
};