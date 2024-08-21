const Language = require("../../model/userProfile/languageSchema");
const UserProfiles = require("../../model/userProfile/userProfileSchema");

const createLanguage = async (req, res) => {
  const { iUserProfileId } = req.params;
  const data = req.body;
  try {
    // Find user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Validate data
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).send("Language data not provided");
      }
      // Assign the iUserProfileId to the new language data object
      data.iUserProfileId = userProfile._id;

      // Create a new language data entry
      const newLanguageData = new Language(data);

      // Save the new language data
      await newLanguageData.save();
      res.status(200).send(newLanguageData);
    } else {
      res.status(404).send("User profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


const updateLanguage = async (req, res) => {
    const { iUserProfileId, id } = req.params;
    const data = req.body;
  
    try {
      // Find user profile by ID
      const userProfile = await UserProfiles.findById(iUserProfileId);
  
      if (userProfile) {
        // Find existing language data by userId and id
        const languageData = await Language.findById(id);
  
        if (languageData) {
          // Update the language data with the new data
          Object.assign(languageData, data);
  
          // Save the changes
          await languageData.save();
          res.status(200).send(languageData);
        } else {
          res.status(404).send("Language data not found");
        }
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  };
  

const getAllLanguage = async (req, res) => {
  const { iUserProfileId } = req.params;
  const {
    page = 1,
    limit = 10,
    sortBy = "vLanguage",
    order = "asc",
  } = req.query;

  try {
    // Find user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Calculate the number of documents to skip
      const skip = (page - 1) * limit;

      // Get language data with pagination and sorting
      const languageData = await Language.find({
        iUserProfileId: userProfile._id,
      })
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(parseInt(limit));

      // Count the total number of documents
      const total = await Language.countDocuments({
        iUserProfileId: userProfile._id,
      });

      res.status(200).send({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        data: languageData,
      });
    } else {
      res.status(404).send("User profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


const getLanguageById = async (req, res) => {
    const { iUserProfileId, id } = req.params;
  
    try {
      // Find user profile by ID
      const userProfile = await UserProfiles.findById(iUserProfileId);
  
      if (userProfile) {
        // Find existing language data by userId and id
        const languageData = await Language.findById(id);
  
        if (languageData) {
          res.status(200).send(languageData);
        } else {
          res.status(404).send("Language data not found");
        }
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  };
  

  const deleteLanguage = async (req, res) => {
    const { iUserProfileId, id } = req.params;
  
    try {
      // Find user profile by ID
      const userProfile = await UserProfiles.findById(iUserProfileId);
  
      if (userProfile) {
        // Find existing language data by userId and id
        const languageData = await Language.findByIdAndDelete(id);
  
        if (languageData) {
          res.status(200).send("Language data successfully deleted");
        } else {
          res.status(404).send("Language data not found");
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
    createLanguage,
    updateLanguage,
    getAllLanguage,
    getLanguageById,
    deleteLanguage,
  };
  