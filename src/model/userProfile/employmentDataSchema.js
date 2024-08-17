const mongoose = require("mongoose");

const employmentDataSchema = new mongoose.Schema({
  vWorkerCode: { type: String, unique: true, trim: true },
  vPosition: { type: String, trim: true },
  vArea: { type: String, trim: true },
  vManagement: { type: String, trim: true },
  vService: { type: String, trim: true },
  vCompany: { type: String, trim: true },
  vBusinessName: { type: String, trim: true },
  vWorkplace: { type: String, trim: true },
  dEntryDate: { type: Date },
});

module.exports = mongoose.model("EmploymentData", employmentDataSchema);
