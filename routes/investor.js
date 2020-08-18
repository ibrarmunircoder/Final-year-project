const express = require('express');
const investorControllers = require('../controllers/investor');

const router = express.Router();

router.get('/investor-page', investorControllers.getInvestorPage);

router.get('/investor-detail-page/:id', investorControllers.getInvestorDetail);

router.post('/post-investor-search', investorControllers.postInvestorSearches);

router.post('/investor-request', investorControllers.postInvestorSendRequest);

module.exports = router;