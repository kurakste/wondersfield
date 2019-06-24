const express = require('express');
const router = express.Router();
const GameController = require('../controllers/game');


router.get('/newgame', GameController.get_init_game);
router.post('/play', GameController.post_play);
module.exports = router;
