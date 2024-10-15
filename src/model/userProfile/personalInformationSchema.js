const mongoose = require("mongoose");

const personalInformationSchema = new mongoose.Schema({
  vImage: { type: String, trim: true },
  vFirstName: { type: String, trim: true, required: true },
  vLastName: { type: String, trim: true, required: true },
  dBirthDate: { type: Date, required: true },
  vGender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    default: "Other",
  },
  vPersonalEmail: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email"],
  },
  vHomeAddress: { type: String, trim: true },
  vStateCity: { type: String, trim: true },
  vPersonalCellphone: { type: String, trim: true },
  vHomePhone: { type: String, trim: true },
  vWorkCellphone: { type: String, trim: true },
});

module.exports = mongoose.model("PersonalInformation", personalInformationSchema);
