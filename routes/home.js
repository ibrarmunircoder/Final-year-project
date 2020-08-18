const express = require('express');

const getHomeData = require('../controllers/home');

const router = express.Router();

router.get('/', getHomeData.getHomePage);

// router.get('/register', getHomeData.getRegisterPage);

module.exports = router;