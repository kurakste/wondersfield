module.exports = function (_game, position, _letter) {
  const game = _game;
  const rightAnswerArr = game.rightAnswer.split('');
  const letter = _letter.toLowerCase();
  if (rightAnswerArr[position] === letter) {
    const answer = game.currentAnswer.split('');
    answer[position] = _letter;
    const leftStars = answer.filter(el => el === '*');
    if (leftStars.length === 0) {
      game.palyerWin = true;
      game.gameOver = true;
    }
    game.currentAnswer = answer.join('');
  }
  --game.attemptsLeft;
  if (game.attemptsLeft === 0) game.gameOver = true;
  
  return game;
}
