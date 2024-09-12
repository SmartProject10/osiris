const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles',
    required: true
  },
  trabajador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trabajador',
    required: true
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

userSchema.methods.isEmailValid = async function(email) {
  const user = this;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  return isValidEmail;
};


module.exports = mongoose.model('users', userSchema);
