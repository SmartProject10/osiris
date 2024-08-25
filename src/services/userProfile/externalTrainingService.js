const ExternalTraining = require("../../model/userProfile/externalTrainingSchema");
const UserProfiles = require("../../model/userProfile/userProfileSchema");

const createExternalTraining = async (req, res) => {
  const { iUserProfileId } = req.params;
  const data = req.body;
  try {
    // Find user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Validate data
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).send("External training data not provided");
      }
      // Assign the iUserProfileId to the new external training data object
      data.iUserProfileId = userProfile._id;

      // Create a new external training data entry
      const newExternalTraining = new ExternalTraining(data);

      // Save the new external training data
      await newExternalTraining.save();
      res.status(200).send(newExternalTraining);
    } else {
      res.status(404).send("User profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const updateExternalTraining = async (req, res) => {
  const { iUserProfileId, id } = req.params;
  const data = req.body;

  try {
    // Find user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find existing external training data by userId and id
      const externalTraining = await ExternalTraining.findById(id);

      if (externalTraining) {
        // Update the external training data with the new data
        Object.assign(externalTraining, data);

        // Save the changes
        await externalTraining.save();
        res.status(200).send(externalTraining);
      } else {
        res.status(404).send("External training data not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getAllExternalTraining = async (req, res) => {
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

      // Get external training data with pagination and sorting
      const externalTraining = await ExternalTraining.find({
        iUserProfileId: userProfile._id,
      })
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(parseInt(limit));

      // Count the total number of documents
      const total = await ExternalTraining.countDocuments({
        iUserProfileId: userProfile._id,
      });

      res.status(200).send({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        data: externalTraining,
      });
    } else {
      res.status(404).send("User profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getExternalTrainingById = async (req, res) => {
  const { iUserProfileId, id } = req.params;

  try {
    // Find user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find existing external training data by userId and id
      const externalTraining = await ExternalTraining.findById(id);

      if (externalTraining) {
        res.status(200).send(externalTraining);
      } else {
        res.status(404).send("External training data not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const deleteExternalTraining = async (req, res) => {
  const { iUserProfileId, id } = req.params;

  try {
    // Find user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find existing external training data by userId and id
      const externalTraining = await ExternalTraining.findByIdAndDelete(id);

      if (externalTraining) {
        res.status(200).send("External training data successfully deleted");
      } else {
        res.status(404).send("External training data not found");
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
  createExternalTraining,
  updateExternalTraining,
  getAllExternalTraining,
  getExternalTrainingById,
  deleteExternalTraining,
};
