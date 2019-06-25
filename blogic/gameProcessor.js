module.exports = function (_game, _letter) {
  const game = _game;
  let cnt = game.attemptsLeft;
  const rightAnswerArr = game.rightAnswer.split('');
  const letter = _letter.toLowerCase();
  const matches = rightAnswerArr.reduce((prev, val, i) => {
    if (val === letter) prev.push(i);
    return prev
  }, [])

  if (matches.length) {
    const answer = game.currentAnswer.split('');
    matches.map(el => answer[el] = letter);
    game.prevAttempSuccess = true;
    game.currentAnswer = answer.join('');
    const leftStars = answer.filter(el => el === '*');
    if (leftStars.length === 0) {
      game.palyerWin = true;
      game.gameOver = true;
    }
  } else {
    game.prevAttempSuccess = false;
  }
  --cnt;
  game.attemptsLeft = cnt;
  if (game.attemptsLeft === 0) game.gameOver = true;
  game.isGameNew = false;

  return game;
}
