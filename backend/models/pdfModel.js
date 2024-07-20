const pool = require('../config');

const createPDF = async (doctorId, filePath,filename) => {
    const result = await pool.query(
        'INSERT INTO PDFs (DoctorID, FilePath, UploadDate, filename) VALUES ($1, $2, NOW(), $3) RETURNING *',
        [doctorId, filePath, filename]
    );
    return result.rows[0];
};

const getPDFsByDoctorId = async (doctorId) => {
    const result = await pool.query('SELECT * FROM PDFs WHERE DoctorID = $1', [doctorId]);
    return result.rows;
};

module.exports = {
    createPDF,
    getPDFsByDoctorId,
};
