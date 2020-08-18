const Investor = require('../models/investor');
const Startup = require('../models/startup');
const { sendInvestorEmail } = require('../emails/account'); 
module.exports.getInvestorPage = (req, res, next) => {
    Investor.find({})
        .then(investors => {
            res.render('investor-page.ejs', { pageTitle: 'Investor Page', isAuthenticated: req.session.isLoggedIn, investorForm: false, startupForm: true, loginForm: false, investors: investors.slice(0,3)});
        })
};

module.exports.getInvestorDetail = (req, res, next) => {
    const _id = req.params.id;
    Investor.findById(_id)
        .then(investor => {
            res.render('investor-detail-page', { pageTitle: 'Investor detail', investor, isAuthenticated: req.session.isLoggedIn });
        })
};

module.exports.postInvestorSearches = (req, res, next) => {
    const category = req.body.category.toLowerCase();
    Investor.find({ category })
        .then(investors => {
            if(!investors){
                throw new Error('Search Result not found!');
            }
            res.render('investor-search', { pageTitle: 'Search: Startups', investors: investors});
        })
        .catch(err => console.log(err));

};

module.exports.postInvestorSendRequest = async (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.render('/login');
    }
    const _id = req.body.id;
    const investor = await Investor.findById(_id);
    const startup = await Startup.findOne({ userId: req.session.user._id });
    console.log(investor.email);
    console.log(startup);
    sendInvestorEmail(investor.email, startup);
    res.redirect('/startup-dashboard');
};