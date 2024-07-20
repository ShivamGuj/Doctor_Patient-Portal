const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/details', patientController.savePatientDetail);
router.get('/details', patientController.getPatientDetails);

module.exports = router;
