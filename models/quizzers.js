'use strict';
module.exports = (sequelize, DataTypes) => {
  var quizzers = sequelize.define('quizzers', {
    quizzer: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {});
  quizzers.associate = function(models) {
    // associations can be defined here
  };
  return quizzers;
};