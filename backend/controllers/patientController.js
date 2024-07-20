const patientModel = require('../models/patientModel');
const doctorModel = require('../models/doctorModel');

const savePatientDetail = async (req, res) => {
    const description = req.body.description;
    const specialty = req.body.specialty; 
    const patientID = req.body.patientID; 
    const doctorName  = req.body.doctor;
    const patientname = req.body.patientname;
    console.log('Body', req.body);
    console.log('Description:', description);
    console.log('Specialty:', specialty);
    console.log('PatientID:', patientID);
    console.log('Doctor:', doctorName);
    console.log('Patient Name:', patientname);
    const patientDetail = await patientModel.savePatientDetail(patientID, patientname, specialty, description, doctorName);
    res.json(patientDetail);
};

const getPatientDetails = async (req, res) => {
    const { patientID } = req.query;
    console.log('Patient ID:', patientID);
    const patientDetails = await patientModel.getPatientDetails1(patientID);
    res.json(patientDetails);
};

module.exports = {
    savePatientDetail,
    getPatientDetails,
};

