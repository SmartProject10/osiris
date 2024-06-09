const userService = require('../services/userService');
const userRepository = require('../repositories/userRepository');

jest.mock('../repositories/userRepository');

test('should get user by id', async () => {
  const user = { id: 1, name: 'John Doe' };
  userRepository.findById.mockResolvedValue(user);
  
  const result = await userService.getUserById(1);
  
  expect(result).toEqual(user);
  expect(userRepository.findById).toHaveBeenCalledWith(1);
});
