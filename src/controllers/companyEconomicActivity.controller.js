const express = require('express');
const router = express.Router();
const companyEconomicActivityService = require('../services/companyEconomicActivity.service'); // Assuming you have a service module

// Create a new company economic activity
router.post('/companyActivity', async (req, res) => {
  try {
    const companyEconomicActivityData = req.body; // Extract company economic activity data from request body
    const createdCompanyEconomicActivity = await companyEconomicActivityService.createCompanyEconomicActivity(companyEconomicActivityData);
    res.status(201).json(createdCompanyEconomicActivity); // Send created company economic activity in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Read all company economic activities
router.get('/companyActivities', async (req, res) => {
  try {
    const companyEconomicActivities = await companyEconomicActivityService.getAllCompanyEconomicActivities();
    res.json(companyEconomicActivities); // Send all company economic activities in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Read a specific company economic activity by ID
router.get('/companyActivity/:id', async (req, res) => {
  try {
    const companyEconomicActivityId = req.params.id; // Get company economic activity ID from request parameters
    const companyEconomicActivity = await companyEconomicActivityService.getCompanyEconomicActivityById(companyEconomicActivityId);
    if (!companyEconomicActivity) {
      return res.status(404).json({ message: 'Company economic activity not found' });
    }
    res.json(companyEconomicActivity); // Send company economic activity in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Update a specific company economic activity
router.put('/companyActivity/:id', async (req, res) => {
  try {
    const companyEconomicActivityId = req.params.id; // Get company economic activity ID from request parameters
    const companyEconomicActivityData = req.body; // Extract updated company economic activity data from request body
    const updatedCompanyEconomicActivity = await companyEconomicActivityService.updateCompanyEconomicActivityById(companyEconomicActivityId, companyEconomicActivityData);
    if (!updatedCompanyEconomicActivity) {
      return res.status(404).json({ message: 'Company economic activity not found' });
    }
    res.json(updatedCompanyEconomicActivity); // Send updated company economic activity in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Delete a specific company economic activity
router.delete('/companyActivity/:id', async (req, res) => {
  try {
    const companyEconomicActivityId = req.params.id; // Get company economic activity ID from request parameters
    await companyEconomicActivityService.deleteCompanyEconomicActivityById(companyEconomicActivityId);
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
