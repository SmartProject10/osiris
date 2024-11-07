const usuarioService = require('./usuarioService');

//Registro de usuario
const register = async (req, res) => {
  try {
    const { token, usuario } = await usuarioService.register(req);
    res.cookie('token', token);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando al usuario', error: error.message });
  }
};

//Login de usuario
const login = async (req, res) => {
  try {
    const { token, usuario } = await usuarioService.login(req);
    res.cookie('token', token);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error logeandose con el usuario', error: error.message });
  }
};

//Logout de usuario
const logout = async (req, res) => {
  try {
    await usuarioService.logout(res);
    res.status(200).json({ message: 'Deslogeo del usuario satisfactorio' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error deslogeandose con el usuario', error: error.message });
  }
};

//Obtener perfil de usuario
const profile = async (req, res) => {
  try {
    const usuario = await usuarioService.profile(req);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el perfil del usuario', error: error.message });
  }
};

//Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const usuarios = await usuarioService.getAllUsers();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los usuarios', error: error.message });
  }
};

//Obtener usuario por ID
const getUserById = async (req, res) => {
  try {
    const usuario = await usuarioService.getUserById(req);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el usuario por ID', error: error.message });
  }
};

//Actualizar usuario por ID
const updateUserById = async (req, res) => {
  try {
    const usuario = await usuarioService.updateUser(req);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando el usuario por ID', error: error.message });
  }
};

//Eliminar usuario por ID
const deleteUserById = async (req, res) => {
  try {
    await usuarioService.deleteUser(req);
    res.status(200).json({ message: 'Usuario eliminado satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando el usuario por ID', error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  profile,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};