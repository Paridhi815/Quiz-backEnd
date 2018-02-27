const rp = require('request-promise');
const Models = require('../../models');

const api1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
const api2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/';

const handler = (request, response) => {
  rp(api1).then((data) => {
    // console.log(data);
    const allTheQuestions = JSON.parse(data);
    const arr = [];
    for (let i = 0; i < allTheQuestions.allQuestions.length; i += 1) {
      const correctAnswersPromise = rp(`${api2}${allTheQuestions.allQuestions[i].questionId}`);
      arr.push(correctAnswersPromise);
    }
    Promise.all(arr).then((data1) => {
      for (let i = 0; i < data1.length; i += 1) {
        const ans = JSON.parse(data1[i]);
        allTheQuestions.allQuestions[i].correctAnswer = ans.answer;
      }
      const allQuestionsWithCorrectAnswers = allTheQuestions.allQuestions.map(question => ({
        question: question.question,
        qid: question.questionId,
        correctAns: question.correctAnswer,
      }));
      console.log(allQuestionsWithCorrectAnswers);
      Models.questions.destroy({ truncate: true });
      Models.questions.bulkCreate(allQuestionsWithCorrectAnswers).then((data2) => {
        response(data2);
      });
    //   response(allQuestionsWithCorrectAnswers);
    });
  });
};

const storeQuestions = {
  method: 'PUT',
  path: '/sync',
  handler,
};

module.exports = storeQuestions;

