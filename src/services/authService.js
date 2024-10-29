const passport = require("passport");
const crypto = require("crypto");
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const LocalStrategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const userService = require('../services/userService');
const User = require('../model/userSchema');
const Trabajador = require('../model/trabajadorEmpresaSchema');
const rolTrabajador = require('../model/rolTrabajadorSchema');
// function generateRandomToken(length = 3) {
//   return crypto.randomBytes(length).toString("hex");
// }

// const generateToken = async (req, res) => {
//   try {
//     const token = generateRandomToken(3);
//     // console.log(token);
//     res.status(200).json(token);
//   } catch (err) {
//     res.status(500).send({
//       message: err.message || "Error al realizar la búsqueda",
//     });
//   }
// };

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// const loginLocal = async (req, res) => {
//   try {
//     const correo = req.body.email;
//     const clave = req.body.password;
//     const filter = { email: correo };
//     const usersearch = await User.findOne(filter);
    

//     if (!usersearch) {
//       return res.status(401).json({message: "Usuario no encontrado"});;
//     }

//     const isMatch = await bcrypt.compare(clave, usersearch.password);
//     if (!isMatch) {
//       return res.status(401).json({message: "Contraseña incorrecta"});
//     }

//     const payload = {
//       _id: usersearch._id,
//       email: usersearch.email,
//       rolid: usersearch.rolTrabajador
//     }; 
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); 

//     return res.status(201).json({token: token});
//   } catch (error) {
//     console.error("Error fetching iso:", error);
//     res.status(500).json({ error: "Internal server error" });
//   } 
// };


const loginLocal = async (req, res) => {
  try {
    const correo = req.body.email;
    const clave = req.body.password;
    const filter = { email: correo };
    const usersearch = await User.findOne(filter);

    if (!usersearch) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(clave, usersearch.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const payload = {
      _id: usersearch._id,
      email: usersearch.email,
      rolid: usersearch.rolTrabajador,
      trabajadorid: usersearch.trabajador
    };

    // Generar el token de acceso
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Generar el token de refresco
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Actualizar el refreshToken en el usuario existente
    usersearch.refreshToken = refreshToken;
    await usersearch.save(); // Aquí guardamos el usuario sin crear uno nuevo

    // Enviar tokens al cliente
    return res.status(201).json({ token: token, refreshToken: refreshToken });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getTokenJwt = async (req, res) => {
  try {
    const payload = {
      _id: req.body._id,
      email: req.body.email,
    };
    const usersearch = await User.findOne(payload);

    const payloadobtenido = {
      _id: usersearch._id,
      email: usersearch.email,
      rolid: usersearch.rulUsuario,
      trabajadorid: usersearch.trabajador
    };
    
    if (!usersearch) {
      return res.status(401).json({message: "Usuario no encontrado"});;
    }
    const token = jwt.sign(payloadobtenido, process.env.JWT_SECRET, { expiresIn: '1h' }); 
    res.status(201).json({refreshToken: token});
    // await sendEmail();
  } catch (error) {
    es.status(error.statusCode || 500).json({ error: error.message });
  }
};

const sendEmail = async (token, correo) => {
  try {
     const mailOptions = {
      from: "jnorozcostore@gmail.com",
      to:  correo,
      subject: "Login Token for Your Account",

      html: `Click the link below to access your account:<br />
              <a href="http://your-app-domain/login?token=${token}">Login Link</a><br />
              This token is valid for 1 hour.`,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const loginOther = async(req, res)=> {
  try {
    const user= await userService.getEmail(req, res);
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = await getTokenJwt();
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const receipJwt = async(req, res) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json(req.body);
  })(req, res);
};

const verifyME = async (req, res) => {
  const bearerHeader = req.headers["authorization"];
  
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const obtenertrabajador = await Trabajador.findById(decoded.trabajadorid);
      // const obtenerrol = await rolTrabajador.findById(decoded.rolid);

      // const resp_decoded = {
      //   _id: decoded._id,
      //   email: decoded.email,
      //   rolid: decoded.rolid,
      //   nombrerol: obtenerrol.vName,
      //   trabajadorid: decoded.trabajadorid,
      //   nombretrabajador: obtenertrabajador.nombres +' ' + obtenertrabajador.apellidoPaterno +' ' + obtenertrabajador.apellidoMaterno
      // }
      res.status(200).json({ success: true, obtenertrabajador });
    } catch (err) {
      // Si el token no es válido o ha expirado
      res.status(403).json({ success: false, message: 'Token no válido' });
    }
  } else {
    // Si no se encuentra el token
    res.status(403).json({ success: false, message: 'No token provided' });
  }
};

const generateToken = async (req, res) => {
  try {
    const { email, password } = req.body; 

    const user = userService.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' }); 
    }

    if (!await userSchema.methods.isEmailValid(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!await userSchema.isValidPassword(password)) {
      return res.status(401).json({ message: 'Invalid credentials' }); 
    }


    const payload = { _id: user._id };


    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET;

    passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        userService.findById(jwt_payload._id)   

          .then(user => {
            if (user) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          })
          .catch(err => {
            console.error('Error al buscar usuario:', err);
            return done(err, false);
          });
      })
    );

    const token = await signToken(payload, opts.secretOrKey); 

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const signToken = async (payload, secret) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' }); 
};


module.exports = {
  passport,
  generateToken,
  sendEmail,
  loginOther,
  receipJwt,
  loginLocal,
  getTokenJwt,
  verifyME
};
