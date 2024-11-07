const empresaService = require('./empresaService');

//Crear empresa
const register = async (req, res) => {
  try {
    const { token, empresa } = await empresaService.register(req);
    res.cookie('token', token);
    res.status(201).json(empresa);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando a la empresa', error: error.message });
  }
};

//Iniciar sesión de empresa
const login = async (req, res) => {
  try {
    const { token, empresa } = await empresaService.login(req);
    res.cookie('token', token);
    res.status(200).json(empresa);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error logeándose con la empresa', error: error.message });
  }
};

//Cerrar sesión de empresa
const logout = async (res) => {
  try {
    await empresaService.logout(res);
    res.status(200).json({ message: 'Deslogeo de la empresa satisfactorio' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error deslogeándose con la empresa', error: error.message });
  }
};

//Obtener perfil de empresa
const profile = async (req, res) => {
  try {
    const empresa = await empresaService.profile(req);
    res.status(200).json(empresa);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al obtener el perfil de la empresa', error: error.message });
  }
};

//Obtener todas las empresas
const getAllCompanies = async (req, res) => {
  try {
    const empresas = await empresaService.getAllCompanies();
    res.status(200).json(empresas);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las empresas', error: error.message });
  }
};

//Obtener empresa por ID
const getCompanyById = async (req, res) => {
  try {
    const empresa = await empresaService.getCompanyById(req);
    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(200).json(empresa);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la empresa por ID', error: error.message });
  }
};

//Actualizar empresa por ID
const updateCompanyById = async (req, res) => {
  try {
    const empresa = await empresaService.updateCompanyById(req, res);
    res.status(200).json(empresa);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando la empresa por ID', error: error.message });
  }
};

//Eliminar empresa por ID
const deleteCompanyById = async (req, res) => {
  try {
    await empresaService.deleteCompanyById(req);
    res.status(200).json({ message: 'Empresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la empresa por ID', error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  profile,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
};