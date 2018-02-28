const Models = require('../../models');

const handler = (request, response) => {
  const name = request.payload.user;
  console.log('bjdcdhw', request.payload);
  Models.quizzers.count({
    where: {
      quizzer: name,
    },
  }).then((count) => {
    if (count !== 0) {
      response('User Already Exists');
    } else {
      Models.quizzers.create({
        quizzer: name,
        score: 0,
      });
    }
  });
  response('User Added');
};

const user = {
  method: 'PUT',
  path: '/user',
  handler,
};

module.exports = user;

