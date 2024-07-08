const pool = require('../config/db');

exports.findById = async (id) => {
    const result = await pool.query('SELECT _id FROM users WHERE _id = $1', [id]);
    return result.rows[0];
};

exports.getAll = async (id) => {
    const result = await pool.query('SELECT * FROM users', [id]);
    return result.rows[0];
};