const mongoose = require("mongoose");

const performanceEvaluationHistorySchema = new mongoose.Schema({
  iUserProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
  vPeriod: {
    type: String,
    trim: true,
  },
  vProcess: {
    type: String,
    trim: true,
  },
  vFinalResult: {
    type: String,
    trim: true,
  },
  vReport: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("PerformanceEvaluationHistory", performanceEvaluationHistorySchema);
