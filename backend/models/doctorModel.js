const pool = require('../config');

const createDoctor = async (name, email, passwordHash, specialty) => {
    const result = await pool.query(
        'INSERT INTO Doctors (Name, Email, PasswordHash, Specialty) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, passwordHash, specialty]
    );
    return result.rows[0];
};

const getDoctorByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM Doctors WHERE Email = $1', [email]);
    return result.rows[0];
};

const getSpecialties = async () => {
    const result = await pool.query('SELECT DISTINCT Specialty FROM Doctors');
    return result.rows;
};

const getDoctorsBySpecialty1 = async (specialty) => {
    const result = await pool.query('SELECT * FROM Doctors WHERE Specialty = $1', [specialty]);
    return result.rows;
};


module.exports = {
    createDoctor,
    getDoctorByEmail,
    getSpecialties,
    getDoctorsBySpecialty1,
};
