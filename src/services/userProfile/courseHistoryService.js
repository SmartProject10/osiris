const CourseHistory = require("../../model/userProfile/courseHistorySchema");
const UserProfiles = require("../../model/userProfile/userProfileSchema");

const createCourseHistory = async (req, res) => {
  const { iUserProfileId } = req.params;
  const data = req.body;
  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Validate the data
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).send("Course history not provided");
      }
      // Assign the iUserProfileId to the new course history object
      data.iUserProfileId = userProfile._id;

      // Create a new course history entry
      const newCourseHistory = new CourseHistory(data);

      // Save the new course history
      await newCourseHistory.save();
      res.status(200).send(newCourseHistory);
    } else {
      res.status(404).send("User profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const updateCourseHistory = async (req, res) => {
  const { iUserProfileId, id } = req.params;
  const data = req.body;

  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find the existing course history by userId and id
      const courseHistory = await CourseHistory.findById(id);

      if (courseHistory) {
        // Update the course history with the new information
        Object.assign(courseHistory, data);

        // Save the changes
        await courseHistory.save();
        res.status(200).send(courseHistory);
      } else {
        res.status(404).send("Course history not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getAllCourseHistory = async (req, res) => {
  const { iUserProfileId } = req.params;
  const { page = 1, limit = 10, sortBy = "vCourse", order = "asc" } = req.query;

  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Calculate the number of documents to skip
      const skip = (page - 1) * limit;

      // Get the course history with pagination and sorting
      const courseHistory = await CourseHistory.find({
        iUserProfileId: userProfile._id,
      })
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(parseInt(limit));

      // Count the total number of documents
      const total = await CourseHistory.countDocuments({
        iUserProfileId: userProfile._id,
      });

      res.status(200).send({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        data: courseHistory,
      });
    } else {
      res.status(404).send("User profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getCourseHistoryById = async (req, res) => {
  const { iUserProfileId, id } = req.params;

  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find the existing course history by userId and id
      const courseHistory = await CourseHistory.findById(id);

      if (courseHistory) {
        res.status(200).send(courseHistory);
      } else {
        res.status(404).send("Course history not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const deleteCourseHistory = async (req, res) => {
  const { iUserProfileId, id } = req.params;

  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find the existing course history by userId and id
      const courseHistory = await CourseHistory.findByIdAndDelete(id);

      if (courseHistory) {
        res.status(200).send("Course history successfully deleted");
      } else {
        res.status(404).send("Course history not found");
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
  createCourseHistory,
  updateCourseHistory,
  getAllCourseHistory,
  getCourseHistoryById,
  deleteCourseHistory,
};
