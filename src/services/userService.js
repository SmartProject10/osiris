const userRepository = require('../repositories/userRepository');

class usersService {

  async getAll() {
    const users = await userRepository.find();
    return users; 
  }
  
  async getById(id) {
    const user = await userRepository.findById(id); 
    if (!user) { 
      return null;  
    }
    return user;  
  }
}
// exports.getUserById = async (id) => {
//   const user = await userRepository.findById(id);
//   if (!user) {
//     throw new Error('User not found');
//   }
//   return user;
// };

module.exports = new usersService();