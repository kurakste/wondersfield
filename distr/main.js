
//const storage = window.localStorage;
window.onload = () => {
  const newGame = document.getElementById('start');
  console.log(newGame);
  newGame.onclick = initGame;
  initGame();
}

function initGame() {
  getInitData()
    .then(data=> {
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
          console.error('I don\'t get valid data fron API');
          reject('I don\'t get valid data fron API');
        }
      })
      .catch(err => reject(err));
  })
}

function fieldInterface() {
  const question = document.getElementById('question');
  const  tablo = document.getElementById('tablo');
  const _game = window.localStorage.getItem('game');
  const game = JSON.parse(_game); 
  question.innerText = game.task;
  tablo.value = game.currentAnswer;
  console.log('i get game', game);
}

