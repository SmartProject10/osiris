const InformativeDocument = require("../../model/userProfile/informativeDocumentSchema");
const UserProfiles = require("../../model/userProfile/userProfileSchema");

const createInformativeDocument = async (req, res) => {
  const { iUserProfileId } = req.params;
  const data = req.body;
  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Validate the data
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).send("Informative document not provided");
      }
      // Assign the iUserProfileId to the new informative document object
      data.iUserProfileId = userProfile._id;

      // Create a new informative document entry
      const newInformativeDocument = new InformativeDocument(data);

      // Save the new informative document
      await newInformativeDocument.save();
      res.status(200).send(newInformativeDocument);
    } else {
      res.status(404).send("User profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const updateInformativeDocument = async (req, res) => {
  const { iUserProfileId, id } = req.params;
  const data = req.body;

  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find the existing informative document by userId and id
      const informativeDocument = await InformativeDocument.findById(id);

      if (informativeDocument) {
        // Update the informative document with the new information
        Object.assign(informativeDocument, data);

        // Save the changes
        await informativeDocument.save();
        res.status(200).send(informativeDocument);
      } else {
        res.status(404).send("Informative document not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getAllInformativeDocuments = async (req, res) => {
  const { iUserProfileId } = req.params;
  const { page = 1, limit = 10, sortBy = "vName", order = "asc" } = req.query;

  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Calculate the number of documents to skip
      const skip = (page - 1) * limit;

      // Get the informative documents with pagination and sorting
      const informativeDocuments = await InformativeDocument.find({
        iUserProfileId: userProfile._id,
      })
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(parseInt(limit));

      // Count the total number of documents
      const total = await InformativeDocument.countDocuments({
        iUserProfileId: userProfile._id,
      });

      res.status(200).send({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        data: informativeDocuments,
      });
    } else {
      res.status(404).send("User profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getInformativeDocumentById = async (req, res) => {
  const { iUserProfileId, id } = req.params;

  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find the existing informative document by userId and id
      const informativeDocument = await InformativeDocument.findById(id);

      if (informativeDocument) {
        res.status(200).send(informativeDocument);
      } else {
        res.status(404).send("Informative document not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const deleteInformativeDocument = async (req, res) => {
  const { iUserProfileId, id } = req.params;

  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (userProfile) {
      // Find the existing informative document by userId and id
      const informativeDocument = await InformativeDocument.findByIdAndDelete(
        id
      );

      if (informativeDocument) {
        res.status(200).send("Informative document successfully deleted");
      } else {
        res.status(404).send("Informative document not found");
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
  createInformativeDocument,
  updateInformativeDocument,
  getAllInformativeDocuments,
  getInformativeDocumentById,
  deleteInformativeDocument,
};
