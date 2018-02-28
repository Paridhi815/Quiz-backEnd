'use strict';
module.exports = (sequelize, DataTypes) => {
  var scores = sequelize.define('scores', {
    quizzer: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {});
  scores.associate = function(models) {
    // associations can be defined here
  };
  return scores;
};