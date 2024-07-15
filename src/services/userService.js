const users = require('../model/usersSchema');


const createUser= async (req, res) => {


  try {
    const newUser = new users(req.body);
    await newUser.save({ bufferTimeoutMS: 20000 });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};

const getUserById = async (req, res) => {
  try {
    const UserId = req.params.id;
    const User = await users.findById(UserId);
    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 
};

const getAllUsers = async (req, res) => {
  try {
    const Users = await users.find();
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const UserId = req.params.id;
  const updatedUser = req.body;
  try {
    const User = await users.findByIdAndUpdate(UserId, updatedUser, { new: true });
    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const UserId = req.params.id;
  try {
    await users.findByIdAndDelete(UserId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
