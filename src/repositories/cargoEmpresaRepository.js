const CargoEmpresa = require('./CargoEmpresa');

class CargoEmpresaRepository {
  constructor() {
    this.model = CargoEmpresa;
  }

  async getAll() {
    return await this.model.find();
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async create(cargoEmpresa) {
    const newCargoEmpresa = new this.model(cargoEmpresa);
    return await newCargoEmpresa.save();
  }

  async update(id, cargoEmpresa) {
    return await this.model.findByIdAndUpdate(id, cargoEmpresa, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = new CargoEmpresaRepository();
