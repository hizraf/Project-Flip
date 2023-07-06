const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllers');

router.get('/', Controller.home);

router.get('/login', Controller.login);

router.post('/login', Controller.postlogin);

router.get('/home', Controller.home);


module.exports = router;
