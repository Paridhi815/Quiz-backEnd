const Models = require('../../models');

const handler = (request, response) => {
  const userName = request.payload.userName;
  const score = request.payload.score;
  Models.scores.count({
    where: {
      quizzer: userName,
    },
  }).then((count) => {
    if (count !== 0) {
      Models.scores.update({
        score,
      }, {
        where: {
          quizzer: userName,
        },
      });
    } else {
      Models.scores.create({
        quizzer: userName,
        score,
      });
    }
  });
  response('Score Updated or inserted');
};

const user = {
  method: 'PUT',
  path: '/scores',
  handler,
};

module.exports = user;

