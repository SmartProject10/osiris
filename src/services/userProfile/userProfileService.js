const UserProfiles = require("../../model/userProfile/userProfileSchema");
// TODO : for testing only
const FamilyData = require("../../model/userProfile/familyDataSchema");
const ContactInformations = require("../../model/userProfile/contactInformationSchema");
const AcademicData = require("../../model/userProfile/academicDataSchema");
const ExternalTraining = require("../../model/userProfile/externalTrainingSchema");
const Language = require("../../model/userProfile/languageSchema");
const CourseHistory = require("../../model/userProfile/courseHistorySchema");
const PerformanceEvaluationHistory = require("../../model/userProfile/performanceEvaluationHistorySchema");
const InformativeDocument = require("../../model/userProfile/informativeDocumentSchema");
const { connectToMongoClient } = require("../../config/db");

const getUserProfileById = async (req, res) => {
  const { email, id } = req.params;
  try {
    // connection established
    const coll = await connectToMongoClient("persona");

    // Find user by email
    const user = await coll.findOne({ vEmail: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile = await UserProfiles.findOne({
      iUser: user._id,
      _id: id,
    })
      .populate("iPersonalInformation")
      .populate("iEmploymentData")
      .populate("iLegajo");

    if (!userProfile) {
      return res.status(404).json({
        message: "User profile not found for the specified user",
      });
    }

    // TODO : for testing only
    const [
      familyData,
      contactInformation,
      academicData,
      externalTraining,
      language,
      courseHistory,
      performanceEvaluationHistory,
      informativeDocument,
    ] = await Promise.all([
      FamilyData.find({ iUserProfileId: userProfile._id }),
      ContactInformations.find({ iUserProfileId: userProfile._id }),
      AcademicData.find({ iUserProfileId: userProfile._id }),
      ExternalTraining.find({ iUserProfileId: userProfile._id }),
      Language.find({ iUserProfileId: userProfile._id }),
      CourseHistory.find({ iUserProfileId: userProfile._id }),
      PerformanceEvaluationHistory.find({ iUserProfileId: userProfile._id }),
      InformativeDocument.find({ iUserProfileId: userProfile._id }),
    ]);

    const profile = {
      userProfile,
      familyData,
      contactInformation,
      academicData,
      externalTraining,
      language,
      courseHistory,
      performanceEvaluationHistory,
      informativeDocument,
    };

    res.status(200).json(profile);

    // res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving user profile",
      error: error.message,
    });
  }
};

module.exports = {
  getUserProfileById,
};
