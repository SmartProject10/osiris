const workerService = require('./workerService');

//Creación del trabajador
/*la creación se hará en la página webiso en el cual se ponen todos los campos excepto "nombre","apellido" y "contraseña" que sí se pondrán cuando se registre el trabajor desde la página "iso and iso"*/
// const create = async (req, res) => {
//   try {
//     const worker = await workerService.create(req);
//     res.status(201).json(worker);
//   } catch (error) {
//     res.status(error.statusCode || 500).json({ message: 'Error creando el trabajador', error: error.message });
//   }
// };

//Registro de trabajador
/*
(el trabajador ya se habrá creado antes desde la página webiso con todos los campos exceptuando los campos "nombre","apellido"
 y "contraseña", los cuales se asignarán acá, cuando se ingresé acá desde la página isoandiso)
*/
const register = async (req, res) => {
  try {
    const { token, worker } = await workerService.register(req);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, //cambiar a true cuando este proyecto de backend esté subido a un servidor https
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'Lax' //cambiar a None cuando este proyecto de backend esté subido a un servidor https
    });
    res.status(201).json(worker);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando al trabajador', error: error.message });
  }
};

//Inicio de sesión del trabajador
const login = async (req, res) => {
  try {
    const { token, worker } = await workerService.login(req);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, //cambiar a true cuando este proyecto de backend esté subido a un servidor https
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'Lax' //cambiar a None cuando este proyecto de backend esté subido a un servidor https
    });
    res.status(200).json(worker);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error logeándose con el trabajador', error: error.message });
  }
};

//Cierre de sesión del trabajador
const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Deslogueo del trabajador satisfactorio' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al desloguearse del trabajador', error: error.message });
  }
};

//Obtener perfil del trabajador
const profile = async (req, res) => {
  try {
    const worker = await workerService.profile(req);
    res.status(200).json(worker);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al obtener el perfil del trabajador', error: error.message });
  }
};

//Obtener todos los trabajadores de la empresa
const getAllCompanyWorkers = async (req, res) => {
  try {
    const workers = await workerService.getAllCompanyWorkers();
    res.status(200).json(workers);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los trabajadores', error: error.message });
  }
};

//Obtener trabajador por ID
const getCompanyWorker = async (req, res) => {
  try {
    const worker = await workerService.getCompanyWorker(req);
    if (!worker) {
      return res.status(404).json({ message: 'Trabajador no encontrado' });
    }
    res.status(200).json(worker);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el trabajador', error: error.message });
  }
};

//Obtener trabajador por email
const getCompanyWorkerByEmail = async (req, res) => {
  try {
    const worker = await workerService.getCompanyWorkerByEmail(req);
    if (!worker) {
      return res.status(404).json({ message: 'Trabajador no encontrado' });
    }
    res.status(200).json(worker);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el trabajador', error: error.message });
  }
};

//Actualizar trabajador por ID
const updateCompanyWorker = async (req, res) => {
  try {
    const worker = await workerService.updateCompanyWorker(req);
    res.status(200).json(worker);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando al trabajador', error: error.message });
  }
};

//Eliminar trabajador por ID
const deleteCompanyWorker = async (req, res) => {
  try {
    await workerService.deleteCompanyWorker(req);
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
  getCompanyWorker,
  getCompanyWorkerByEmail,
  updateCompanyWorker,
  deleteCompanyWorker,
};