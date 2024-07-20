import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="">
      <h1 className="flex justify-center mt-5 font-bold text-3xl underline">
        Welcome to the Home Page
      </h1>
      <p className="flex justify-center mt-5 font-semibold text-xl">
        Please select if you are a doctor or a patient.
      </p>
      <div className="flex justify-center mt-10">
        <Link to="/auth/doctor" className="border p-4 rounded-xl mr-7 shadow-md bg-green-700 text-white font-semibold hover:bg-green-600">
          Doctor
        </Link>
        <br />
        <Link to="/auth/patient" className="border p-4 rounded-xl ml-7 shadow-md bg-red-700 text-white font-semibold hover:bg-red-600">
          Patient
        </Link>
      </div>
    </div>
  );
};

export default Home;
