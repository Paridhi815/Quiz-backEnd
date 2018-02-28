const Models = require('../../models');

const handler = (request, response) => {
  const userName = request.payload.userName;
  const qid = request.payload.qid;
  const selectedOption = request.payload.selectedOption;
  Models.userwithans.count({
    where: {
      qid,
    },
  }).then((count) => {
    if (count !== 0) {
      Models.userwithans.update({
        quizzer: userName,
        qid,
        selectedoption: selectedOption,
      }, {
        where: {
          qid,
        },
      });
    } else {
      Models.userwithans.create({
        quizzer: userName,
        qid,
        selectedoption: selectedOption,
      });
    }
  });
  response('Score Updated or inserted');
};

const userWithSelectedAns = {
  method: 'PUT',
  path: '/userWithAns',
  handler,
};

module.exports = userWithSelectedAns;

