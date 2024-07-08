const Company = require('../model/companySchema');

const companyRepository = require('../repositories/companyRepository');

class CompanyService {
  async registerCompany(companyData) {
    const newCompany = new Company(companyData);
    await newCompany.save();
  }

  async getAll() {
    const companies = await companyRepository.getAll();
    return companies; 
  }
  
  async getById(id) {
    const company = await companyRepository.findById(id); 
    if (!company) { 
      return null;  
    }
    return company;  
  }
  async updateCompany(id, updatedCompanyData) {
    try {
      const company = await Company.findById(id);
      if (!company) {
        return null; 
      }
        company.set(updatedCompanyData); 
     await company.save();
      return company;
    } catch (error) {
      console.error('Error updating company:', error);
      throw error; 
    }
  }

  async deleteCompany(id) {
    try {
      const company = await Company.findByIdAndDelete(id);
      if (!company) {
        return null; 
      }
      return company; 
    } catch (error) {
      console.error('Error deleting company:', error);
      throw error; 
    }
  }

}

module.exports = new CompanyService();

