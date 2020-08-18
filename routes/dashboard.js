const express = require('express');

const dashboardControllers = require('../controllers/dashboard');

const router = express.Router();

router.get('/investor-dashboard', dashboardControllers.getInvestorDashboard);

router.get('/startup-search', dashboardControllers.getStartupSearchPage);

router.get('/investor-search', dashboardControllers.getInvestorSearchPage);

router.get('/startup-dashboard', dashboardControllers.getStartupDashboard);

module.exports = router;