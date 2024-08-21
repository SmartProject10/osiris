const mongoose = require("mongoose");

const legajoSchema = new mongoose.Schema({
  vResume: {
    type: String,
    trim: true,
    required: false,
  },
  vSkillCertificate: {
    type: String,
    trim: true,
    required: false,
  },
  vIdentityDocument: {
    type: String,
    trim: true,
    required: false,
  },
});

legajoSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
})

legajoSchema.methods.saveProperty = function (property, value) {
  this[property] = value;
  return this.save();
};

legajoSchema.methods.deleteProperty = function (property) {
  this[property] = undefined;
  return this.save();
};

module.exports = mongoose.model("Legajo", legajoSchema);
