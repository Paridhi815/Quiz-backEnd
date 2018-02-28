const Models = require('../../models');

const handler = (request, response) => {
  const userName = request.payload.user;
  Models.userwithans.findAll({
    where: {
      quizzer: userName,
    },
    raw: true,
  }).then((result) => {
    //       const obj={};
    //       result.map((perUserState)=>{
    // obj.qid=perUserState.qid;
    // obj.selectedoption=perUserState.selectedoption;
    response(result);
    //   })
  });
};

const persist = {
  method: 'PUT',
  path: '/persist',
  handler,
};

module.exports = persist;

