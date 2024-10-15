const mongoose = require("mongoose");

const externalTrainingSchema = new mongoose.Schema({
  iUserProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
  vInstitution: {
    type: String,
    trim: true,
    required: [true, "Institution is required"],
  },
  vConcept: {
    type: String,
    trim: true,
    required: [true, "Concept is required"],
  },
  vCertificate: {
    type: String,
    trim: true,
    required: [true, "Certificate is required"],
  },
  dTrainingYear: {
    type: Date,
    validate: {
      validator: function (value) {
        const year = value.getFullYear();
        return year > 1900 && year <= new Date().getFullYear();
      },
      message: "Training year must be a valid number",
    },
  },
});

module.exports = mongoose.model("ExternalTraining", externalTrainingSchema);
