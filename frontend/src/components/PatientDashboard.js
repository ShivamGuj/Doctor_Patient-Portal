import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getSpecialties,
  savePatientDetail,
  getPatientDetails,
  getDoctorsBySpecialty,
} from "../api";
import { useDispatch } from "react-redux";
import { clearToken } from "../redux/features/authSlice";

const PatientDashboard = () => {
  const user = useSelector((state) => state.user);
  const [description, setDescription] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [doctor, setDoctor] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();

  const detailsLength = details ? details.length : 0;

  useEffect(() => {
    fetchSpecialties();
    if (user?.userId) {
      fetchDetails(user.userId);
    }
  }, [user?.userId]);

  useEffect(() => {
    if (specialty) {
      fetchDoctors(specialty);
    } else {
      setDoctors([]);
    }
  }, [specialty]);

  const fetchSpecialties = async () => {
    try {
      const response = await getSpecialties();
      setSpecialties(response.data || []);
    } catch (error) {
      console.error("Error fetching specialties:", error);
    }
  };

  const fetchDoctors = async (specialty) => {
    try {
      const response = await getDoctorsBySpecialty(specialty);
      setDoctors(response.data || []);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    if (user?.patientid) {
      fetchDetails(user.patientid);
    }
  }, [user?.patientid]);

  const fetchDetails = async (patientID) => {
    try {
      const response = await getPatientDetails(patientID);
      setDetails(response.data || {});
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("User:", user.patientid);
      console.log("Description:", description);
      console.log("Specialty:", specialty);
      console.log("Doctor:", doctor);
      console.log("Patient Name:", user.name);
      await savePatientDetail({
        description,
        specialty,
        patientID: user.patientid,
        patientname: user.name,
        doctor,
      });
      alert("Details saved successfully");
      fetchDetails(user.patientid);
    } catch (error) {
      console.error("Error saving details:", error);
    }
  };

  const handleLogout = () => {
    dispatch(clearToken());
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col justify-center bg-[#FBCEB1] h-screen ">
      <div className="flex flex-row">
        {user && (
          <div className=" ml-10">
            <h2 className="text-2xl font-bold underline">Patient Details</h2>
            <p className="text-xl font-semibold">Name: {user.name}</p>
            <p className="textxl font-semibold">Email: {user.email}</p>
            <button
              className="border-2 border-black p-2 rounded-xl mt-5 shadow-md bg-blue-700 text-white hover:bg-blue-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
        <div className=" ml-10 flex flex-col justify-center">
          <h2 className="text-xl underline">Describe Your Needs</h2>
          <form
            onSubmit={handleSubmit}
            className="border w-[40vw] mt-5 p-4 border-black rounded-xl shadow-md bg-blue-100"
          >
            <div className="flex flex-col ">
              <label className="">Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                cols="50"
                required
                className="border p-1 rounded-md"
              ></textarea>
            </div>
            <div className="flex flex-row items-center mt-2">
              <label>Specialty Required:</label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                required
                className="border p-1 rounded-md ml-2"
              >
                <option value="">Select a specialty</option>
                {specialties.map((spec, index) => (
                  <option key={index} value={spec.specialty}>
                    {spec.specialty}
                  </option>
                ))}
              </select>
            </div>
            {specialty && (
              <div>
                <label>Select Doctor:</label>
                <select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  required
                  className="border p-1 rounded-md ml-2 mt-2"
                >
                  <option value="">Select a doctor</option>
                  {doctors.map((doc, index) => (
                    <option key={index} value={doc.id}>
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              type="submit"
              className="border mt-5 w-[100px] py-1 rounded-md bg-blue-700 text-white hover:bg-blue-600 shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {details && details.length > 0 && (
        <div className=" flex flex-col mt-3 ml-10">
          <h2 className="text-xl underline">Appointment Details</h2>
          {details.map((detail, index) => (
            <div
              key={index}
              className="border p-4 rounded-xl mt-2 shadow-md w-[40vw] bg-[#D2122E]"
            >
              <p className="text-white">Description: {detail.description}</p>
              <p className="text-white">Specialty: {detail.specialty}</p>
              <p className="text-white">Doctor Name: {detail.doctorname}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
