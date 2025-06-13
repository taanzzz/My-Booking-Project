import React, { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';

const LoginForm = () => {
    const { login, googleSignIn, resetPassword } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success('✅ Welcome back!');
            navigate(location.state?.from?.pathname || '/');
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
            navigate(location.state?.from?.pathname || '/');
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

    const customStyles = `
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .wavy-orbit {
            position: absolute;
            inset: 0;
            margin: auto;
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            animation: rotate linear infinite;
            filter: blur(1px);
        }
        .glow-1 {
            border-color: #EC4899; /* Pink */
            box-shadow: 0 0 20px #EC4899, inset 0 0 10px #EC4899;
        }
        .glow-2 {
            border-color: #86EFAC; /* Lime Green */
            box-shadow: 0 0 25px #86EFAC, inset 0 0 10px #86EFAC;
        }
        .glow-3 {
            border-color: #FBBF24; /* Amber */
            box-shadow: 0 0 20px #FBBF24, inset 0 0 10px #FBBF24;
        }
    `;

    return (
        <>
            <style>{customStyles}</style>
            <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                        className="wavy-orbit w-[25rem] h-[25rem] sm:w-[30rem] sm:h-[30rem] border-4 glow-1"
                        style={{ animationDuration: '15s' }}
                    ></div>
                    <div 
                        className="wavy-orbit w-[25rem] h-[25rem] sm:w-[30rem] sm:h-[30rem] border-4 glow-2"
                        style={{ animationDuration: '12s', animationDirection: 'reverse' }}
                    ></div>
                    <div 
                        className="wavy-orbit w-[25rem] h-[25rem] sm:w-[30rem] sm:h-[30rem] border-4 glow-3"
                        style={{ animationDuration: '18s' }}
                    ></div>
                </div>

                <motion.div
                    className="w-full max-w-sm p-8 space-y-6 z-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-white text-center">Login</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full bg-transparent border border-gray-700 text-white rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full bg-transparent border border-gray-700 text-white rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        />
                        
                        <div className="flex justify-between items-center text-sm">
                            <span onClick={handleResetPassword} className="text-gray-400 hover:text-white hover:underline cursor-pointer">
                                Forgot Password?
                            </span>
                            <Link to="/register" className="font-semibold text-gray-200 hover:text-white hover:underline">
                                Sign Up
                            </Link>
                        </div>
                        
                        <button type="submit" disabled={loading} className="w-full btn text-lg font-bold text-black border-none rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 hover:opacity-90">
                            {loading ? <span className="loading loading-spinner"></span> : 'Sign In'}
                        </button>
                    </form>
                    
                    {/* --- Google সাইন-ইন এর জন্য নতুন অংশ --- */}
                    <div className="divider text-gray-500 text-sm">Or</div>

                    <button
                        type="button"
                        onClick={handleGoogle}
                        className="w-full btn btn-outline border-gray-600 text-white hover:bg-white hover:text-black"
                    >
                        <FaGoogle className="mr-2" /> Continue with Google
                    </button>
                </motion.div>
            </div>
        </>
    );
};

export default LoginForm;