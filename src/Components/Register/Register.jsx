import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../AuthContext/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validatePassword = password =>
    /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9!@#$%^&*(),.?":{}|<>]/.test(password) && password.length >= 6;

  const handleSubmit = async e => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (!validatePassword(password)) {
      toast.error('❌ Password must include uppercase, lowercase, number/symbol, and be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('❌ Passwords do not match.');
      return;
    }

    try {
      await register(formData);
      toast.success('🎉 Registration successful!');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      toast.error(`⚠️ ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="ml-auto text-sm text-gray-600">
                Already member?{' '}
                <Link to="/login" className="text-blue-600 font-medium hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Sign Up</h1>
            <p className="text-gray-500">Secure Your Communications with Easymail</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                name="name"
                onChange={handleChange}
                required
                placeholder="Daniel Ahmadi"
                className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-12 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                required
                placeholder="11Danielahmadi@gmail.com"
                className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-12 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                required
                placeholder="• • • • • •"
                className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-12 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">Least 8 characters</span>
              </div>
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-green-600">Least one number (0-9) or a symbol</span>
              </div>
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-green-600">Lowercase (a-z) and uppercase (A-Z)</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                required
                placeholder="Re-Type Password"
                className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Sign Up</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            <div className="flex items-center justify-center space-x-4 pt-4">
              <span className="text-gray-500 text-sm">Or</span>
              <button type="button" className="p-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                <img src="https://img.icons8.com/color/24/facebook-new.png" alt="Facebook" className="w-6 h-6" />
              </button>
              <button type="button" className="p-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center text-sm">
            <img src="https://img.icons8.com/emoji/24/flag-for-united-kingdom.png" alt="UK Flag" className="w-5 h-5 mr-2" />
            <span className="text-gray-600 font-medium">ENG</span>
          </div>
        </div>

        {/* Right Side - Decorative */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 relative overflow-hidden">
          {/* Decorative curved background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-purple-700"></div>
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-300/20 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center w-full p-8 space-y-12">
            {/* Inbox Card - positioned at top */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 w-56 transform rotate-6 hover:rotate-3 transition-all duration-300 relative">
              <div className="text-center">
                <h4 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Inbox</h4>
                <p className="text-4xl font-black text-gray-900 mb-4">176,18</p>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    {/* Wave/Chart visualization */}
                    <svg width="120" height="40" viewBox="0 0 120 40" className="mb-2">
                      <path d="M0,30 Q15,10 30,20 T60,15 T90,25 T120,10" stroke="#f97316" strokeWidth="3" fill="none" className="opacity-80"/>
                      <path d="M0,35 Q15,25 30,30 T60,25 T90,35 T120,25" stroke="#3b82f6" strokeWidth="3" fill="none" className="opacity-80"/>
                    </svg>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      46
                    </div>
                  </div>
                </div>
                <div className="h-1.5 bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-500 rounded-full"></div>
              </div>
            </div>

            {/* Social Icons - positioned in middle right */}
            <div className="flex space-x-6 ml-32">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200">
                <img src="https://img.icons8.com/fluency/36/instagram-new.png" alt="Instagram" />
              </div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200">
                <img src="https://img.icons8.com/fluency/36/tiktok.png" alt="TikTok" />
              </div>
            </div>

            {/* Privacy Card - positioned at bottom */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 w-80 transform -rotate-3 hover:rotate-0 transition-all duration-300 relative">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-2 text-lg">Your data, your rules</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Your data belongs to you, and our encryption ensures that.
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-2 right-4 w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="absolute bottom-4 right-2 w-1 h-1 bg-purple-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;