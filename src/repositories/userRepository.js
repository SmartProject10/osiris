const pool = require('../config/db');

exports.create = async (req, res) => {
    try {
      const { name, email, password } = req.body; // Extract data from request body
  
      const newUser = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
      res.json({ message: 'User created successfully', user_id: newUser.rows[0]._id }); // Return success message and user ID
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' }); // Handle errors gracefully
    }
  };
  
  // Find a user by ID
  exports.findById = async (req, res) => {
    const id = req.params.id; // Get ID from URL parameter
  
    try {
      const result = await pool.query('SELECT * FROM users WHERE _id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' }); // Handle non-existent user
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error finding user' }); // Handle errors gracefully
    }
  };
  
  // Get all users
  exports.getAll = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching users' }); // Handle errors gracefully
    }
  };
  
  // Update a user by ID (assuming request body has update data)
  exports.update = async (req, res) => {
    const id = req.params.id;
    const { name, email, password } = req.body; // Extract data from request body
  
    try {
      const result = await pool.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE _id = $4', [name, email, password, id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' }); // Handle non-existent user
      }
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user' }); // Handle errors gracefully
    }
  };
  
  // Delete a user by ID
  exports.delete = async (req, res) => {
    const id = req.params.id;
  
    try {
      const result = await pool.query('DELETE FROM users WHERE _id = $1', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' }); // Handle non-existent user
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting user' }); // Handle errors gracefully
    }
  };
  