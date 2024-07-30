const express = require('express');
const router = express.Router();
const authService = require('../services/authService'); // Assuming you have a service module
require('dotenv').config();
const passport = require('passport');


router.post('/up', async (req, res) => {
    try {
      await userService.createUser(req, res);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  
  });

  // passport.authenticate('jwt', { session: false }),

  router.post('/sendJwt', (req, res) => {
    try {
    const token = authService.generateToken(req, res);
    res.json({ token });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
  });

  router.post('/login', async (req, res) => {
    try {
      await authService.loginLocal(req, res);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  });
  
  // router.get('/login', async (req, res) => {
  //   try {
  //     await authService.loginLocal(req, res);
  //   } catch (error) {
  //     res.status(error.statusCode || 500).json({ error: error.message });
  //   }
  // });

  router.post('/local', async (req, res) => {
    try {
      await authService.loginOther(req, res);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  });

  router.post('/receip', async (req, res) => {
    try {
      await authService.receipJwt(req, res);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  });
  
 
  router.post('/send-email', async (req, res) => {
     try {
      const token = req.body.token; 
      const correo = req.body.correo; 
  
      if (!token || !correo) {
        return res.status(400).json({ error: 'Missing required fields: token and/or correo' });
      }
      await authService.sendEmail(token, correo);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  });


  router.get('/get-token', async (req, res) => {
    try {
      await authService.generateToken(req, res);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  });

  router.post('/token-jwt', async (req, res) => {
    try {
      await authService.getTokenJwt(req, res);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  });
 
  router.get('/protected', passport.authenticate('oauth2', { session: false }), (req, res) => {
    res.json({ message: 'Acceso concedido' });
  });



  module.exports = router;