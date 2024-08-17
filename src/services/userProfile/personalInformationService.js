const UserProfiles = require("../../model/userProfile/userProfileSchema");
const PersonalInformation = require("../../model/userProfile/personalInformationSchema");
const { connectToMongoClient } = require("../../config/db");

const createPersonalInformation = async (req, res) => {
  const { userEmail, ...data } = req.body;

  try {
    // connection established
    const coll = await connectToMongoClient("persona");

    // Find users by email
    const users = await coll.find({ vEmail: { $in: userEmail } }).toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: "Users not found" });
    }

    const newPersonalInformation = new PersonalInformation(data);
    await newPersonalInformation.save();

    // Create an array of objects with user IDs
    const usersArray = users.map((user) => ({ _id: user._id }));

    // Create a new user profile with personal information
    const newUserProfile = new UserProfiles({
      iUser: usersArray,
      iPersonalInformation: newPersonalInformation._id,
    });

    // Save the new user profile
    await newUserProfile.save();
    res.status(201).json({
      profile: newUserProfile,
      personalInformation: newPersonalInformation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updatePersonalInformation = async (req, res) => {
  const { iUserProfileId, id } = req.params;
  const { userEmail, ...data } = req.body;

  try {
    const userProfile = await UserProfiles.findById(iUserProfileId);
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // connection established
    const coll = await connectToMongoClient("persona");

    // Find users by email
    const users = await coll.find({ vEmail: { $in: userEmail } }).toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: "Users not found" });
    }

    // Update existing personal information
    const updatedPersonalInformation = await PersonalInformation.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!updatedPersonalInformation) {
      return res
        .status(404)
        .json({ message: "Personal information not found" });
    }

    // Create an array of objects with user IDs
    const usersArray = users.map((user) => ({
      _id: user._id,
    }));

    // Update the user profile with the updated personal information
    const updatedUserProfile = await UserProfiles.findByIdAndUpdate(
      iUserProfileId,
      {
        iUser: usersArray,
        iPersonalInformation: updatedPersonalInformation._id,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      profile: updatedUserProfile,
      personalInformation: updatedPersonalInformation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createPersonalInformation,
  updatePersonalInformation,
};
