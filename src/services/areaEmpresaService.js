const Area= require('../model/areaEmpresaSchema');

const createArea = async (req, res) => {
  const newArea = new Area(req.body);
  try {
    await newArea.save();
    res.status(201).json({ message: 'Area created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAreaById = async (req, res) => {
  const AreaId = req.params.id;
  try {
    const Area = await Area.findById(AreaId);
    if (!Area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    res.status(200).json(Area);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllAreas = async (req, res) => {
  try {
    const Areas = await Area.find();
    res.status(200).json(Areas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateArea = async (req, res) => {
  const AreaId = req.params.id;
  const updatedArea = req.body;
  try {
    const Area = await Area.findByIdAndUpdate(AreaId, updatedArea, { new: true });
    if (!Area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    res.status(200).json(Area);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteArea = async (req, res) => {
  const AreaId = req.params.id;
  try {
    await Area.findByIdAndDelete(AreaId);
    res.status(200).json({ message: 'Area deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createArea,
  getAreaById,
  getAllAreas,
  updateArea,
  deleteArea,
};
