const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');

const app = express();
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/auth', authRoutes);
app.use('/doctor', doctorRoutes);
app.use('/patient', patientRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
