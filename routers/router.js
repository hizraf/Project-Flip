const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllers');
const auth = require('../middleware/auth');

router.get('/', Controller.home);

router.get('/login', Controller.login);
router.post('/login', Controller.postlogin);

router.get('/register', Controller.getRegister);
router.post('/register', Controller.postRegister);

router.get('/tweets', auth, Controller.tweets);

router.get('/addTweet', auth, Controller.getAddTweet);
router.post('/addTweet', auth, Controller.postAddTweet);


module.exports = router;
