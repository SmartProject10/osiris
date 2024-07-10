const pool = require('../config/db'); 

exports.create = async (req, res) => {
  try {
    const { name, email, contact, address, ...otherData } = req.body; 

    const newCompany = await pool.query('INSERT INTO company (name, email, contact, address, ...) VALUES ($1, $2, $3, $4, ...)',
      [name, email, contact, address, ...Object.values(otherData)]); 

    res.json({ message: 'Company created successfully', company_id: newCompany.rows[0]._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating company' }); 
  }
};

// Find all companies
exports.findAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM company');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching companies' }); 
  }
};

// Find a company by ID
exports.findById = async (req, res) => {
  const id = req.params.id; // Get ID from URL parameter

  try {
    const result = await pool.query('SELECT * FROM company WHERE _id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' }); // Handle non-existent company
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error finding company' }); // Handle errors gracefully
  }
};

// Update a company by ID (assuming update data comes from the request body)
exports.update = async (req, res) => {
  const id = req.params.id;
  const { name, email, contact, address, ...otherData } = req.body; // Extract data from request body

  try {
    const updateData = { name, email, contact, address, ...otherData }; // Create update object
    const updateString = Object.keys(updateData).map((key, index) => `${key} = $${index + 2}`).join(', '); // Dynamically generate update string
    const query = `UPDATE company SET ${updateString} WHERE _id = $1`; // Construct update query

    const result = await pool.query(query, [id, ...Object.values(updateData)]); // Use spread operator for update values

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Company not found' }); // Handle non-existent company
    }
    res.json({ message: 'Company updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating company' }); // Handle errors gracefully
  }
};

// Delete a company by ID
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query('DELETE FROM company WHERE _id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Company not found' }); // Handle non-existent company
    }
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting company' }); // Handle errors gracefully
  }
};
