const tipoDeAdquisicionSchema = require('../model/tipoDeAdquisicionSchema');

const createTipoDeAdquisicion = async (req, res) => {
  const newTipoDeAdquisicion = new tipoDeAdquisicionSchema(req.body);
  try {
    await newTipoDeAdquisicion.save();
    res.status(201).json({ message: 'Tipo de adquisicion creada correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllTipoDeAdquisicion = async (req, res) => {
    try {
      const tipoDeAdquisiciones = await tipoDeAdquisicionSchema.find();
      res.status(200).json(tipoDeAdquisiciones);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getTipoDeAdquisicionById = async (req, res) => {
  const tipoDeAdquisicionId = req.params.id;
  try {
    const tipoDeAdquisicion = await tipoDeAdquisicionSchema.findById(tipoDeAdquisicionId);
    if (!tipoDeAdquisicion) {
      return res.status(404).json({ message: 'Tipo de adquisicion no encontrada' });
    }
    res.status(201).json(tipoDeAdquisicion);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteTipoDeAdquisicion = async (req, res) => {
  const tipoDeAdquisicionId = req.params.id;
  try {
    await tipoDeAdquisicionSchema.findByIdAndDelete(tipoDeAdquisicionId);
    res.status(200).json({ message: 'Tipo de adquisicion eliminada correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
    createTipoDeAdquisicion,
    getAllTipoDeAdquisicion,
    getTipoDeAdquisicionById,
    deleteTipoDeAdquisicion
};
