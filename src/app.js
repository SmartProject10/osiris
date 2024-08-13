require('dotenv').config();
const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const bodyParser = require('body-parser');
const cors  = require('cors');
// const auth = passport.authenticate('jwt', { session: false });
const companyController = require('./controllers/companyController'); 
const cargoEmpresaController = require('./controllers/cargoEmpresaController'); 
const areaEmpresaController = require('./controllers/areaEmpresaController'); 
const isoController = require('./controllers/isoController'); 
const companyEconomicActivityController = require('./controllers/companyEconomicActivity.controller'); 
const userController = require('./controllers/userController');
const sedeController = require('./controllers/sedeController');
const paisController = require('./controllers/paisController');
const personaController = require('./controllers/personaController');
const authController = require('./controllers/authController')


const port = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(express.json()); 
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// Configurar la estrategia OAuth2
passport.use(
  'oauth2',
  new OAuth2Strategy({
    authorizationURL: process.env.AUTHORIZATION_URL,
    tokenURL: process.env.TOKEN_URL,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  })
);

// Rutas de autenticación
app.get('/auth/provider', passport.authenticate('oauth2'));

app.get('/auth/callback', 
  passport.authenticate('oauth2', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/dashboard');
  }
);


app.use('/auth', authController);
app.use('/company', companyController); 
app.use('/cargo', cargoEmpresaController); 
app.use('/area', areaEmpresaController); 
app.use('/iso', isoController); 
app.use('/companyEconomicActivity', companyEconomicActivityController); 
app.use('/user', userController);
app.use('/sede', sedeController);
app.use('/persona', personaController);
app.use('/pais', paisController);

app.get('/', (req, res) => res.send('Iso Main!'));

app.use((err, req, res, next) => {
  console.error(err.stack); // Log errors
  res.status(err.status || 500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;

