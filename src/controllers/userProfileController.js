const express = require('express');
const router = express.Router();
const personalInformation = require('../services/userProfile/personalInformationService');
const userProfile = require('../services/userProfile/userProfileService');
const employmentData = require('../services/userProfile/employmentDataService');
const familyData = require('../services/userProfile/familyDataService');
const contactInformation = require('../services/userProfile/contactInformationService');
const academicData = require('../services/userProfile/academicDataService');
const externalTraining = require('../services/userProfile/externalTrainingService');
const language = require('../services/userProfile/languageService');
const legajo = require('../services/userProfile/legajoService');

// user profile
router.get('/me/:email/:id', userProfile.getUserProfileById);

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

// Routes for academic data
router.post('/academic_data/:iUserProfileId', academicData.createAcademicData);
router.patch('/academic_data/:iUserProfileId/:id', academicData.updateAcademicData);
router.get('/academic_data/:iUserProfileId', academicData.getAllAcademicData);
router.get('/academic_data/:iUserProfileId/:id', academicData.getAcademicDataById);
router.delete('/academic_data/:iUserProfileId/:id', academicData.deleteAcademicData);

// Routes for external training
router.post('/external_training/:iUserProfileId', externalTraining.createExternalTraining);
router.patch('/external_training/:iUserProfileId/:id', externalTraining.updateExternalTraining);
router.get('/external_training/:iUserProfileId', externalTraining.getAllExternalTraining);
router.get('/external_training/:iUserProfileId/:id', externalTraining.getExternalTrainingById);
router.delete('/external_training/:iUserProfileId/:id', externalTraining.deleteExternalTraining);

// Routes for language
router.post('/language/:iUserProfileId', language.createLanguage);
router.patch('/language/:iUserProfileId/:id', language.updateLanguage);
router.get('/language/:iUserProfileId', language.getAllLanguage);
router.get('/language/:iUserProfileId/:id', language.getLanguageById);
router.delete('/language/:iUserProfileId/:id', language.deleteLanguage);

// Routes for legajo
router.post('/legajo/:iUserProfileId', legajo.upsertLegajo);
router.delete('/legajo/:iUserProfileId/:id', legajo.deleteLegajo);

module.exports = router;
