const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.get_init_game = (req, res, next) => {
    console.log('get init game: ', req);
};

exports.get_play = (req, res, next) => {
  console.log('get play game: ', req);
}