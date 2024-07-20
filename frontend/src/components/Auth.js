import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { setToken } from "../redux/features/authSlice";
import {
  registerDoctor,
  loginDoctor,
  registerPatient,
  loginPatient,
} from "../api";

const Auth = () => {
  const { role } = useParams();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (role === "doctor") {
        if (isSignup) {
          response = await registerDoctor(formData);
          navigate(`/auth/${role}`);
        } else {
          response = await loginDoctor(formData);
        }
      } else {
        if (isSignup) {
          response = await registerPatient(formData);
          navigate(`/auth/${role}`);
        } else {
          response = await loginPatient(formData);
        }
      }

      if (response) {
        const { token, user } = response.data;
        dispatch(setToken(token));
        dispatch(setUser(user));
        navigate(`/${role}-dashboard`);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-blue-200 p-10 border-2 mt-20 rounded shadow-md">
        <h1 className="flex justify-center items-center mt-5 font-bold text-2xl underline ">
          {isSignup ? "Sign Up" : "Log In"} as{" "}
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col justify-center items-center"
        >
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
              className="border w-[250px] rounded p-1 mt-3 shadow "
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="border w-[250px] rounded p-1 mt-3 shadow "
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="border w-[250px] rounded p-1 mt-3 shadow "
          />
          {isSignup && role === "doctor" && (
            <input
              type="text"
              name="specialty"
              placeholder="Specialty"
              onChange={handleChange}
              required
              className="border w-[250px] rounded p-1 mt-3 shadow "
            />
          )}
          <button type="submit" className="border mt-5 px-3 py-1 rounded bg-blue-700 text-white shadow hover:bg-blue-600">
            {isSignup ? "Sign Up" : "Log In"}
          </button>
          <button
            type="button"
            className="underline mt-5"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
