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
const userController = require('./controllers/userController');
const sedeController = require('./controllers/sedeController');
const paisController = require('./controllers/paisController');
const personaController = require('./controllers/personaController');
const port = process.env.PORT || 3000;


const app = express();
app.use(express.json()); 
app.use(bodyParser.json());
app.use(passport.initialize());

// OAuth2 Strategy
// passport.use(new OAuth2Strategy({
//     authorizationURL: process.env.AUTHORIZATION_URL,
//     tokenURL: process.env.TOKEN_URL,
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL
// },
passport.use(
  'login',
  new OAuth2Strategy({
    authorizationURL: process.env.AUTHORIZATION_URL,
    tokenURL: process.env.TOKEN_URL,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},

// function(accessToken, refreshToken, profile, cb) {
//     return cb(null, profile);
// }));
async (accessToken, refreshToken, profile, cb) => {
  try {
    const user = await User.findOne({ providerId: profile.id });
    if (user) {
      return cb(null, user); // Existing user
    } else {
      // Create a new user based on profile information
      const newUser = new User({
        providerId: profile.id,
        name: profile.displayName,
        email: profile.emails && profile.emails[0].value,
        password: profile.passwords && profile.passwords[0].value,
        // ... other user details
      });
      await newUser.save();
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
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
app.use('/cargo', cargoEmpresaController); 
app.use('/area', areaEmpresaController); 
app.use('/isos', isoController); 
app.use('/companyEconomicActivities', companyEconomicActivityController); 
app.use('/user', userController);
app.use('/sede', sedeController);
app.use('/persona', personaController);
app.use('/pais', paisController);
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
