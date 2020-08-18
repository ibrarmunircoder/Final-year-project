const Investor = require('../models/investor');
const Startup = require('../models/startup');
const investor = require('../models/investor');
const mongoose = require('mongoose');



module.exports.getInvestorDashboard = (req, res, next) => {
    Investor.findOne({ userId: req.session.user._id })
        .then(investor => {
            res.render('investor-dashboard', { pageTitle: 'Investor Dashboard', investor: investor})
        })
        .catch(err => console.log(err));
}

module.exports.getStartupSearchPage = (req, res, next) => {
    res.render('startup-search', { pageTitle: 'Search: Startups', startups: null});
}

module.exports.getInvestorSearchPage = (req, res, next) => {
    res.render('investor-search', { pageTitle: 'Search: Investors', investors: null});
}

module.exports.getStartupDashboard = (req, res, next) => {
    Startup.findOne({ userId: req.session.user._id })
        .then(startup => {
            res.render('startup-dashboard', { pageTitle: 'Startup Dashboard', startup });
        })
        .catch(err => console.log(err));
}