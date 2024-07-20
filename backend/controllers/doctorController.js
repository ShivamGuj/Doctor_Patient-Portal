const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const doctorModel = require('../models/doctorModel');
const pdfModel = require('../models/pdfModel');
const { get } = require('http');
const patientModel = require('../models/patientModel');

// Set up AWS S3 client
const s3 = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: '',
        secretAccessKey: ''
    }
});

const upload = multer({ dest: 'uploads/' });

const uploadPDF = async (req, res) => {
    const file = req.file;
    console.log('File:', file);
    const doctorId = req.body.id;
    console.log('Doctor ID:', doctorId);

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: 'awsbucketportal',
        Key: `${doctorId}/${file.originalname}`,
        Body: fileStream,
        ContentType: file.mimetype
    };

    try {
        const command = new PutObjectCommand(uploadParams);
        const data = await s3.send(command);

        fs.unlinkSync(file.path);

        const pdf = await pdfModel.createPDF(doctorId, `https://awsbucketportal.s3.eu-north-1.amazonaws.com/${doctorId}/${file.originalname}`, file.originalname);
        res.json(pdf);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }
};

const getSpecialties = async (req, res) => {
    const specialties = await doctorModel.getSpecialties();
    res.json(specialties);
};

const getDoctorsBySpecialty = async (req, res) => {
    try {
        console.log('Request query:', req.query); // Log the incoming query
        const { specialty } = req.query;
        const doctors = await doctorModel.getDoctorsBySpecialty1(specialty);
        console.log('Fetched doctors:', doctors); // Log the fetched doctors
        res.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getDoctorPDFs = async (req, res) => {
    console.log('Request body:', req.query);
    const doctorId = req.query.doctorId;
    console.log('Doctor ID:', doctorId);
    try {
        const pdfs = await pdfModel.getPDFsByDoctorId(doctorId);
        res.json(pdfs);
        console.log(pdfs);
    } catch (error) {
        console.error('Error fetching PDFs:', error);
        res.status(500).json({ error: 'Error fetching PDFs' });
    }
};


const getDoctorPatientDetails = async (req, res) => {
    const doctorName = req.query.doctorName;
    
    if (!doctorName) {
        return res.status(400).json({ error: 'Doctor name is required' });
    }

    try {
        const details = await patientModel.getPatientDetailsByDoctorName(doctorName);
        res.json(details);
    } catch (error) {
        console.error('Error fetching patient details:', error);
        res.status(500).json({ error: 'Error fetching patient details' });
    }
};


module.exports = {
    upload,
    uploadPDF,
    getSpecialties,
    getDoctorsBySpecialty,
    getDoctorPDFs,
    getDoctorPatientDetails
};
