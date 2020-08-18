const express = require('express');

const profileControllers = require('../controllers/create-profile');

const isAuth = require('../middleware/is_auth');
const redirect = require('../middleware/redirect');

const router = express.Router();

router.post('/create-profile', profileControllers.getProfilePage);

router.get('/get-investor-profile', isAuth, profileControllers.getInvestorProfilePage)

router.post('/post-investor-profile', isAuth, profileControllers.postInvestorProfile);

router.get('/startup-create-profile', isAuth, profileControllers.getStartupProfilePage);

router.post('/post-startup-profile', isAuth, profileControllers.postStartupProfile);

module.exports = router;