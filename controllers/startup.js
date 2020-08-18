const Startup = require('../models/startup');
const Investor = require('../models/investor');
const {sendStartupEmail} = require('../emails/account');
module.exports.getStartupPage = (req, res, next) => {
    Startup.find({})
        .then(startups => {
            res.render('startup-page.ejs', { pageTitle: 'Investor Page', isAuthenticated: req.session.isLoggedIn, investorForm: false, startupForm: true, loginForm: false, startups: startups.slice(0, 3)});
        })
};

module.exports.postStartupSearches = (req, res, next) => {
    const category = req.body.category.toLowerCase();
    Startup.find({ category })
        .then(startups => {
            if(!startups){
                throw new Error('Search Result not found!');
            }
            res.render('startup-search', { pageTitle: 'Search: Startups', startups: startups});
        })
        .catch(err => console.log(err));

};

module.exports.getStartupDetailPage = (req, res, next) => {
    const _id =  req.params.id;
    Startup.findById(_id)
        .then(startup => {
            res.render('startup-detail-page', { pageTitle: 'Startup Detail Page', startup, isAuthenticated: req.session.isLoggedIn });
        })
        .catch(err => console.log(err));  
};

module.exports.postStartupSendRequest = async (req, res, next) => {
    const _id = req.body.id;
    const startup = await Startup.findById(_id);
    const investor = await Investor.findOne({ userId: req.session.user._id });
    sendStartupEmail(startup.email, investor);
    res.redirect('/investor-dashboard');
};