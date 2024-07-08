const AreaEmpresa = require('./AreaEmpresa');

class AreaEmpresaRepository {
  constructor() {
    this.model = AreaEmpresa;
  }

  async getAll() {
    return await this.model.find();
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async create(areaEmpresa) {
    const newAreaEmpresa = new this.model(areaEmpresa);
    return await newAreaEmpresa.save();
  }

  async update(id, areaEmpresa) {
    return await this.model.findByIdAndUpdate(id, areaEmpresa, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = new AreaEmpresaRepository();
