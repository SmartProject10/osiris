const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  vName: {
    type: String,
    required: true,
    unique: true,
  },
});


roleSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
})

module.exports = mongoose.model("Role", roleSchema);
