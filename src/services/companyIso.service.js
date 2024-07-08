const Company = require('../model/companySchema');

class CompanyIsoService {
 
  constructor() {
    this.repository = new Company();
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id) {
    return await this.repository.getById(id);
  }

  async create(company) {
    return await this.repository.create(company);
  }

  async update(id, company) {
    return await this.repository.update(id, company);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
  
}

module.exports = new CompanyIsoService();
