const pool = require('../config/db');

exports.findByRuf = async (id) => {
    const result = await pool.query('SELECT * FROM company WHERE id = $1', [id]);
    return result.rows[0];
};

