const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    // References to other models
    iUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "person",
        required: false,
      },
    ],
    iCompany: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        required: false,
      },
    ],
    iPersonalInformation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonalInformation",
      required: false,
    },
    iEmploymentData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmploymentData",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userProfileSchema.index({ "iPersonalInformation.vPersonalEmail": 1 });
userProfileSchema.index({ "iEmploymentData.vWorkerCode": 1 });

module.exports = mongoose.model("UserProfile", userProfileSchema);
