const Investor = require('../models/investor');
const Startup = require('../models/startup');

module.exports.getHomePage = async (req, res, next) => {
    const investors = await Investor.find({});
    const startups = await Startup.find({});
    res.render('index', { pageTitle: 'Online Entrepreunership Ecosystem', investorForm: false, startupForm: false, loginForm: false, isAuthenticated: req.session.isLoggedIn, investors: investors.slice(0,3), startups: startups.slice(0,3) });
}

// module.exports.getRegisterPage = (req, res, next) => {
//     res.render('registeration-form', { pageTitle: 'Registeration Form', investorForm: false})
// }