const AreaEmpresaService = require('./AreaEmpresaService');

class AreaEmpresaController {
  constructor() {
    this.service = new AreaEmpresaService();
  }

  async getAll(req, res) {
    try {
      const areaEmpresas = await this.service.getAll();
      res.status(200).json(areaEmpresas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    const id = req.params.id;
    try {
      const areaEmpresa = await this.service.getById(id);
      if (!areaEmpresa) {
        return res.status(404).json({ message: `AreaEmpresa with ID ${id} not found.` });
      }
      res.status(200).json(areaEmpresa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  async createAreaEmpresa(req, res) {
    const areaEmpresaData = req.body;
  
    // Validate required fields using express-validator (adjust validation rules as needed)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }
  
    try {
      // Connect to your MongoDB database (replace with your connection logic)
      const client = await MongoClient.connect('mongodb://localhost:27017/yourDatabaseName');
      const db = client.db();
      const areaEmpresaCollection = db.collection('areaEmpresa');
  
      // Insert the data into the collection
      const result = await areaEmpresaCollection.insertOne(areaEmpresaData);
  
      // Close the database connection
      await client.close();
  
      return res.status(201).json({ message: 'AreaEmpresa created successfully!', id: result.insertedId });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating AreaEmpresa' });
    }
  
}

}