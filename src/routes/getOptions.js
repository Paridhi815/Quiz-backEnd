const rp = require('request-promise');
const Models = require('../../models');

const api1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
const api2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/';

const handler = (request, response) => {
  rp(api1).then((data) => {
    // console.log(data);
    const allTheQuestions = JSON.parse(data);
    allTheQuestions.allQuestions.forEach((question) => {
      const questionKeys = Object.keys(question);
      questionKeys.forEach((key) => {
        if (key.startsWith('option')) {
          Models.options.destroy({ truncate: true });
          Models.options.create({
            qid: question.questionId,
            option: question[key],
          });
        }
      });
    });

    response('allQuestionsWithCorrectAnswers');
  });
};

const storeOptions = {
  method: 'PUT',
  path: '/option',
  handler,
};

module.exports = storeOptions;

