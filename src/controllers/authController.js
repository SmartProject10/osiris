const User = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const { createAccessToken } = require('../lib/jwt.js');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {

  const { email, password, lastname, firstname } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: passwordHash,
      firstname,
      lastname
    });
    const UserSaved = await newUser.save();
    const token = await createAccessToken({ id: UserSaved._id });

   // res.cookie('token', token);

    res.json({
      token: token,
      message: 'User created successfully',
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}


const login = async (req, res) => {

  const { email, password } = req.body;

  try {

    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });


    const token = await createAccessToken({ id: userFound._id });

    res.cookie('token', token)

    res.json({
      token: token,
      message: 'User login successfully',
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

const logout = async (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  return res.sendStatus(200);
}

const profile = async (req, res) => {

  try {

    const userFound = await User.findById(req.user.payload.id);

    if (!userFound) return res.status(400).json({ message: "User not found" });

    //console.log(userFound);

    res.json({
      id: userFound.id,
      firstname: userFound.firstname,
      lastname: userFound.lastname,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    });

  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }

}

const verify_token = async (req, res) => {


  const token = req.headers['authorization'] != undefined ? req.headers['authorization'] : req.headers['Authorization'];


  if (!token) return res.status(401).json({ message: "Unauthorized _1" });

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized _2" });

    const userFound = await User.findById(user.payload.id);

    if (!userFound) return res.status(401).json({ message: "Unauthorized _3" });

    return res.json({
      id: userFound.id,
      firstname: userFound.firstname,
      lastname: userFound.lastname,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    });
  })

}


module.exports = {
  register,
  login,
  logout,
  profile,
  verify_token
};