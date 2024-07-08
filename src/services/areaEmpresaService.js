const AreaEmpresaRepository = require('../repositories/areaEmpresaRepository');

class AreaEmpresaService {
  constructor() {
    this.repository = new AreaEmpresaRepository();
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id) {
    return await this.repository.getById(id);
  }

  async create(areaEmpresa) {
    return await this.repository.create(areaEmpresa);
  }

  async update(id, areaEmpresa) {
    return await this.repository.update(id, areaEmpresa);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}

module.exports = new AreaEmpresaService();
