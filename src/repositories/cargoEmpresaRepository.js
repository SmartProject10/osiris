const pool = require('../config/db');

exports.findById = async (id) => {
    try {
      const result = await pool.query('SELECT id FROM cargo WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return null; // Indicate that the record was not found
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error finding company economic activity by ID:', error);
      throw error; // Re-throw the error for proper handling at the controller level
    }
  };

  exports.create = async (companyIso) => {
    // Destructure properties from companyIso object (assuming it has required fields)
    const { name, description, /* other fields */ } = companyIso;
  
    const query = 'INSERT INTO cargo (name, description, /* other columns */) VALUES ($1, $2, /* other placeholders */)';
    const values = [name, description, /* other values */];
  
    try {
      const result = await pool.query(query, values);
      return result.rowCount > 0 ? true : false; // Check if insertion was successful
    } catch (error) {
      throw error; // Re-throw the error for handling in the calling function
    }
  };

  