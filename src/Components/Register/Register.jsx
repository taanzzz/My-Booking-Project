import React, { useContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { AuthContext } from './../AuthContext/AuthContext';


const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validatePassword = password =>
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    password.length >= 6;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      toast.error("❌ Invalid password: Must have uppercase, lowercase, and be at least 6 characters.");
      return;
    }
    try {
      await register(formData);
      toast.success("🎉 Registration successful!");
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      toast.error(`⚠️ Error: ${error.message}`);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage: `url('vite.svg')`,
        backgroundSize: '100% 100%',
        backgroundAttachment: 'fixed',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-green/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl space-y-6 border border-green/50"
      >
        <h2 className="text-2xl font-bold text-center text-white">
          <FaUser className="inline-block mr-2 text-blue-200" /> Create an Account
        </h2>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            <FaUser className="inline-block mr-1 text-blue-600" /> Full Name
          </label>
          <input
            name="name"
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            <FaEnvelope className="inline-block mr-1 text-white" /> Email Address
          </label>
          <input
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            <FaLock className="inline-block mr-1 text-yellow-300" /> Password
          </label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
        >
          Register
        </button>

        <p className="text-center text-sm text-black  mt-3">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-800 hover:underline cursor-pointer font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
