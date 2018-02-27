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
        questionId: question.questionId,
        option1: question.option1,
        option2: question.option2,
        option3: question.option3,
        option4: question.option4,
        correctAnswer: question.correctAnswer,
      }));
      console.log(allQuestionsWithCorrectAnswers);
      //   Models.likebooks.destroy({ truncate: true });
      //   Models.likebooks.bulkCreate(allQuestionsWithCorrectAnswers).then((data) => {
      //     response(data);
      //   });
      response(allQuestionsWithCorrectAnswers);
    });
  });
};

const storeQuestions = {
  method: 'PUT',
  path: '/sync',
  handler,
};

module.exports = storeQuestions;

