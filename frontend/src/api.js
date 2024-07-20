import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

export const registerDoctor = (formData) => API.post('/auth/register/doctor', formData);
export const loginDoctor = (formData) => API.post('/auth/login/doctor', formData);
export const registerPatient = (formData) => API.post('/auth/register/patient', formData);
export const loginPatient = (formData) => API.post('/auth/login/patient', formData);
//export const uploadPDF = (formData) => API.post('/doctor/upload-pdf', formData);
export const getSpecialties = () => API.get('/doctor/specialties');
export const savePatientDetail = (description, specialty, patientID, patientname, doctor) => API.post('/patient/details',  description, specialty, patientID, patientname, doctor );
export const getPatientDetails = (patientID) => API.get(`/patient/details`, { params: { patientID } });
export const fetchUserDetails = () => API.get('/user/details');
//export const getDoctorPDFs = (doctorId) => API.get(`/doctor/pdfs?doctorId=${doctorId}`);
export const getDoctorsBySpecialty = (specialty) => API.get(`/doctor/doctors?specialty=${specialty}`);
/*export const fetchDoctorPDFs = async (doctorId) => {
    const response = await axios.get(`/api/doctors/${doctorId}/pdfs`);
    return response.data;
};*/
export const getDoctorPDFs = async (token, doctorId) => {
    return API.get(`/doctor/pdfs?doctorId=${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};


export const uploadPDF = async (formData, token) => {
    return API.post('/doctor/upload-pdf', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        },
    });
};

export const getDoctorPatientDetails = async (doctorName) => {
    return API.get(`/doctor/patient-details?doctorName=${doctorName}`);
};



export default API;
