const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.get_init_game = (req, res, next) => {
    console.log('get init game: ');
    res.status(400);
    res.json({
        error: { message: 'init game' }
    });
};

exports.get_play = (req, res, next) => {
  console.log('get play game: ');
    res.status(400);
    res.json({
        error: { message: 'play game' }
    });
}