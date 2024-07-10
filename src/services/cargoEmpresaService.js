const CargoEmpresaRepository = require('../repositories/cargoEmpresaRepository');

class cargoEmpresaService {
  constructor() {
    this.repository = new CargoEmpresaRepository();
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id) {
    return await this.repository.getById(id);
  }

  async create(cargoEmpresa) {
    return await this.repository.create(cargoEmpresa);
  }

  async update(id, cargoEmpresa) {
    return await this.repository.update(id, cargoEmpresa);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}

module.exports = new cargoEmpresaService();
