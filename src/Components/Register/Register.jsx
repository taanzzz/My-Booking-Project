import React, { useContext, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../AuthContext/AuthContext';
import { FaCheckCircle, FaTimesCircle, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';


const AnimatedBlob = ({ className, animationProps }) => (
    <motion.div
        className={`absolute rounded-full mix-blend-hard-light filter blur-3xl opacity-30 ${className}`}
        {...animationProps}
    />
);


const AestheticShowcase = () => {
    return (
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-700 relative overflow-hidden p-12 text-white flex-col justify-center items-center">
            
            <AnimatePresence>
                <AnimatedBlob
                    className="w-96 h-96 bg-cyan-300 -top-20 -left-20"
                    animationProps={{
                        animate: { y: [0, 20, 0], x: [0, -10, 0] },
                        transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' }
                    }}
                />
                <AnimatedBlob
                    className="w-80 h-80 bg-teal-300 -bottom-24 right-0"
                    animationProps={{
                        animate: { y: [0, -25, 0], x: [0, 15, 0] },
                        transition: { duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }
                    }}
                />
            </AnimatePresence>

            <div className="relative z-10 flex flex-col items-center space-y-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="text-4xl font-bold tracking-tight"
                >
                   <span className="font-bold text-blue-800">Echo</span><span className='font-bold text-black'>Nest</span>
                </motion.div>
                <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
    className="max-w-md text-lg text-cyan-100"
>
    <span className="font-semibold text-white">Discover</span> Your Next <span className="font-bold bg-gradient-to-r from-cyan-300 to-sky-400 text-transparent bg-clip-text">Unforgettable Stay</span>. 
    Your <span className="font-semibold text-cyan-300">dream destination</span> is just a click away.
</motion.p>
                
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                    className="w-full max-w-xs bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl text-gray-800 overflow-hidden"
                >
                    <img 
                        src="https://i.ibb.co/JwKt43B0/20250610-070951.jpg" 
                        alt="Luxury Hotel" 
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-5 text-left">
                        <h3 className="font-bold text-xl">Caribbean Beachfront Villa</h3>
                        <p className="text-sm text-gray-500 mb-2">Bridgetown,Barbados</p>
                        <div className="flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            <FaStar className="text-yellow-400 mr-1" />
                            <FaStar className="text-yellow-400 mr-1" />
                            <FaStar className="text-yellow-400 mr-1" />
                            <FaStar className="text-yellow-300 mr-2" />
                            <span className="text-xs font-bold text-gray-600">(1,220 reviews)</span>
                        </div>
                    </div>
                </motion.div>

                
                <div className="w-full max-w-xs grid grid-cols-2 gap-4 pt-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.9 }}
                        className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex flex-col items-center space-y-2"
                    >
                         <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9"></path></svg>
                        <p className="font-semibold text-sm">Global Destinations</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.9 }}
                        className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex flex-col items-center space-y-2"
                    >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        <p className="font-semibold text-sm">Best Price Guarantee</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};


const PasswordChecklist = ({ password }) => {
    const checks = useMemo(() => ({
        isLongEnough: password.length >= 6,
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasNumberOrSymbol: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password),
    }), [password]);

    const CheckItem = ({ isMet, text }) => (
        <div className={`flex items-center text-sm transition-colors duration-300 ${isMet ? 'text-green-600' : 'text-gray-500'}`}>
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
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', photoURL: '' });
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex">

                
                <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center overflow-y-auto">
                    <div className="w-full max-w-md mx-auto">
                        <div className="mb-8">
                            <div className="flex items-center mb-6">
                                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <div className="ml-auto text-sm text-gray-600">
                                    Already a member?{' '}
                                    <Link to="/login" className="text-cyan-600 font-medium hover:underline">
                                        Sign in
                                    </Link>
                                </div>
                            </div>

                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                            <p className="text-gray-500">Start your journey with EchoNest today.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </div>
                                <input name="name" onChange={handleChange} required placeholder="Full Name" className="w-full bg-gray-100 border-0 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all" />
                            </div>
                            
                            <div className="relative">
                                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                 </div>
                                <input name="email" type="email" onChange={handleChange} required placeholder="Email Address" className="w-full bg-gray-100 border-0 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all" />
                            </div>
                            
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                                <input name="photoURL" type="text" onChange={handleChange} placeholder="Photo URL (Optional)" className="w-full bg-gray-100 border-0 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all" />
                            </div>
                            
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                <input name="password" type={showPassword ? "text" : "password"} onChange={handleChange} required placeholder="Password" className="w-full bg-gray-100 border-0 rounded-xl pl-12 pr-12 py-3.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPassword ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7C3.732 7.943 7.523 5 12 5c1.258 0 2.46.182 3.597.52M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 2l20 20" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                                </button>
                            </div>
                            
                            <AnimatePresence>
                                {formData.password && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}><PasswordChecklist password={formData.password} /></motion.div>}
                            </AnimatePresence>

                            
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                     <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} onChange={handleChange} required placeholder="Re-Type Password" className="w-full bg-gray-100 border-0 rounded-xl pl-12 pr-12 py-3.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all" />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showConfirmPassword ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7C3.732 7.943 7.523 5 12 5c1.258 0 2.46.182 3.597.52M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 2l20 20" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                                </button>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3.5 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : <span>Sign Up</span>}
                                {!isSubmitting && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>}
                            </button>

                            <div className="flex items-center justify-center space-x-4 pt-4">
                                <span className="text-gray-500 text-sm">Or sign up with</span>
                                <button onClick={handleGoogle} type="button" className="p-3 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
                                    <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" className="w-6 h-6" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                
                <AestheticShowcase />
            </div>
        </div>
    );
};

export default Register;