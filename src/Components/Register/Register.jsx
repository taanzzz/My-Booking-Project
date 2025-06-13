import React, { useContext, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../AuthContext/AuthContext';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


const PasswordChecklist = ({ password }) => {
    const checks = useMemo(() => ({
        isLongEnough: password.length >= 6,
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasNumberOrSymbol: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password),
    }), [password]);

    const CheckItem = ({ isMet, text }) => (
        <div className={`flex items-center text-sm transition-colors duration-300 ${isMet ? 'text-blue-600' : 'text-gray-500'}`}>
            {isMet ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
            <span>{text}</span>
        </div>
    );

    return (
        <div className="space-y-2 mt-3">
            <CheckItem isMet={checks.isLongEnough} text="Least 6 characters" />
            <CheckItem isMet={checks.hasNumberOrSymbol} text="Least one number or a symbol" />
            <CheckItem isMet={checks.hasUpper} text="Uppercase character (A-Z)" />
            <CheckItem isMet={checks.hasLower} text="Lowercase character (a-z)" />
        </div>
    );
};


const Register = () => {
    const { register, googleSignIn } = useContext(AuthContext); 
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' ,photoURL: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validatePassword = password =>
        /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9!@#$%^&*(),.?":{}|<>]/.test(password) && password.length >= 6;

    const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password, confirmPassword, photoURL } = formData;

    if (!validatePassword(password)) {
        toast.error('❌ Password must meet all requirements.');
        return;
    }

    if (password !== confirmPassword) {
        toast.error('❌ Passwords do not match.');
        return;
    }

    setIsSubmitting(true);
    try {
        
        await register({ name, email, password, photoURL }); 
        
        toast.success('🎉 Registration successful!');
        navigate('/');
    } catch (error) {
        toast.error(`⚠️ ${error.message}`);
    } finally {
        setIsSubmitting(false);
    }
};
    
    
    const handleGoogle = async () => {
        if (!googleSignIn) return toast.info("Google Sign-In is not configured.");
        try {
            await googleSignIn();
            toast.success('✅ Signed up with Google!');
            navigate('/');
        } catch (err) {
            toast.error(`❌ Google Sign-Up failed.`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex">
                
                <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <div className="flex items-center mb-6">
                            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
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
                        <p className="text-gray-500">Secure Your Communications with EchoNest</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                placeholder="Full Name" 
                                className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            />
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
                                placeholder="Email Address" 
                                className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            />
                        </div>

                        <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                     </div>
                     <input
                  name="photoURL"
                  type="text" 
                  onChange={handleChange}
                     placeholder="Photo URL (Optional)" 
                 className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                         />
                                </div>


                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"} 
                                onChange={handleChange}
                                required
                                placeholder="Password" 
                                className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-12 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7C3.732 7.943 7.523 5 12 5c1.258 0 2.46.182 3.597.52M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 2l20 20" /></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                )}
                            </button>
                        </div>
                        
                       
                        <PasswordChecklist password={formData.password} />

                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"} 
                                onChange={handleChange}
                                required
                                placeholder="Re-Type Password"
                                className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-12 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            />
                             <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showConfirmPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7C3.732 7.943 7.523 5 12 5c1.258 0 2.46.182 3.597.52M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 2l20 20" /></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                )}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
                        >
                            {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : <span>Sign Up</span>}
                            {!isSubmitting && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>}
                        </button>

                        <div className="flex items-center justify-center space-x-4 pt-4">
                            <span className="text-gray-500 text-sm">Or</span>
                            <button onClick={handleGoogle} type="button" className="p-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                                <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" className="w-6 h-6" />
                            </button>
                           
                        </div>
                    </form>
                </div>

                
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-purple-700"></div>
                        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-300/20 rounded-full blur-2xl"></div>
                    </div>
                    <div className="relative z-10 flex flex-col items-center justify-center w-full p-8 space-y-12">
                        <div className="bg-white rounded-3xl shadow-2xl p-6 w-56 transform rotate-6 hover:rotate-3 transition-all duration-300 relative">
                            <div className="text-center">
                                <h4 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Inbox</h4>
                                <p className="text-4xl font-black text-gray-900 mb-4">176,18</p>
                                <div className="flex items-center justify-center mb-4">
                                    <div className="relative">
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
                        <div className="flex space-x-6 ml-32">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200">
                                <img src="https://img.icons8.com/fluency/36/instagram-new.png" alt="Instagram" />
                            </div>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200">
                                <img src="https://img.icons8.com/fluency/36/tiktok.png" alt="TikTok" />
                            </div>
                        </div>
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