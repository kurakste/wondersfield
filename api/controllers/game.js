const gameFactory = require('../../blogic/gameFactory.js');
const gameProcessor = require('../../blogic/gameProcessor');

exports.get_init_game = (req, res, next) => {
    const game = gameFactory();
    console.log('get init game: ', game);
    res.status(200);
    res.json({ game });
};

exports.post_play = (req, res, next) => {
    const body = req.body;
    const letter = body.letter;
    const game = body.game;
    console.log('game:', game);
    const _game = gameProcessor(game, letter);
    console.log('_game: ', _game);
    res.status(200);
    res.json({ game: _game });
  
}