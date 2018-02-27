const rp = require('request-promise');
const Models = require('../../models');

const api1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
const api2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/';

const handler = (request, response) => {
  rp(api1).then((data) => {
    // console.log(data);
    const allTheQuestions = JSON.parse(data);
    // const arr = [];
    // for (let i = 0; i < allTheQuestions.allQuestions.length; i += 1) {
    //   const correctAnswersPromise = rp(`${api2}${allTheQuestions.allQuestions[i].questionId}`);
    //   arr.push(correctAnswersPromise);
    // }
    // Promise.all(arr).then((data1) => {
    //   for (let i = 0; i < data1.length; i += 1) {
    //     const ans = JSON.parse(data1[i]);
    //     allTheQuestions.allQuestions[i].correctAnswer = ans.answer;
    //   }
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

    //   const allOptionsPerQuestion = allTheQuestions.allQuestions.map(question => ({
    //     qid: question.questionId,
    //     correctAns: question.correctAnswer,
    //   }));
    //   console.log(allOptionsPerQuestion);
    //   Models.options.destroy({ truncate: true });
    //   Models.options.bulkCreate(allOptionsPerQuestion).then((data2) => {
    //     response(data2);
    //   });
    response('allQuestionsWithCorrectAnswers');
    // });
  });
};

const storeOptions = {
  method: 'PUT',
  path: '/option',
  handler,
};

module.exports = storeOptions;

