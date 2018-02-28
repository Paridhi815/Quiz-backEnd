// const ratings = require('./ratings');
const getQuesAndStoreInDb = require('./getQuesAndStoreInDb');
const storeOptions = require('./getOptions');
const readDb = require('./readDb');
const user = require('./user');
const answerApi = require('./answerApi');
const userWithAns = require('./userWithAns');
const leaderBoard = require('./leaderBoard');
const calculateScore = require('./calculateScore');
const persist = require('./persist');

module.exports = [].concat(
  getQuesAndStoreInDb, storeOptions, readDb, user,
  answerApi, userWithAns, leaderBoard, calculateScore, persist,
);
