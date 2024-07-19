const userService = require('../services/empresaService');
const userRepository = require('../repositories/companyRepository');
const empresaService = require('../services/empresaService');

jest.mock('../repositories/companyRepository');

test('should get company by id_empresa', async () => {
  const company = { id: "667f5444966e2a20a1d78660", name: 'JesStore' };
  userRepository.findById.mockResolvedValue(user);
  
  const result = await empresaService.findById(1);
  
  expect(result).toEqual(company);
  expect(companyRepository.findById).toHaveBeenCalledWith(1);
});
