const express = require('express');

const authenticationPages = require('../controllers/auth')

const redirect = require('../middleware/redirect');
const is_Auth = require('../middleware/is_auth');

const router = express.Router();

router.get('/register', authenticationPages.getRegisterPage);

router.get('/login', redirect, authenticationPages.getLogin);

router.post('/login', authenticationPages.postLogin);

router.get('/logout', is_Auth, authenticationPages.postLogout);

module.exports = router;
