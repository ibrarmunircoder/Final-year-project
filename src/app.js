const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const port = process.env.PORT || 3000;

const MONGOOSE_URI ='mongodb+srv://ibrarmunir:ibrar123@cluster0.fevia.mongodb.net/entrepreneurship';

const getHomeRoutes = require('../routes/home');
const getProfileRoutes = require('../routes/create-profile');
const authRoutes = require('../routes/auth');
const dashboardRoutes = require('../routes/dashboard');
const investorRoutes = require('../routes/investor');
const startupRoutes = require('../routes/startup');

const app = express();
const store = new MongoDBStore({
    uri: MONGOOSE_URI,
    collection: 'sessions'
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// bodyParser registeration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({ secret: 'online entrepreneurship ecosystem', resave: false, saveUninitialized: false, store: store}));

// profileurl
 app.use(getHomeRoutes);
app.use(getProfileRoutes);
app.use(authRoutes);
app.use(dashboardRoutes);
app.use(investorRoutes);
app.use(startupRoutes);

app.use((req, res, next) => {
    res.status(404).render('404');
});
mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true })
    .then(result => {
        app.listen(port, () => {
            console.log(`server is up on ${port}`);
        });
    })
    .catch(err => console.log(err));