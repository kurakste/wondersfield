const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gameFactory = require('../../blogic/gameFactory.js');
const gameProcessor = require('../../blogic/gameProcessor');

exports.get_init_game = (req, res, next) => {
    const game = gameFactory();
    console.log('get init game: ', game);
    const out = JSON.stringify(game);
    res.cookie('game', game, {maxAge: 24*60*60*1000, httpOnly: true, path: '/'});
    res.status(200);
    res.json({ game });
};

exports.get_play = (req, res, next) => {
    let game;
    const letter = req.query.letter;
    const pos = parseInt(req.query.pos);
    
    if (req.cookies) {
        const cook = req.cookies; //JSON.parse(req.cookies);
        game = cook.game;
    }
    const _game = gameProcessor(game, pos, letter);
    console.log('new game: \n', _game);
    res.cookie('game', _game, {maxAge: 24*60*60*1000, httpOnly: true, path: '/'});
    res.status(200);
    res.json({
        message: 'We play game!'
    });
  
}