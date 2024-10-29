const ActividadSchema = require('../model/ActividadSchema');

const createActividad = async (req, res) => {
  const newActividad = new ActividadSchema(req.body);
  try {
    await newActividad.save();
    res.status(201).json({ message: 'Actividad creada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllActividades = async (req, res) => {
    try {
      const Actividads = await ActividadSchema.find();
      res.status(200).json(Actividads);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getActividadById = async (req, res) => {
  const ActividadId = req.params.id;
  try {
    const Actividad = await ActividadSchema.findById(ActividadId);
    if (!Actividad) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }
    res.status(201).json(Actividad);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteActividad = async (req, res) => {
  const ActividadId = req.params.id;
  try {
    await ActividadSchema.findByIdAndDelete(ActividadId);
    res.status(200).json({ message: 'Actividad eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  createActividad,
  getAllActividades,
  getActividadById,
  deleteActividad
};
