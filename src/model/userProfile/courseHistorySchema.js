const mongoose = require("mongoose");

const courseHistorySchema = new mongoose.Schema({
  iUserProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
  vCourse: {
    type: String,
    trim: true,
  },
  vProgram: {
    type: String,
    trim: true,
  },
  vDuration: {
    type: String,
    trim: true,
  },
  vStatus: {
    type: String,
    trim: true,
  },
  vAttendance: {
    type: String,
    trim: true,
  },
  vRecord: {
    type: String,
    trim: true,
  },
  vCertificate: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("CourseHistory", courseHistorySchema);
