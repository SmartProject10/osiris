const actividadService = require('./actividadService');

//Crear una nueva actividad
const createActivity = async (req, res) => {
  try {
    const activity = await actividadService.createActivity(req);
    res.status(201).json(activity);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la actividad', error: error.message });
  }
};

//Obtener todas las actividades
const getAllActivities = async (req, res) => {
  try {
    const activities = await actividadService.getAllActivities();
    res.status(200).json(activities);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agarrando todas las actividades', error: error.message });
  }
};

//Obtener una actividad por ID
const getActivityById = async (req, res) => {
  try {
    const activity = await actividadService.getActivityById(req);
    if (!activity) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agarrando la actividad con dicho id', error: error.message });
  }
};

//Eliminar una actividad por ID
const deleteActivityById = async (req, res) => {
  try {
    await actividadService.deleteActivityById(req);
    res.status(200).json({ message: 'Actividad eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la actividad con dicho id', error: error.message });
  }
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  deleteActivityById,
};