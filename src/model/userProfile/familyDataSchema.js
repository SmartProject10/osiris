const mongoose = require("mongoose");

const RelationshipEnum = {
  FATHER: "Father",
  MOTHER: "Mother",
  BROTHER: "Brother",
  SISTER: "Sister",
  SON: "Son",
  DAUGHTER: "Daughter",
  UNCLE: "Uncle",
  AUNT: "Aunt",
  COUSIN: "Cousin",
  GRANDFATHER: "Grandfather",
  GRANDMOTHER: "Grandmother",
  NEPHEW: "Nephew",
  NIECE: "Niece",
  DEFAULT: "Relative", // Default value
};

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
    enum: Object.values(RelationshipEnum),
    default: RelationshipEnum.DEFAULT,
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
