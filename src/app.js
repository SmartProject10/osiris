require('dotenv').config();
const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const { connectToMongoose } = require('./config/db');
const routes = require('./controllers/routes'); // Importar las rutas centralizadas

const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos
connectToMongoose();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// Configurar OAuth2
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

// Rutas
app.use('/auth/provider', passport.authenticate('oauth2'));
app.use('/auth/callback', 
  passport.authenticate('oauth2', { failureRedirect: '/' }),
  (req, res) => res.redirect('/dashboard')
);
app.use('/', routes);

// Error handling
app.use(errorHandler);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: 'Internal Server Error' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
