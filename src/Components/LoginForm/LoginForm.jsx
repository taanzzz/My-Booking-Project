import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router';
import { FaEnvelope, FaGoogle, FaKey, FaMailchimp, FaPaw, FaSignInAlt, FaUserLock } from 'react-icons/fa';
import { AuthContext } from './../AuthContext/AuthContext';



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
      toast.success('✅ Logged in successfully!');
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
    if (!email) {
      toast.error('❌ Please enter your email first!');
      return;
    }
    try {
      await resetPassword(email);
      toast.success('📩 Password reset email sent!');
    } catch (err) {
      toast.error(`❌ Failed to send reset email: ${err.message}`);
    }
  };

  return (
    <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-0"
  style={{ backgroundImage: `url('vite.svg')` }}
>
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md text-white"
  >
    <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
      <FaPaw className="text-yellow-200 text-4xl" /> Login
    </h2>

    <div className="relative mb-4">
      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 text-lg" />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full pl-10 pr-4 py-2 rounded bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
      />
    </div>

    <div className="relative mb-4">
      <FaUserLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 text-lg" />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="w-full pl-10 pr-4 py-2 rounded bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
      />
    </div>

    <div className="flex justify-between items-center text-sm mb-4">
      <label className="flex items-center gap-1">
        <input type="checkbox" className="accent-white" />
        Remember Me
      </label>
      <button
        type="button"
        onClick={handleResetPassword}
        className="underline cursor-pointer flex justify-center items-center gap-1 hover:text-gray-300"
      >
       <FaKey className='text-yellow-100' /> Forget Password
      </button>
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition"
    >
      {loading ? 'Logging in...' : 'Log in'}
    </button>

    <button
      type="button"
      onClick={handleGoogle}
      className="w-full mt-3 border border-white text-white font-semibold py-2 rounded hover:bg-white/20 transition flex items-center justify-center gap-2"
    >
      <FaGoogle className="text-xl text-blue-500" /> Login with Google
    </button>

    <p className="text-center text-sm text-white mt-3">
      Don’t have an account?{' '}
      <Link
        to="/register"
        className="text-pink-400 underline hover:text-gray-200 font-semibold"
      >
        Register
      </Link>
    </p>
  </form>
</div>
  );
};

export default LoginForm;
