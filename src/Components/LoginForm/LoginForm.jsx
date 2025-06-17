import React, { useContext, useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.22,0-9.651-3.358-11.303-8H2.53C5.842,39.63,14.034,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,35.23,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);


const LoginShowcase = () => {
    return (
        <div 
            className="hidden lg:flex w-1/2 items-center justify-center p-12 text-white bg-cover bg-center relative"
            style={{ backgroundImage: "url('https://i.ibb.co/nM3cqfNH/20250611-061921-1.jpg')" }}
        >
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
            
            <div className="relative z-10 flex flex-col items-start space-y-6 max-w-md">
    <motion.h1 
        className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
    >
        Your Journey Begins Here.
    </motion.h1>
    <motion.p 
        className="text-lg text-gray-300" 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
    >
        Log in to manage your bookings,discover <span className="font-semibold text-cyan-300">exclusive member-only deals</span> and continue planning your next <span className="font-semibold text-cyan-300">dream getaway</span> with <span className="font-bold text-blue-400">Echo</span><span className='font-bold text-black'>Nest</span>.
    </motion.p>
</div>
        </div>
    );
};

const LoginForm = () => {
    const { login, googleSignIn, resetPassword } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const from = '/';

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success('✅ Welcome back!');
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(`❌ Login failed: Invalid credentials.`);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        try {
            await googleSignIn();
            toast.success('✅ Logged in with Google!');
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(`❌ Google login failed.`);
        }
    };

    const handleResetPassword = async () => {
        if (!email) return toast.info('📧 Please enter your email first!');
        try {
            await resetPassword(email);
            toast.success('📩 Password reset link sent!');
        } catch (err) {
            toast.error(`❌ Failed to send reset email.`);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
           
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
                <motion.div 
                    className="w-full max-w-md space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className="text-left">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text">
                                        Welcome Back!
                         </h2>
                        <p className="text-gray-500 mt-2">Please enter your details to sign in.</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-600">
                                <MdOutlineEmail size={22} />
                            </span>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full bg-gray-100 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                            />
                        </div>
                        
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-600">
                                <RiLockPasswordLine size={22} />
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="w-full bg-gray-100 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                                {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                            </span>
                        </div>
                        
                        <div className="flex justify-end items-center text-sm">
                            <span onClick={handleResetPassword} className="text-cyan-600 hover:text-cyan-700 hover:underline cursor-pointer font-medium">
                                Forgot Password?
                            </span>
                        </div>
                        
                        <button type="submit" disabled={loading} className="w-full text-lg font-bold text-white border-none rounded-xl py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
                            {loading ? <span className="loading loading-spinner"></span> : 'Sign In'}
                        </button>
                    </form>
                    
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">Or continue with</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <button type="button" onClick={handleGoogle} className="w-full py-3.5 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-colors font-semibold">
                        <GoogleIcon />
                        <span className="ml-3">Sign In with Google</span>
                    </button>
                    
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-cyan-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </motion.div>
            </div>
            
            
            <LoginShowcase />
        </div>
    );
};

export default LoginForm;