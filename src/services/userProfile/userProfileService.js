const UserProfiles = require("../../model/userProfile/userProfileSchema");
const FamilyData = require("../../model/userProfile/familyDataSchema");
const ContactInformations = require("../../model/userProfile/contactInformationSchema");
const AcademicData = require("../../model/userProfile/academicDataSchema");
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
      .populate("iEmploymentData");

    if (!userProfile) {
      return res.status(404).json({
        message: "User profile not found for the specified user",
      });
    }

    const [familyData, contactInformation, academicData] = await Promise.all([
      FamilyData.find({ iUserProfileId: userProfile._id }),
      ContactInformations.find({ iUserProfileId: userProfile._id }),
      AcademicData.find({ iUserProfileId: userProfile._id }),
    ]);

    const profile = {
      userProfile,
      familyData,
      contactInformation,
      academicData,
    };

    res.status(200).json(profile);
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
