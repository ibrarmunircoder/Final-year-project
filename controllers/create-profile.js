const bcryptJs = require('bcryptjs');
const User = require('../models/user');
const Startup = require('../models/startup');
const Investor = require('../models/investor');
const validator = require('validator');
const getCountryList = require('../utils/city');

module.exports.getProfilePage = (req, res, next) => {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const password_one = req.body.pass_one;
    const password_two = req.body.pass_two;
    const gender = req.body.gender;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    try {
        if (password_one !== password_two) {
            throw new Error('Password Should be matched!');
        }
        if(!validator.isMobilePhone(phoneNumber)){
            throw new Error('Invalid Phone Number');
        }
        if(!validator.isEmail(email)){
            throw new Error('Invalid Email');
        }
    User.findOne({email: email})
        .then(user => {
            if(user){
                throw new Error('User Already Exists');
            }else {
                return bcryptJs.hash(password_one, 12)
                    .then(hashPassword => {
                        const newUser = new User({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            type: gender,
                            phone: phoneNumber,
                            password: hashPassword
                        });
                        return newUser.save();
                    })
                    .then(userDb => {
                        console.log(userDb)
                        req.session.isLoggedIn = true,
                        req.session.user = userDb;
                        req.session.save();
                        if (req.body.gender === 'investor'){
                            console.log(req.body);
                            res.redirect('/get-investor-profile');
                        }else {
                            res.redirect('/startup-create-profile');
                        }
                    })
            }
        })
        .catch(err => {
            res.render('registeration-form', { pageTitle: 'Registeration Form', investorForm: false, startupForm: false, loginForm: false, isAuthenticated: req.session.isLoggedIn, error: err.message});
        });
    // console.log(firstName, lastName, password, gender, email, phoneNumber);
    } catch (e) {
        // console.log(e.message);
        res.render('registeration-form', { pageTitle: 'Registeration Form', investorForm: false, startupForm: false, loginForm: false, isAuthenticated: req.session.isLoggedIn, error: e.message});
    }
}

module.exports.getInvestorProfilePage = (req, res, next) => {
        getCountryList(countries => {
        res.render('investor-form', { pageTitle: 'Investor Profile Create', investorForm: true, startupForm: false, loginForm: false, isAuthenticated: req.session.isLoggedIn, countries: countries, error: null});
    });
}
module.exports.getStartupProfilePage = (req, res, next) => {
    res.render('startup-form', { pageTitle: 'Investor Profile Create', investorForm: false, loginForm: false, startupForm: true, isAuthenticated: req.session.isLoggedIn, error: null });
}

module.exports.postStartupProfile = (req, res, next) => {
    const startupName = req.body.startup_name;
    const stage = req.body.startup_stage;
    const startup_website_url = req.body.startup_website_url;
    const startup_category = req.body.startup_category;
    const city = req.body.city;
    const country = req.body.country;
    const target_amount = req.body.target_amount;
    const achieved_amount = req.body.achieved_amount;
    const investor_min_amount = req.body.investor_min_amount;
    const email = req.body.email;
    const startup_summary = req.body.startup_summary;
    try {
    const startup = new Startup({
        startupName: startupName,
        stage: stage,
        website_address: startup_website_url,
        category: startup_category,
        city: city,
        country: country,
        total_amount: target_amount,
        raised: achieved_amount,
        per_investor: investor_min_amount,
        startup_summary: startup_summary,
        email: email,
        userId: req.session.user
    });
    startup.save()
        .then(startup => {
            res.redirect('/startup-dashboard');
        })
        .catch(err => {
            res.render('startup-form', { pageTitle: 'Investor Profile Create', investorForm: false, loginForm: false, startupForm: true, isAuthenticated: req.session.isLoggedIn, error: err.message })
        });
    } catch (e) {
        res.render('startup-form', { pageTitle: 'Investor Profile Create', investorForm: false, loginForm: false, startupForm: true, isAuthenticated: req.session.isLoggedIn, error: e.message });
    }

};

module.exports.postInvestorProfile = async (req, res, next) => {
    const fullName = req.body.investor_name;
    const linkedInUrl = req.body.investor_profile_url;
    const category = req.body.category;
    const city = req.body.city;
    const country = req.body.country;
    const Max_Investment = req.body.max_amount;
    const Min_Investment = req.body.min_amount;
    const Area_Of_Expertise = req.body.areas_of_experties;
    const email = req.body.email;
    const professional_bg = req.body.professional_bg;
    try {
    // const investorDb = Investor.findOne({ email: email });
    // if(investorDb) {
    //     throw new Error('User already exits.');
    // }
    const investor = new Investor({
        investorName: fullName,
        linkedInUrl: linkedInUrl,
        category: category,
        city: city,
        country: country,
        Max_Investment: Max_Investment,
        Min_Investment: Min_Investment,
        Area_Of_Expertise: Area_Of_Expertise,
        email: email,
        professional_bg: professional_bg,
        userId: req.session.user
    });
    investor.save()
        .then(investor => {
            res.redirect('/investor-dashboard');
        })
        .catch(err => {
            res.render('investor-form', { pageTitle: 'Investor Profile Create', investorForm: true, startupForm: false, loginForm: false, isAuthenticated: req.session.isLoggedIn, countries: null, error: err.message });
        });
    } catch (err) {
        res.render('investor-form', { pageTitle: 'Investor Profile Create', investorForm: true, startupForm: false, loginForm: false, isAuthenticated: req.session.isLoggedIn, countries: null, error: err.message});
    }
};