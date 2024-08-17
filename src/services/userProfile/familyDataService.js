const FamilyData = require("../../model/userProfile/familyDataSchema");
const UserProfiles = require("../../model/userProfile/userProfileSchema");

const createFamilyData = async (req, res) => {
  const { iUserProfileId } = req.params;
  const data = req.body;
  try {
    // Search for user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Validate data
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).send("Family data not provided");
      }
      // Assign the iUserProfileId to the new family data object
      data.iUserProfileId = userProfile._id;

      // Create a new family data entry
      const newFamilyData = new FamilyData(data);

      // Save the new family data
      await newFamilyData.save();
      res.status(200).send(newFamilyData);
    } else {
      res.status(404).send("User profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


const updateFamilyData = async (req, res) => {
  const { iUserProfileId, id } = req.params;
  const data = req.body;

  try {
    // Search for user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Search for existing family data by userId and id
      const familyData = await FamilyData.findById(id);

      if (familyData) {
        // Update family data with new information
        Object.assign(familyData, data);

        // Save changes
        await familyData.save();
        res.status(200).send(familyData);
      } else {
        res.status(404).send("Family data not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getAllFamilyData = async (req, res) => {
  const { iUserProfileId } = req.params;
  const {
    page = 1,
    limit = 10,
    sortBy = "vFullName",
    order = "asc",
  } = req.query;

  try {
    // Search for user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Calculate the number of documents to skip
      const skip = (page - 1) * limit;

      // Get family data with pagination and sorting
      const familyData = await FamilyData.find({
        iUserProfileId: userProfile._id,
      })
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(parseInt(limit));

      // Count the total number of documents
      const total = await FamilyData.countDocuments({
        iUserProfileId: userProfile._id,
      });

      res.status(200).send({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        data: familyData,
      });
    } else {
      res.status(404).send("User profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


const getFamilyDataById = async (req, res) => {
  const { iUserProfileId, id } = req.params;

  try {
    // Search for user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Search for existing family data by userId and id
      const familyData = await FamilyData.findById(id);

      if (familyData) {
        res.status(200).send(familyData);
      } else {
        res.status(404).send("Family data not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


const deleteFamilyData = async (req, res) => {
  const { iUserProfileId, id } = req.params;

  try {
    // Search for user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Search for existing family data by userId and id
      const familyData = await FamilyData.findByIdAndDelete(id);

      if (familyData) {
        res.status(200).send("Family data successfully deleted");
      } else {
        res.status(404).send("Family data not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};



module.exports = {
  createFamilyData,
  updateFamilyData,
  getAllFamilyData,
  getFamilyDataById,
  deleteFamilyData,
};
