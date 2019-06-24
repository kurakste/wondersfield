const express = require('express');
const router = express.Router();
const UserController = require('../controllers/game');


router.get('/newgame', UserController.get_init_game);
router.get('/play', UserController.get_play);
module.exports = router;
