
//const storage = window.localStorage;
let gameOverFlag = false;

window.onload = () => {
  const newGame = document.getElementById('start');
  const answer = document.getElementById('answer');
  console.log(sendAnswer);
  newGame.onclick = initGame;
  answer.onclick = sendAnswer;
  initGame();
}

function initGame() {
  const _letter = document.getElementById('let');
  const _res = document.getElementById('result');
  _res && _res.remove();
  _letter.value = '';
  gameOverFlag = false;

  getInitData()
    .then(data => {
      fieldInterface();
    })
    .catch(err => console.error(err));
}

function getInitData() {
  return new Promise(function (resolve, reject) {
    const url = 'http://localhost:3000/game/newgame';
    fetch(url)
      .then(data => data.json())
      .then(data => {
        if (data.game) {
          window.localStorage.setItem('game', JSON.stringify(data.game));
          console.log('i get data: ', data);
          resolve(data);
        } else {
          reject('I don\'t get valid data fron API');
        }
      })
      .catch(err => reject(err));
  })
}

function fieldInterface() {
  const question = document.getElementById('question');
  const tablo = document.getElementById('tablo');
  const cresult = document.getElementById('cresult');
  const _game = window.localStorage.getItem('game');
  const game = JSON.parse(_game);
  question.innerText = game.task;
  tablo.value = game.currentAnswer;
  const msg = game.prevAttempSuccess ? 'Ура! Вы угадали!' : 'Ошибка('
  cresult.innerText = game.isGameNew ? 'Начните игру!' : msg;

  console.log('i get game', game);
}

function sendAnswer() {
  if (gameOverFlag) return;
  console.log('send answer fierd');
  const _letter = document.getElementById('let');
  const _pos = document.getElementById('pos');
  const letter = _letter.value;
  const game = JSON.parse(window.localStorage.getItem('game')); 
  const data = {
    letter: letter,
    game: game
  };
  const url = 'http://localhost:3000/game/play';
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(data => data.json())
    .then(data => {
      console.log(data);
      if (data.game) {
        window.localStorage.setItem('game', JSON.stringify(data.game));
        fieldInterface()
        console.log('i get data: ', data);
        if (data.game.gameOver) gameOver((data.game.palyerWin)?'You win!!!': 'You loose :-(');
      } else {
        console.error('I don\'t get valid data from API');
      }
    })
    .catch(err => console.error(err));
}

function gameOver(result) {
  const hd = document.createElement('h2');
  hd.textContent = result;
  hd.id = 'result';
  document.body.appendChild(hd);
  gameOverFlag = true;
}