const express = require('express');
const startupControllers = require('../controllers/startup');

const router = express.Router();

router.get('/startup-page', startupControllers.getStartupPage);

router.post('/post-startup-search', startupControllers.postStartupSearches)

router.get('/startup-detail-page/:id', startupControllers.getStartupDetailPage);

router.post('/startup-request', startupControllers.postStartupSendRequest);
module.exports = router;