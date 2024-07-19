const Persona = require('../model/personaSchema');

const createPersona = async (req, res) => {
  const newPersona = new Persona(req.body);
  try {
    await newPersona.save();
    res.status(201).json({ message: 'Persona created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPersonaById = async (req, res) => {
  const PersonaId = req.params.id;
  try {
    const Persona = await Persona.findById(PersonaId);
    if (!Persona) {
      return res.status(404).json({ message: 'Persona not found' });
    }
    res.status(200).json(Persona);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPersonas = async (req, res) => {
  try {
    const Personas = await Persona.find();
    res.status(200).json(Personas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePersona = async (req, res) => {
  const PersonaId = req.params.id;
  const updatedPersona = req.body;
  try {
    const Persona = await Persona.findByIdAndUpdate(PersonaId, updatedPersona, { new: true });
    if (!Persona) {
      return res.status(404).json({ message: 'Persona not found' });
    }
    res.status(200).json(Persona);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePersona = async (req, res) => {
  const PersonaId = req.params.id;
  try {
    await Persona.findByIdAndDelete(PersonaId);
    res.status(200).json({ message: 'Persona deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPersona,
  getPersonaById,
  getAllPersonas,
  updatePersona,
  deletePersona,
};
