import React, { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router';

const LoginForm = () => {
  const { login, googleSignIn, resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('✅ Welcome to EchoNest!');
      navigate('/');
    } catch (err) {
      toast.error(`❌ Login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      toast.success('✅ Logged in with Google!');
      navigate('/');
    } catch (err) {
      toast.error(`❌ Google login failed: ${err.message}`);
    }
  };

  const handleResetPassword = async () => {
    if (!email) return toast.error('❌ Please enter your email first!');
    try {
      await resetPassword(email);
      toast.success('📩 Password reset link sent!');
    } catch (err) {
      toast.error(`❌ Failed to send reset email: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-lg rounded-lg overflow-hidden">

        
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-2 text-black">Welcome to EchoNest</h2>
          <p className="text-gray-500 mb-6">
            Sign in to manage your bookings, explore exclusive deals, and experience seamless hotel stays.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <div className="text-right text-sm">
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-green-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white rounded-full py-2 font-semibold hover:opacity-90 transition"
            >
              {loading ? 'Logging in...' : 'Login to EchoNest'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <span className="text-gray-400 text-sm">or sign in with</span>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={handleGoogle}
              className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            >
              <FaGoogle className="text-lg text-gray-600" />
            </button>
          </div>

          <p className="mt-6 text-center text-sm">
            Don’t have an account?{' '}
            <Link to="/register" className="text-green-700 font-semibold hover:underline">
              Create one now
            </Link>
          </p>
        </div>

        
        <div className="md:w-1/2 bg-white flex flex-col items-center justify-center p-8 text-center">
          <img
            src="https://i.ibb.co/QFqHChzP/20250607-010554.jpg" // Update with your actual image path
            alt="Hotel Illustration"
            className="w-100 h-60 mb-6 "
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
