const Models = require('../../models');

const handler = (request, response) => {
  const userName = request.payload.userName;
  const qid = request.payload.qid;
  let score = 0;
  const arr = [];
  Models.questions.findAll({
    where: {
      qid,
    },
    raw: true,
  }).then((result) => {
    result.map((resultObj) => {
      const correctAns = resultObj.correctAns;
      Models.userwithans.findAll({
        where: {
          qid,
        },
      }).then((option) => {
        option.map((optionObj) => {
          const selectedOption = optionObj.selectedoption;
          if (correctAns === selectedOption) {
            score += 1;
            response('true');
          } else {
            console.log('wrong ans');
            response('wrong', score);
          }
        });
      });
    });
    console.log(arr);
  });
};

const calculateScore = {
  method: 'PUT',
  path: '/scoreCalculated',
  handler,
};

module.exports = calculateScore;

