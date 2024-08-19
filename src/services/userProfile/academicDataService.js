const AcademicData = require("../../model/userProfile/academicDataSchema");
const UserProfiles = require("../../model/userProfile/userProfileSchema");

const createAcademicData = async (req, res) => {
  const { iUserProfileId } = req.params;
  const data = req.body;
  try {
    // Find user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Validate data
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).send("Academic data not provided");
      }
      // Assign the iUserProfileId to the new academic data object
      data.iUserProfileId = userProfile._id;

      // Create a new academic data entry
      const newAcademicData = new AcademicData(data);

      // Save the new academic data
      await newAcademicData.save();
      res.status(200).send(newAcademicData);
    } else {
      res.status(404).send("User profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const updateAcademicData = async (req, res) => {
  const { iUserProfileId, id } = req.params;
  const data = req.body;

  try {
    // Find user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find existing academic data by userId and id
      const academicData = await AcademicData.findById(id);

      if (academicData) {
        // Update the academic data with the new data
        Object.assign(academicData, data);

        // Save the changes
        await academicData.save();
        res.status(200).send(academicData);
      } else {
        res.status(404).send("Academic data not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getAllAcademicData = async (req, res) => {
  const { iUserProfileId } = req.params;
  const {
    page = 1,
    limit = 10,
    sortBy = "vInstitution",
    order = "asc",
  } = req.query;

  try {
    // Find user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Calculate the number of documents to skip
      const skip = (page - 1) * limit;

      // Get academic data with pagination and sorting
      const academicData = await AcademicData.find({
        iUserProfileId: userProfile._id,
      })
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(parseInt(limit));

      // Count the total number of documents
      const total = await AcademicData.countDocuments({
        iUserProfileId: userProfile._id,
      });

      res.status(200).send({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        data: academicData,
      });
    } else {
      res.status(404).send("User profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getAcademicDataById = async (req, res) => {
  const { iUserProfileId, id } = req.params;

  try {
    // Find user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find existing academic data by userId and id
      const academicData = await AcademicData.findById(id);

      if (academicData) {
        res.status(200).send(academicData);
      } else {
        res.status(404).send("Academic data not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const deleteAcademicData = async (req, res) => {
  const { iUserProfileId, id } = req.params;

  try {
    // Find user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find existing academic data by userId and id
      const academicData = await AcademicData.findByIdAndDelete(id);

      if (academicData) {
        res.status(200).send("Academic data successfully deleted");
      } else {
        res.status(404).send("Academic data not found");
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
  createAcademicData,
  updateAcademicData,
  getAllAcademicData,
  getAcademicDataById,
  deleteAcademicData,
};
