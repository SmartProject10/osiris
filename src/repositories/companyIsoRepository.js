const pool = require('../config/db');

exports.create = async (companyIsoData) => {
    const { name, description, companyId } = companyIsoData;
  
    try {
      const insertQuery = `INSERT INTO companyIso (name, description, company_id) VALUES ($1, $2, $3) RETURNING *`;
      const result = await pool.query(insertQuery, [name, description, companyId]);
      return result.rows[0]; // Return the newly created company ISO record
    } catch (error) {
      console.error('Error creating company ISO:', error);
      throw error; // Re-throw the error for proper handling at the controller level
    }
  };
  exports.findAll = async () => {
    try {
      const result = await pool.query('SELECT * FROM companyIso');
      return result.rows;
    } catch (error) {
      console.error('Error fetching all company ISOs:', error);
      throw error;
    }
  };

  exports.findById = async (id) => {
    try {
      const result = await pool.query('SELECT * FROM companyIso WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return null; // Indicate that the record was not found
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error finding company ISO by ID:', error);
      throw error;
    }
  };
  
  exports.update = async (id, companyIsoData) => {
    const { name, description } = companyIsoData;
  
    try {
      const updateQuery = `UPDATE companyIso SET name = $1, description = $2 WHERE id = $3 RETURNING *`;
      const result = await pool.query(updateQuery, [name, description, id]);
      if (result.rows.length === 0) {
        return null; // Indicate that the record was not found
      }
      return result.rows[0]; // Return the updated company ISO record
    } catch (error) {
      console.error('Error updating company ISO:', error);
      throw error;
    }
  };

  exports.delete = async (id) => {
    try {
      const result = await pool.query('DELETE FROM companyIso WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return null; // Indicate that the record was not found
      }
      return result.rows[0]; // Return the deleted company ISO record (optional)
    } catch (error) {
      console.error('Error deleting company ISO:', error);
      throw error;
    }
  };
  
  
  
  