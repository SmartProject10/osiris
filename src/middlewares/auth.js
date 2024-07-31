// // // src/middlewares/auth.js
// module.exports = (req, res, next) => {
//     // Authentication logic
//     next();
//   };
// const express = require('express');
// const passport = require('passport');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const router = express.Router();
// const transporter = nodemailer.createTransport({
//   host: 'smtp.example.com', // Reemplaza con tu servidor SMTP
//   port: 587,
//   auth: {
//     user: 'tu-correo-electronico@example.com',
//     pass: 'tu-contrasena'
//   }
// });

// router.post('/send-token', async (req, res) => {
//   const token = req.body.token; 
//   const user = await User.findOne({ token });
//   if (!user) {
//     return res.status(400).json({ message: 'Usuario no encontrado' });
//   }

//   const html = `
//     <h1>¡Hola ${user.email}!</h1>
//     <p>Tu token de autenticación es:</p>
//     <p><strong>${token}</strong></p>
//     <p>No compartas este token con nadie.</p>
//   `;

//   const mailOptions = {
//     from: '"Jess" <tu-correo-electronico@example.com>',
//     to: user.email,
//     subject: 'Token de autenticación',
//     html: html
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.json({ message: 'Token enviado por correo electrónico' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error al enviar correo electrónico' });
//   }
// });
// router.post(
//   '/login',
//   passport.authenticate('login', { session: false }),
//   async (req, res, next) => {
//     res.json({
//       message: 'Login successful',
//       user: req.user
//     });
//   }
// );

// passport.use(
//   'login',
//   new localStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password'
//     },
//     async (email, password, done) => {
//       try {
//         const user = await UserModel.findOne({ email });

//         if (!user) {
//           return done(null, false, { message: 'User not found' });
//         }

//         const validate = await user.isValidPassword(password);

//         if (!validate) {
//           return done(null, false, { message: 'Wrong Password' });
//         }

//         return done(null, user, { message: 'Logged in Successfully' });
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// module.exports = router;

