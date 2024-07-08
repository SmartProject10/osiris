const CompanyEconomicActivity = require('../model/companyEconomicActivity.model');

class CompanyEconomicActivityService {
  async registerActivity(companyId, economicActivityId, status) {
    const newActivity = new CompanyEconomicActivity({
      iIdEmpresa: companyId,
      iId_ActEconomica: economicActivityId,
      iId_Estado: status,
    });

    await newActivity.save();
  }
}

module.exports = new CompanyEconomicActivityService();
