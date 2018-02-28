const Models = require('../../models');

const handler = (request, response) => {
  const userName = request.payload.userName;
  let score = 0;
  const arr = [12, 23, 45, 56, 67, 78, 89, 90, 102, 120, 123, 34];
  const res = [];
  arr.forEach((quesid) => {
    Models.questions.findAll({
      where: {
        qid: quesid,
      },
    }, { raw: true }).then((result) => {
      result.map((resultObj) => {
        const correctAns = resultObj.correctAns;
        Models.userwithans.findAll({
          where: {
            qid: quesid,
          },
        }).then((option) => {
          option.map((optionObj) => {
            const selectedOption = optionObj.selectedoption;
            if (correctAns === selectedOption) {
              score += 1;
              res.push(1);
            //   console.log('right ans');
            } else {
            //   console.log('wrong ans');
              res.push(0);
            }
            // console.log('scor', score);
          });
          //   console.log('score', score, res);
          if (quesid === 34) {
            // console.log('pls', score);

            response(score);
          }
        });
      });
    });
  });
};


const calculateScore = {
  method: 'PUT',
  path: '/scoreCalculated',
  handler,
};

module.exports = calculateScore;
