const mongoose = require("mongoose");

const contactInformationSchema = new mongoose.Schema({
  iUserProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
  vUpdatedAddress: {
    type: String,
    trim: true,
  },
  vOccupationWorkplace: {
    type: String,
    trim: true,
  },
  iContactPerson:   {
    type: mongoose.Schema.Types.ObjectId,
    ref: "persona",
    required: true,
  },
});

module.exports = mongoose.model("ContactInformation", contactInformationSchema);
