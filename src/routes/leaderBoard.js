const Models = require('../../models');

const handler = (request, response) => {
  Models.scores.findAll({
    order: [
      ['score', 'DESC'],
    ],
    raw: true,
  }).then((result) => {
    response(result.slice(0, 5));
  });
};

const leaderBoard = {
  method: 'GET',
  path: '/leaderBoard',
  handler,
};

module.exports = leaderBoard;

