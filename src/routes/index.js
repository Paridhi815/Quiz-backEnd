// const ratings = require('./ratings');
const getQuesAndStoreInDb = require('./getQuesAndStoreInDb');
const storeOptions = require('./getOptions');
const readDb = require('./readDb');

module.exports = [].concat(getQuesAndStoreInDb, storeOptions, readDb);
