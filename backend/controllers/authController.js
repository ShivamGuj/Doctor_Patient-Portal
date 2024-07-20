const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const patientModel = require('../models/patientModel');


const registerDoctor = async (req, res) => {
    const { name, email, password, specialty } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await doctorModel.createDoctor(name, email, hashedPassword, specialty);
    const token = jwt.sign({ id: doctor.doctorid, role: 'doctor' }, 'your_jwt_secret');
    res.json({ token, user: doctor }); // Include user data
};

const loginDoctor = async (req, res) => {
    const { email, password } = req.body;
    const doctor = await doctorModel.getDoctorByEmail(email);
    if (!doctor || !(await bcrypt.compare(password, doctor.passwordhash))) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: doctor.doctorid, role: 'doctor' }, 'your_jwt_secret');
    res.json({ token, user: doctor }); // Include user data
};

const registerPatient = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const patient = await patientModel.createPatient(name, email, hashedPassword);
    const token = jwt.sign({ id: patient.patientid, role: 'patient' }, 'your_jwt_secret');
    res.json({ token, user: patient }); // Include user data
};

const loginPatient = async (req, res) => {
    const { email, password } = req.body;
    const patient = await patientModel.getPatientByEmail(email);
    if (!patient || !(await bcrypt.compare(password, patient.passwordhash))) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: patient.patientid, role: 'patient' }, 'your_jwt_secret');
    res.json({ token, user: patient }); // Include user data
};

module.exports = {
    registerDoctor,
    loginDoctor,
    registerPatient,
    loginPatient,
};
