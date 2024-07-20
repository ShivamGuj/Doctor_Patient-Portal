const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register/doctor', authController.registerDoctor);
router.post('/login/doctor', authController.loginDoctor);
router.post('/register/patient', authController.registerPatient);
router.post('/login/patient', authController.loginPatient);

module.exports = router;
