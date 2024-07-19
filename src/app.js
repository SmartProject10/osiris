const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const bodyParser = require('body-parser');

const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
const companyController = require('./controllers/CompanyController'); 
const cargoEmpresaController = require('./controllers/cargoEmpresaController'); 
const areaEmpresaController = require('./controllers/areaEmpresaController'); 
const isoController = require('./controllers/isoController'); 
const companyEconomicActivityController = require('./controllers/companyEconomicActivity.controller'); 
const userController = require('./controllers/userController');
const sedeController = require('./controllers/sedeController');
const paisController = require('./controllers/paisController');
const personaController = require('./controllers/personaController');
const port = process.env.PORT || 3000;
const cors  = require('cors');

const app = express();
app.use(express.json()); 
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors())

passport.use(
  'login',
  new OAuth2Strategy({
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

app.use('/auth/provider', passport.authenticate('oauth2'));
app.use('/company', companyController); 
app.use('/cargo', cargoEmpresaController); 
app.use('/area', areaEmpresaController); 
app.use('/isos', isoController); 
app.use('/companyEconomicActivities', companyEconomicActivityController); 
app.use('/user', userController);
app.use('/sede', sedeController);
app.use('/persona', personaController);
app.use('/pais', paisController);

app.get('/', (req, res) => res.send('Iso Main!'));
app.get('/company', companyController); 
app.get('/cargo', cargoEmpresaController); 
app.get('/area', areaEmpresaController); 
app.get('/isos', isoController); 
app.get('/companyEconomicActivities', companyEconomicActivityController); 
app.get('/user', userController);
app.get('/sede', sedeController);
app.get('/persona', personaController);
app.get('/pais', paisController);

// app.use('/users', userController, passport.authenticate('oauth2'));
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

