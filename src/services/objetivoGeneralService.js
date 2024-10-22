const objetivoGeneralSchema = require('../model/objetivoGeneralSchema');

const createobjetivoGeneral = async (req, res) => {
  const newobjetivoGeneral = new objetivoGeneralSchema(req.body);
  try {
    await newobjetivoGeneral.save();
    res.status(201).json({ message: 'objetivoGeneral creada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllobjetivoGenerales = async (req, res) => {
    try {
      const objetivoGenerals = await objetivoGeneralSchema.find();
      res.status(200).json(objetivoGenerals);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getobjetivoGeneralById = async (req, res) => {
  const objetivoGeneralId = req.params.id;
  try {
    const objetivoGeneral = await objetivoGeneralSchema.findById(objetivoGeneralId);
    if (!objetivoGeneral) {
      return res.status(404).json({ message: 'objetivoGeneral no encontrada' });
    }
    res.status(201).json(objetivoGeneral);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteobjetivoGeneral = async (req, res) => {
  const objetivoGeneralId = req.params.id;
  try {
    await objetivoGeneralSchema.findByIdAndDelete(objetivoGeneralId);
    res.status(200).json({ message: 'objetivoGeneral eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  createobjetivoGeneral,
  getAllobjetivoGenerales,
  getobjetivoGeneralById,
  deleteobjetivoGeneral
};
