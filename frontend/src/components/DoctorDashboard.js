import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { uploadPDF, getDoctorPDFs } from "../api";
import { clearToken } from "../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { getDoctorPatientDetails } from "../api";

const DoctorDashboard = () => {
  const user = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    console.log("Doctor ID:", user.doctorid);
    const fetchPDFs = async () => {
      try {
        const response = await getDoctorPDFs(token, user.doctorid);
        setPdfs(response.data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPDFs();
  }, [user.doctorid]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("pdf", file);
    console.log("Doctor ID:", user.doctorid);
    formData.append("id", user.doctorid);
    console.log("FormData contents:", formData.get("pdf"), formData.get("id"));
    try {
      await uploadPDF(formData, token, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully");
      // Re-fetch the PDFs after successful upload
      const response = await getDoctorPDFs(token, user.doctorid);
      setPdfs(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleLogout = () => {
    dispatch(clearToken());
    window.location.href = "/";
  };

  useEffect(() => {
    if (user?.name) {
      fetchDetails(user.name);
      console.log("Doctor Name:", user.name);
    }
  }, [user?.name]);

  const fetchDetails = async (doctorname) => {
    try {
      const response = await getDoctorPatientDetails(doctorname);
      setDetails(response.data || {});
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  return (
    <div className="bg-green-100 h-screen">
      <div className="flex flex-col justify-center ml-10">
        <div className="flex items-center gap-[20vw]">
          {user && (
            <div className="mt-10 ">
              <h2 className="text-2xl font-bold underline">Doctor Details</h2>
              <p className="mt-2 text-xl font-semibold">Name: {user.name}</p>
              <p className="text-xl font-semibold">
                Specialty: {user.specialty}
              </p>
              <button
                className="border-2 border-black p-2 rounded-xl mt-5 shadow-md bg-blue-700 text-white hover:bg-blue-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
          <div className="mt-6 flex flex-col justify-center">
            <h2 className="text-xl font-semibold underline">Upload PDF</h2>
            <form
              onSubmit={handleUpload}
              className="mt-5 flex flex-col justify-center"
            >
              <input type="file" onChange={handleFileChange} className="" />
              <button
                type="submit"
                className="border mt-5 w-[100px] py-1 rounded-md bg-slate-700 text-white hover:bg-slate-600 shadow-md"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-center">
          <h2 className="text-xl font-semibold underline ">Uploaded PDFs</h2>
          <ul className="mt-3">
            {pdfs.map((pdf) => (
              <li key={pdf.pdfid}>
                <a
                  href={pdf.filepath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-md mt-2 underline"
                >
                  {pdf.filename}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {details && details.length > 0 && (
          <div className=" flex flex-col mt-5">
            <h2 className="text-xl underline ">Appointment Details</h2>
            {details.map((detail, index) => (
              <div
                key={index}
                className="border p-4 rounded-xl mt-2 shadow-md w-[40vw] bg-[#4ba138]"
              >
                <p className="text-white">Description: {detail.description}</p>
                <p className="text-white">Patient ID: {detail.patientid}</p>
                <p className="text-white">Patient Name: {detail.patientname}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
