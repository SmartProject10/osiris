const pool = require('../config/db');

exports.findByid = async (id) => {
    const result = await pool.query('SELECT * FROM empresa WHERE iId_Empresa = $1', [id]);
    return result.rows[0];
};

