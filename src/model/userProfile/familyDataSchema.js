const mongoose = require("mongoose");

const familyDataSchema = new mongoose.Schema({
  iUserProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
  vFullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  vRelationship: {
    type: String,
    required: [true, "Relationship is required"],
    trim: true,
  },
  dBirthDate: {
    type: Date,
    required: [true, "Birth date is required"],
    validate: {
      validator: function (value) {
        return value instanceof Date && !isNaN(value);
      },
      message: "Birth date must be a valid date",
    },
  },
  vGender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    default: "Other",
  },
});

module.exports = mongoose.model("FamilyData", familyDataSchema);
