import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Validation from './signupvalidation';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Replace with your API base URL
});

axiosInstance.interceptors.request.use((config) => {
  config.url = `${axiosInstance.defaults.baseURL}${config.url}`;
  return config;
});

function Signup() {
  const [val, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(val));

    try {
      const response = await axiosInstance.post('/register', val);
      console.log(response);
      // Handle the response from the API as needed
    } catch (error) {
      console.log(error);
      // Handle the error from the API as needed
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input type="text" placeholder="Enter name" name="name" onChange={handleInput} className="form-control rounded-0" />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input type="email" placeholder="Enter email" name="email" onChange={handleInput} className="form-control rounded-0" />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input type="password" placeholder="Enter password" name="password" onChange={handleInput} className="form-control rounded-0" />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100">
            <strong>Sign Up</strong>
          </button>
          <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Already have an account? Log In
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
