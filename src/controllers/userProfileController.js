const express = require('express');
const router = express.Router();
const personalInformation = require('../services/UserProfile/personalInformationService');
const UserProfile = require('../services/UserProfile/userProfileService');
const employmentData = require('../services/UserProfile/employmentDataService');
const familyData = require('../services/UserProfile/familyDataService');
const contactInformation = require('../services/UserProfile/contactInformationService');

// user profile
router.get('/:email/:id', UserProfile.getUserProfileById);

// Routes for personal information
router.post('/personal_information/', personalInformation.createPersonalInformation);
router.patch('/personal_information/:iUserProfileId/:id', personalInformation.updatePersonalInformation);

// Routes for employment data
router.post('/employment_data/:iUserProfileId', employmentData.createEmploymentData);
router.patch('/employment_data/:iUserProfileId/:id', employmentData.updateEmploymentData);

// Routes for family data
router.post('/family_data/:iUserProfileId', familyData.createFamilyData);
router.patch('/family_data/:iUserProfileId/:id', familyData.updateFamilyData);
router.get('/family_data/:iUserProfileId', familyData.getAllFamilyData);
router.get('/family_data/:iUserProfileId/:id', familyData.getFamilyDataById);
router.delete('/family_data/:iUserProfileId/:id', familyData.deleteFamilyData);

// Routes for contact information
router.post('/contact_information/:iUserProfileId', contactInformation.createContactInformation);
router.patch('/contact_information/:iUserProfileId/:id', contactInformation.updateContactInformation);
router.get('/contact_information/:iUserProfileId', contactInformation.getAllContactInformations);
router.get('/contact_information/:iUserProfileId/:id', contactInformation.getContactInformationById);
router.delete('/contact_information/:iUserProfileId/:id', contactInformation.deleteContactInformation);

module.exports = router;
