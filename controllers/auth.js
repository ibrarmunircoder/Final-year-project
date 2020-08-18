const User = require('../models/user');

const bcryptJs = require('bcryptjs');

module.exports.getRegisterPage = (req, res, next) => {
    res.render('registeration-form', { pageTitle: 'Registeration Form', investorForm: false, startupForm: false, loginForm: false, isAuthenticated: req.session.isLoggedIn, error: null});
}

module.exports.getLogin = (req, res, next) => {
    res.render('login', {
        pageTitle: 'Login Form',
        investorForm: false,
        loginForm: true,
        startupForm: false,
        isAuthenticated: req.session.isLoggedIn,
        error: null
    });
}

module.exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
        .then(user => {
            if(!user) {
                throw new Error('Invalid Username and Password.')
            }else {
                return bcryptJs.compare(password, user.password)
                            .then(doMatch => {
                                if(doMatch) {
                                    req.session.isLoggedIn = true;
                                    req.session.user = user;
                                    req.session.save(err => {
                                        // console.log(err);
                                        if(user.type === 'investor'){
                                            res.redirect('/investor-dashboard')
                                        }else {
                                            res.redirect('startup-dashboard');
                                        }
                                    });
                                }else {
                                    res.redirect('/login')
                                }
                            })
                            .catch(err => {
                                res.render('login', {
                                    pageTitle: 'Login Form',
                                    investorForm: false,
                                    loginForm: true,
                                    startupForm: false,
                                    isAuthenticated: req.session.isLoggedIn,
                                    error: err.message,
                                });
                            });
            }
        })
        .catch(err => {
            res.render('login', {
                pageTitle: 'Login Form',
                investorForm: false,
                loginForm: true,
                startupForm: false,
                isAuthenticated: req.session.isLoggedIn,
                error: err.message,
            });
        });
}

module.exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });

}