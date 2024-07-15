const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

usersSchema.pre(
  'save',
  async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
);

usersSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

module.exports = mongoose.model('User', usersSchema);
