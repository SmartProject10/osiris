const User = require('../models/user');

exports.findById = (id) => {
  return User.findById(id);
};
