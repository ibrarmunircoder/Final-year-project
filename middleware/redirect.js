module.exports = (req, res, next) => {
    if(req.session.isLoggedIn) {
        if(req.session.user.type === 'investor'){
            return res.redirect('/investor-dashboard')
        }else {
            return res.redirect('/startup-dashboard')
        }
    }
    next();
};