const User = require('../model/usersSchema');


const createUser = async (req, res) => {

  try {
    const newUser = new User(req.body);
    await newUser.save({ bufferTimeoutMS: 20000 });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};

const getUserById = async (req, res) => {
  try {
    const userId =req.params.id;
    const user = await User.findById({_id: userId}).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 
};

const getAllUser = async (req, res) => {
  console.log(req)
  // try {
  //   const users = await User.find({}).exec();
  //   res.status(200).json(users);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
  const nombre = req.query.nombre;
        // var condicion = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

        try {
            const data = await User.find({});
            return res.json(data);
        } catch (err) {
            res.status(500).send({
                message:
                    err.message || "Error al realizar la búsqueda"
            });
        }
};

const updateUser = async (req, res) => {
  const UserId = req.params.id;
  const updatedUser = req.body;
  try {
    const User = await User.findByIdAndUpdate(UserId, updatedUser, { new: true });
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
    await User.findByIdAndDelete(UserId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUser,
  updateUser,
  deleteUser,
};
