const CargoEmpresaService = require('./CargoEmpresaService');

class cargoEmpresaController {
  constructor() {
    this.service = new CargoEmpresaService();
  }

  async getAll(req, res) {
    try {
      const cargoEmpresas = await this.service.getAll();
      res.status(200).json(cargoEmpresas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    const id = req.params.id;
    try {
      const cargoEmpresa = await this.service.getById(id);
      if (!cargoEmpresa) {
        return res.status(404).json({ message: `CargoEmpresa with ID ${id} not found.` });
      }
      res.status(200).json(cargoEmpresa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    const cargoEmpresa = req.body;
  
    try {
      // Basic validation for required fields
      if (!cargoEmpresa.vCodigo || !cargoEmpresa.vNombre) {
        return res.status(400).json({ message: 'Missing required fields: vCodigo and vNombre are mandatory.' });
      }
  
      // Call the service to create the CargoEmpresa
      const newCargoEmpresa = await this.service.create(cargoEmpresa);
      res.status(201).json(newCargoEmpresa); // Return the created object with status code 201 (Created)
    } catch (error) {
      console.error(error);
      // Handle specific errors (e.g., Mongo duplicate key error) or return a generic error message
      if (error.code === 11000) { // Handle Mongo duplicate key error
        res.status(409).json({ message: 'Duplicate cargo code detected.' });
      } else {
        res.status(500).json({ message: 'Error creating cargo company.' });
      }
    }
  }
}  

