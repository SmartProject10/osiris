const mongoose = require("mongoose");

const academicDataSchema = new mongoose.Schema({
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
  vTitle: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
  },
  vLevel: {
    type: String,
    trim: true,
    required: [true, "Level is required"],
    enum: [
      "Primary",
      "Secondary",
      "High_School",
      "University",
      "Postgraduate",
      "Doctorate",
      "Master",
    ],
    default: "Primary",
  },
  vStatus: {
    type: String,
    enum: ["Graduated", "In_Progress", "Abandoned", "Suspended"],
    default: "Graduated",
  },
  dGraduationYear: {
    type: Date,
    validate: {
      validator: function (value) {
        const year = value.getFullYear();
        return year > 1900 && year <= new Date().getFullYear();
      },
      message: "Graduation year must be a valid date",
    },
  }
});

module.exports = mongoose.model("AcademicData", academicDataSchema);
