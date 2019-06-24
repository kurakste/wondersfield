const quiz = require('./quiz');

module.exports = function () {
  const quizLength = quiz.length;
  const quizNumber = Math.floor(Math.random()*quizLength);
  const question = quiz[quizNumber];
  const attempts = question.answer.length + 3;
  const canswer = '*'.repeat(question.answer.length);

  return {
    task: question.task,
    rightAnswer: question.answer,
    currentAnswer: canswer,
    attemptsLeft: attempts,
    gameOver: false, 
    palyerWin: false,
  }

}