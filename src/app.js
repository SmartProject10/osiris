const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const bodyParser = require('body-parser');
const pool = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
const companyController = require('./controllers/CompanyController'); // Assuming you have a controllers folder
const cargoEmpresaController = require('./controllers/cargoEmpresaController'); // Assuming you have a controllers folder
const areaEmpresaController = require('./controllers/areaEmpresaController'); // Assuming you have a controllers folder
const isoController = require('./controllers/isoController'); // Assuming you have a controllers folder
const companyEconomicActivityController = require('./controllers/companyEconomicActivity.controller'); // Assuming you have a controllers folder


const port = process.env.PORT || 3000;


const app = express();
app.use(express.json()); 
app.use(bodyParser.json());
app.use(passport.initialize());

// OAuth2 Strategy
passport.use(new OAuth2Strategy({
    authorizationURL: process.env.AUTHORIZATION_URL,
    tokenURL: process.env.TOKEN_URL,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},

function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));

app.get('/auth/callback', 
  passport.authenticate('oauth2', { failureRedirect: '/' }),
  function(req, res) {

      res.redirect('/');
  }

);

app.use(errorHandler);

// Routes
app.get('/', (req, res) => res.send('Iso Main!'));
app.use('/auth/provider', passport.authenticate('oauth2'));
app.use('/companies', companyController); 
app.use('/cargoEmpresas', cargoEmpresaController); 
app.use('/areasEmpresas', areaEmpresaController); 
app.use('/isos', isoController); 
app.use('/companyEconomicActivities', companyEconomicActivityController); 
// app.use('/users', userRoutes, passport.authenticate('oauth2'));
// // app.use('/company', companyRoutes, passport.authenticate('oauth2'))
// app.use('/company', companyRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack); // Log errors
  res.status(err.status || 500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
