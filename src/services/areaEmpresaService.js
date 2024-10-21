const areaEmpresa = require('../model/areaEmpresaSchema');

const createAreaEmpresa = async (req, res) => {
  const area = new areaEmpresa(req.body);
  try {
    await area.save();
    res.status(201).json({ message: 'Área creada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllAreaEmpresa = async (req, res) => {
    try {
      const area = await areaEmpresa.find();
      res.status(200).json(area);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getAreaEmpresaById = async (req, res) => {
  const areaEmpresaId = req.params.id;
  try {
    const area = await areaEmpresa.findById(areaEmpresaId);
    if (!area) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }
    res.status(201).json(area);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteAreaEmpresa = async (req, res) => {
  const areaEmpresaId = req.params.id;
  try {
    await areaEmpresa.findByIdAndDelete(areaEmpresaId);
    res.status(200).json({ message: 'Área eliminada correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  createAreaEmpresa,
  getAllAreaEmpresa,
  getAreaEmpresaById,
  deleteAreaEmpresa
};
