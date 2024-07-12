const express = require('express');
const router = express.Router();
const cargoEmpresaService = require('../services/cargoEmpresaService'); // Assuming you have a service module

// Create a new company position
router.post('/cargo', async (req, res) => {
  try {
    const cargoEmpresaData = req.body; // Extract company position data from request body
    const createdCargoEmpresa = await cargoEmpresaService.createCargoEmpresa(cargoEmpresaData);
    res.status(201).json(createdCargoEmpresa); // Send created company position in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Read all company positions
router.get('/cargos', async (req, res) => {
  try {
    const cargoEmpresas = await cargoEmpresaService.getAllCargoEmpresas();
    res.json(cargoEmpresas); // Send all company positions in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Read a specific company position by ID
router.get('/cargo/:id', async (req, res) => {
  try {
    const cargoEmpresaId = req.params.id; // Get company position ID from request parameters
    const cargoEmpresa = await cargoEmpresaService.getCargoEmpresaById(cargoEmpresaId);
    if (!cargoEmpresa) {
      return res.status(404).json({ message: 'Company position not found' });
    }
    res.json(cargoEmpresa); // Send company position in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Update a specific company position
router.put('/cargo/:id', async (req, res) => {
  try {
    const cargoEmpresaId = req.params.id; // Get company position ID from request parameters
    const cargoEmpresaData = req.body; // Extract updated company position data from request body
    const updatedCargoEmpresa = await cargoEmpresaService.updateCargoEmpresaById(cargoEmpresaId, cargoEmpresaData);
    if (!updatedCargoEmpresa) {
      return res.status(404).json({ message: 'Company position not found' });
    }
    res.json(updatedCargoEmpresa); // Send updated company position in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Delete a specific company position
router.delete('/cargo/:id', async (req, res) => {
  try {
    const cargoEmpresaId = req.params.id; // Get company position ID from request parameters
    await cargoEmpresaService.deleteCargoEmpresaById(cargoEmpresaId);
    res.status(204).json(); // Send no content response on successful deletion
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Error handling function (example)
function handleError(error, res) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}

module.exports = router;
