const trabajadorService = require('../services/trabajadorService');

const createTrabajador = async (req, res) => {
  try {
    const newTrabajador = await trabajadorService.createTrabajador(req.body);
    res.status(201).json(newTrabajador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrabajadorById = async (req, res) => {
  try {
    const trabajador = await trabajadorService.getTrabajadorById(req.params.id);
    if (!trabajador) return res.status(404).json({ message: 'Trabajador no encontrado' });
    res.status(200).json(trabajador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTrabajadores = async (req, res) => {
  try {
    const filtros = {
      area: req.query.area,
      cargo: req.query.cargo,
      dni: req.query.dni,
      apellidoPaterno: req.query.apellidoPaterno,
      apellidoMaterno: req.query.apellidoMaterno,
      estadoCivil: req.query.estadoCivil,
      genero: req.query.genero,
      nacionalidad: req.query.nacionalidad,
      distrito: req.query.distrito,
      direccion: req.query.direccion,
      status: req.query.status,
    };
    // Extraer parámetros de paginación
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Llamar al servicio de trabajadores con los filtros y la paginación
    const result = await trabajadorService.getAllTrabajadores(filtros, page, limit);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTrabajador = async (req, res) => {
  try {
    const updatedTrabajador = await trabajadorService.updateTrabajador(req.params.id, req.body);
    if (!updatedTrabajador) return res.status(404).json({ message: 'Trabajador no encontrado' });
    res.status(200).json(updatedTrabajador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTrabajador = async (req, res) => {
  try {
    const trabajador = await trabajadorService.deleteTrabajador(req.params.id);
    if (!trabajador) return res.status(404).json({ message: 'Trabajador no encontrado' });
    res.status(200).json({ message: 'Trabajador eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTrabajador,
  getTrabajadorById,
  getAllTrabajadores,
  updateTrabajador,
  deleteTrabajador
};
