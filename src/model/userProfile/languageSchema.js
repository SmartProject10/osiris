const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
  iUserProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
  vLanguage: {
    type: String,
    trim: true,
    required: [true, "Language is required"],
  },
  vLevel: {
    type: String,
    enum: ["Basic", "Intermediate", "Advanced", "Native"],
    default: "Basic",
    required: [true, "Level is required"],
  },
  vSpecifications: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Language", languageSchema);
