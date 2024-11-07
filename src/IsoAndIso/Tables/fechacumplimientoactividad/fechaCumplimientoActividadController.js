const fechaCumplimientoActividadService = require('./fechaCumplimientoActividadService');

//Crear una nueva fecha de cumplimiento para la actividad
const createActivityComplianceDate = async (req, res) => {
  try {
    const fechaCumplimientoActividad = await fechaCumplimientoActividadService.createActivityComplianceDate(req);
    res.status(201).json(fechaCumplimientoActividad);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la fecha cumplimiento actividad', error: error.message });
  }
};

//Obtener todas las fechas de cumplimiento de actividades
const getAllActivitiesComplianceDate = async (req, res) => {
  try {
    const fechasCumplimientoActividades = await fechaCumplimientoActividadService.getAllActivitiesComplianceDate();
    res.status(200).json(fechasCumplimientoActividades);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las fechas cumplimiento de actividades', error: error.message });
  }
};

//Obtener una fecha de cumplimiento de actividad por ID
const getActivityComplianceDateById = async (req, res) => {
  try {
    const fechaCumplimientoActividad = await fechaCumplimientoActividadService.getActivityComplianceDateById(req);
    if (!fechaCumplimientoActividad) {
      return res.status(404).json({ message: 'Fecha cumplimiento actividad no encontrada' });
    }
    res.status(200).json(fechaCumplimientoActividad);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la fecha cumplimiento actividad por ID', error: error.message });
  }
};

//Eliminar una fecha de cumplimiento de actividad por ID
const deleteActivityComplianceDateById = async (req, res) => {
  try {
    await fechaCumplimientoActividadService.deleteActivityComplianceDateById(req);
    res.status(200).json({ message: 'Fecha cumplimiento actividad eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la fecha cumplimiento actividad por ID', error: error.message });
  }
};

module.exports = {
  createActivityComplianceDate,
  getAllActivitiesComplianceDate,
  getActivityComplianceDateById,
  deleteActivityComplianceDateById
};