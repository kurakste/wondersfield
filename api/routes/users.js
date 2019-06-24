const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');


router.post('/signup', UserController.post_sign_up);
router.post('/login', UserController.post_login);
router.delete('/:userId', UserController.delete_one);
module.exports = router;