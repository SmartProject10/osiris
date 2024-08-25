const PerformanceEvaluationHistory = require("../../model/userProfile/performanceEvaluationHistorySchema");
const UserProfiles = require("../../model/userProfile/userProfileSchema");
const { ObjectId } = require("mongodb");

const createPerformanceEvaluationHistory = async (req, res) => {
  const { iUserProfileId } = req.params;
  const data = req.body;
  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Validate the data
      if (!data || Object.keys(data).length === 0) {
        return res
          .status(400)
          .send("Performance evaluation history not provided");
      }
      // Assign the iUserProfileId to the new performance evaluation history object
      data.iUserProfileId = userProfile._id;

      // Create a new performance evaluation history entry
      const newPerformanceEvaluationHistory = new PerformanceEvaluationHistory(
        data
      );

      // Save the new performance evaluation history
      await newPerformanceEvaluationHistory.save();
      res.status(200).send(newPerformanceEvaluationHistory);
    } else {
      res.status(404).send("User profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const updatePerformanceEvaluationHistory = async (req, res) => {
  const { iUserProfileId, id } = req.params;
  const data = req.body;

  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find the existing performance evaluation history by userId and id
      const performanceEvaluationHistory = await PerformanceEvaluationHistory.findById(
        id
      );

      if (performanceEvaluationHistory) {
        // Update the performance evaluation history with the new information
        Object.assign(performanceEvaluationHistory, data);

        // Save the changes
        await performanceEvaluationHistory.save();
        res.status(200).send(performanceEvaluationHistory);
      } else {
        res.status(404).send("Performance evaluation history not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getAllPerformanceEvaluationHistory = async (req, res) => {
  const { iUserProfileId } = req.params;
  const { page = 1, limit = 10, sortBy = "vPeriod", order = "asc" } = req.query;

  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Calculate the number of documents to skip
      const skip = (page - 1) * limit;

      // Get the performance evaluation history with pagination and sorting
      const performanceEvaluationHistory = await PerformanceEvaluationHistory.find(
        {
          iUserProfileId: userProfile._id,
        }
      )
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(parseInt(limit));

      // Count the total number of documents
      const total = await PerformanceEvaluationHistory.countDocuments({
        iUserProfileId: userProfile._id,
      });

      res.status(200).send({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        data: performanceEvaluationHistory,
      });
    } else {
      res.status(404).send("User profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getPerformanceEvaluationHistoryById = async (req, res) => {
  const { iUserProfileId, id } = req.params;

  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find the existing performance evaluation history by userId and id
      const performanceEvaluationHistory = await PerformanceEvaluationHistory.findById(
        id
      );

      if (performanceEvaluationHistory) {
        res.status(200).send(performanceEvaluationHistory);
      } else {
        res.status(404).send("Performance evaluation history not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const deletePerformanceEvaluationHistory = async (req, res) => {
  const { iUserProfileId, id } = req.params;

  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find the existing performance evaluation history by userId and id
      const performanceEvaluationHistory = await PerformanceEvaluationHistory.findByIdAndDelete(
        id
      );

      if (performanceEvaluationHistory) {
        res
          .status(200)
          .send("Performance evaluation history successfully deleted");
      } else {
        res.status(404).send("Performance evaluation history not found");
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
  createPerformanceEvaluationHistory,
  updatePerformanceEvaluationHistory,
  getAllPerformanceEvaluationHistory,
  getPerformanceEvaluationHistoryById,
  deletePerformanceEvaluationHistory,
};
