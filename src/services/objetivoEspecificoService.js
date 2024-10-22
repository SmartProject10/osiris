const objetivoEspecificoSchema = require('../model/objetivoEspecificoSchema');

const createobjetivoEspecifico = async (req, res) => {
  const newobjetivoEspecifico = new objetivoEspecificoSchema(req.body);
  try {
    await newobjetivoEspecifico.save();
    res.status(201).json({ message: 'objetivoEspecifico creada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllobjetivoEspecificos = async (req, res) => {
    try {
      const objetivoEspecificos = await objetivoEspecificoSchema.find();
      res.status(200).json(objetivoEspecificos);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getobjetivoEspecificoById = async (req, res) => {
  const objetivoEspecificoId = req.params.id;
  try {
    const objetivoEspecifico = await objetivoEspecificoSchema.findById(objetivoEspecificoId);
    if (!objetivoEspecifico) {
      return res.status(404).json({ message: 'objetivoEspecifico no encontrada' });
    }
    res.status(201).json(objetivoEspecifico);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteobjetivoEspecifico = async (req, res) => {
  const objetivoEspecificoId = req.params.id;
  try {
    await objetivoEspecificoSchema.findByIdAndDelete(objetivoEspecificoId);
    res.status(200).json({ message: 'objetivoEspecifico eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  createobjetivoEspecifico,
  getAllobjetivoEspecificos,
  getobjetivoEspecificoById,
  deleteobjetivoEspecifico
};
