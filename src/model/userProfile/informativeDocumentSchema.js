const mongoose = require("mongoose");

const informativeDocumentSchema = new mongoose.Schema({
  iUserProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
  dDate: {
    type: Date,
    required: [true, "Date is required"],
    validate: {
      validator: function (value) {
        return value instanceof Date && !isNaN(value);
      },
      message: "Date must be a valid date",
    },
  },
  vStatus: {
    type: String,
    trim: true,
  },
  vName: {
    type: String,
    trim: true,
  },
  vDescription: {
    type: String,
    trim: true,
  },
  vFile: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("InformativeDocument", informativeDocumentSchema);
