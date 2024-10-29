const empresa = require('../model/empresaSchema');

const createEmpresa = async (req, res) => {
  const newEmpresa = new empresa(req.body);
  try {
    await newEmpresa.save();
    res.status(201).json({ message: 'Empresa creada correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllEmpresa = async (req, res) => {
    try {
      const empresas = await empresa.find();
      res.status(200).json(empresas);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getEmpresaById = async (req, res) => {
  const empresaId = req.params.id;
  try {
    const empresa = await empresa.findById(empresaId);
    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(201).json(empresa);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteEmpresa = async (req, res) => {
  const empresaId = req.params.id;
  try {
    await empresa.findByIdAndDelete(empresaId);
    res.status(200).json({ message: 'Empresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllAreasEmpresa = async (req, res) => {
  const empresaId = req.params.id;
  try {
    const empresa = await empresa.findById(empresaId).populate('areaEmpresaIds')
    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(200).json(empresa.areaEmpresaIds); // Atención: gracias a 'populate('areaEmpresaIds')' estamos devolviendo no solo los ID de las áreas sino también los demás campos
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
    createEmpresa,
    getAllEmpresa,
    getEmpresaById,
    deleteEmpresa,
    getAllAreasEmpresa
};
