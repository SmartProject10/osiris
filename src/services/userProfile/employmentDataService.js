const UserProfiles = require("../../model/userProfile/userProfileSchema");
const LaborData = require("../../model/userProfile/employmentDataSchema");
const { connectToMongoClient } = require("../../config/db");
const { ObjectId } = require("mongodb");

const createEmploymentData = async (req, res) => {
  const { iUserProfileId } = req.params;
  const { companyIds, ...data } = req.body;

  try {
    const userProfile = await UserProfiles.findById(iUserProfileId);
    if (!userProfile) {
      return res
        .status(404)
        .json({ message: "User profile not found" });
    }

    // Connection established
    const coll = await connectToMongoClient("company");

    // Convert IDs to ObjectId using createFromTime
    const companyObjectIds = companyIds.map((id) => new ObjectId(`${id}`));

    // Find companies by id
    const companies = await coll.find({ _id: { $in: companyObjectIds } }).toArray();

    if (companies.length === 0) {
      return res.status(404).json({ message: "Companies not found" });
    }

    const employmentData = new LaborData(data);
    await employmentData.save();

    const companyArray = companyObjectIds.map((id) => ({ _id: id }));

    // Update user profile with new companies and employment data
    const updatedUserProfile = await UserProfiles.findByIdAndUpdate(
      iUserProfileId,
      { iCompany: companyArray, iEmploymentData: employmentData._id },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      profile: updatedUserProfile,
      employmentData: employmentData,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


const updateEmploymentData = async (req, res) => {
  const { iUserProfileId, id } = req.params;
  const { companyIds, ...data } = req.body;

  try {
    const userProfile = await UserProfiles.findById(iUserProfileId);
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Connection established
    const coll = await connectToMongoClient("company");
    
    // Convert IDs to ObjectId
    const companyObjectIds = companyIds.map((id) => new ObjectId(`${id}`));

    // Find companies by id
    const companies = await coll.find({ _id: { $in: companyObjectIds } }).toArray();

    if (companies.length === 0) {
      return res.status(404).json({ message: "Companies not found" });
    }

    // Update existing employment data
    const updatedEmploymentData = await LaborData.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!updatedEmploymentData) {
      return res.status(404).json({ message: "Employment data not found" });
    }

    const companyArray = companyIds.map((id) => ({ _id: id }));

    // Update user profile with new companies and employment data
    const updatedUserProfile = await UserProfiles.findByIdAndUpdate(
      iUserProfileId,
      { iCompany: companyArray, iEmploymentData: updatedEmploymentData._id },
      { new: true, runValidators: true }
    );

    if (!updatedUserProfile) {
      return res.status(404).json({ message: "Failed to update user profile" });
    }

    res.status(200).json({
      profile: updatedUserProfile,
      employmentData: updatedEmploymentData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = {
  createEmploymentData,
  updateEmploymentData,
};
