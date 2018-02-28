// const rp = require('request-promise');
const Models = require('../../models');

const handler = (request, response) => {
  Models.questions.findAll({ raw: true }).then((result) => {
    // console.log('-----', result);
    const optionsPromises = [];
    const questionsWithOptions = [];
    result.forEach((question) => {
      const options = [];
      optionsPromises.push(Models.options.findAll({
        where: {
          qid: question.qid,
        },
        raw: true,
      }).then((optionArray) => {
        // console.log('>>>>>>>>>>', optionArray);
        optionArray.forEach((optionObject) => {
          options.push(optionObject.option);
        });
        question.options = options;
        questionsWithOptions.push(question);
        // console.log('pari', questionsWithOptions);
      }));
    });
    Promise.all(optionsPromises).then(() => {
    //   console.log(questionsWithOptions);
      response(questionsWithOptions);
    });


    // Promise.all(optionsPromises).then(() => {
    //   response();
    // });
  });
};


module.exports = {
  method: 'GET',
  path: '/readDb',
  handler,
};
