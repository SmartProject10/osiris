const pool = require('../config/db');

exports.findById = async (id) => {
    try {
      const result = await pool.query('SELECT * FROM companyEconomicActivity WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return null; // Indicate that the record was not found
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error finding company economic activity by ID:', error);
      throw error; // Re-throw the error for proper handling at the controller level
    }
  };
  

  exports.create = async (companyEconomicActivityData) => {
    const { iIdEmpresa, iId_ActEconomica, iId_Estado } = companyEconomicActivityData; // Extract data from the provided object
  
    try {
      const insertQuery = `INSERT INTO companyEconomicActivity (iIdEmpresa, iId_ActEconomica, iId_Estado) VALUES ($1, $2, $3) RETURNING *`;
      const result = await pool.query(insertQuery, [iIdEmpresa, iId_ActEconomica, iId_Estado]);
      return result.rows[0]; // Return the newly created companyEconomicActivity record
    } catch (error) {
      console.error('Error creating companyEconomicActivity:', error);
      throw error; // Re-throw the error for proper handling at the controller level
    }
  };

  exports.findAll = async () => {
    try {
      const result = await pool.query('SELECT * FROM companyEconomicActivity');
      return result.rows;
    } catch (error) {
      console.error('Error fetching all companyEconomicActivity:', error);
      throw error; // Re-throw the error for proper handling at the controller level
    }
  };

  exports.update = async (id, companyEconomicActivityData) => {
    const { iIdEmpresa, iId_ActEconomica, iId_Estado } = companyEconomicActivityData; // Extract data from the provided object
  
    try {
      const updateQuery = `UPDATE companyEconomicActivity SET iIdEmpresa = $1, iId_ActEconomica = $2, iId_Estado = $3 WHERE id = $4 RETURNING *`;
      const result = await pool.query(updateQuery, [iIdEmpresa, iId_ActEconomica, iId_Estado, id]);
      if (result.rows.length === 0) {
        return null; // Indicate that the record was not found
      }
      return result.rows[0]; // Return the updated companyEconomicActivity record
    } catch (error) {
      console.error('Error updating companyEconomicActivity:', error);
      throw error; // Re-throw the error for proper handling at the controller level
    }
  };

  exports.delete = async (id) => {
    try {
      const result = await pool.query('DELETE FROM companyEconomicActivity WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return null; // Indicate that the record was not found
      }
      return result.rows[0]; // Return the deleted companyEconomicActivity record (optional)
    } catch (error) {
      console.error('Error deleting companyEconomicActivity:', error);
      throw error; // Re-throw the error for proper handling at the controller level
    }
  };
  

  