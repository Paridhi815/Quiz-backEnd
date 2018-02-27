'use strict';
module.exports = (sequelize, DataTypes) => {
  var questions = sequelize.define('questions', {
    question: DataTypes.STRING,
    qid: DataTypes.INTEGER,
    correctAns: DataTypes.STRING
  }, {});
  questions.associate = function(models) {
    // associations can be defined here
  };
  return questions;
};