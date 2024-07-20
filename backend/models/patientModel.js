const pool = require('../config');

const createPatient = async (name, email, passwordHash) => {
    const result = await pool.query(
        'INSERT INTO Patients (Name, Email, PasswordHash) VALUES ($1, $2, $3) RETURNING *',
        [name, email, passwordHash]
    );
    return result.rows[0];
};

const getPatientByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM Patients WHERE Email = $1', [email]);
    return result.rows[0];
};

const savePatientDetail = async (patientID, patientName, specialty, description, doctorName) => {
    const result = await pool.query(
        'INSERT INTO PatientDetails (PatientID, PatientName, Description, Specialty, DoctorName) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [patientID, patientName, description, specialty, doctorName]
    );
    return result.rows[0];
};

const getPatientDetails1 = async (patientID) => {
    const result = await pool.query(
        'SELECT pd.Description, pd.Specialty, pd.DoctorName FROM PatientDetails pd WHERE pd.PatientID = $1',
        [patientID]
    );
    return result.rows;
};

const getPatientDetailsByDoctorName = async (doctorName) => {
    try {
        // Adjust the query based on your schema and ORM/SQL
        const query = 'SELECT * FROM PatientDetails WHERE doctorName = $1';
        const result = await pool.query(query, [doctorName]);
        return result.rows;
    } catch (error) {
        console.error('Error querying patient details:', error);
        throw new Error('Database query error');
    }
};


module.exports = {
    createPatient,
    getPatientByEmail,
    savePatientDetail,
    getPatientDetails1,
    getPatientDetailsByDoctorName,
};
