const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/upload-pdf', authMiddleware, doctorController.upload.single('pdf'), doctorController.uploadPDF);
router.get('/pdfs', authMiddleware, doctorController.getDoctorPDFs);
router.get('/specialties', doctorController.getSpecialties);
router.get('/doctors', doctorController.getDoctorsBySpecialty);
router.get('/patient-details', doctorController.getDoctorPatientDetails);

module.exports = router;
