const express = require('express');
const router = express.Router();
const GameController = require('../controllers/game');


router.get('/newgame', GameController.get_init_game);
router.get('/play', GameController.get_play);
module.exports = router;
