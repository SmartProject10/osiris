const fechaCumpActividadSchema = require('../model/fechaCumpActividadSchema');

const createfechaCumpActividad = async (req, res) => {
  const newfechaCumpActividad = new fechaCumpActividadSchema(req.body);
  try {
    await newfechaCumpActividad.save();
    res.status(201).json({ message: 'fechaCumpActividad creada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllfechaCumpActividades = async (req, res) => {
    try {
      const fechaCumpActividads = await fechaCumpActividadSchema.find();
      res.status(200).json(fechaCumpActividads);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getfechaCumpActividadById = async (req, res) => {
  const fechaCumpActividadId = req.params.id;
  try {
    const fechaCumpActividad = await fechaCumpActividadSchema.findById(fechaCumpActividadId);
    if (!fechaCumpActividad) {
      return res.status(404).json({ message: 'fechaCumpActividad no encontrada' });
    }
    res.status(201).json(fechaCumpActividad);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deletefechaCumpActividad = async (req, res) => {
  const fechaCumpActividadId = req.params.id;
  try {
    await fechaCumpActividadSchema.findByIdAndDelete(fechaCumpActividadId);
    res.status(200).json({ message: 'fechaCumpActividad eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  createfechaCumpActividad,
  getAllfechaCumpActividades,
  getfechaCumpActividadById,
  deletefechaCumpActividad
};
