const trabajadorService = require('./trabajadorService');

//Registro de trabajador
const register = async (req, res) => {
  try {
    const { token, trabajador } = await trabajadorService.register(req);
    res.cookie('token', token);
    res.status(201).json(trabajador);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando al trabajador', error: error.message });
  }
};

//Inicio de sesión del trabajador
const login = async (req, res) => {
  try {
    const { token, trabajador } = await trabajadorService.login(req);
    res.cookie('token', token);
    res.status(200).json(trabajador);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error logeándose con el trabajador', error: error.message });
  }
};

//Cierre de sesión del trabajador
const logout = async (req, res) => {
  try {
    await trabajadorService.logout(res);
    res.status(200).json({ message: 'Deslogueo del trabajador satisfactorio' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al desloguearse del trabajador', error: error.message });
  }
};

//Obtener perfil del trabajador
const profile = async (req, res) => {
  try {
    const trabajador = await trabajadorService.profile(req);
    res.status(200).json(trabajador);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al obtener el perfil del trabajador', error: error.message });
  }
};

//Obtener todos los trabajadores de la empresa
const getAllCompanyWorkers = async (req, res) => {
  try {
    const trabajadores = await trabajadorService.getAllCompanyWorkers();
    res.status(200).json(trabajadores);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los trabajadores', error: error.message });
  }
};

//Obtener trabajador por ID
const getCompanyWorkerById = async (req, res) => {
  try {
    const trabajador = await trabajadorService.getCompanyWorkerById(req);
    if (!trabajador) {
      return res.status(404).json({ message: 'Trabajador no encontrado' });
    }
    res.status(200).json(trabajador);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el trabajador con el id', error: error.message });
  }
};

//Actualizar trabajador por ID
const updateCompanyWorkerById = async (req, res) => {
  try {
    const trabajador = await trabajadorService.updateCompanyWorkerById(req);
    res.status(200).json(trabajador);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando al trabajador', error: error.message });
  }
};

//Eliminar trabajador por ID
const deleteCompanyWorkerById = async (req, res) => {
  try {
    await trabajadorService.deleteCompanyWorkerById(req);
    res.status(200).json({ message: 'Trabajador eliminado satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando al trabajador', error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  profile,
  getAllCompanyWorkers,
  getCompanyWorkerById,
  updateCompanyWorkerById,
  deleteCompanyWorkerById,
};