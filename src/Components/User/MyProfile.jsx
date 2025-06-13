import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { Link } from 'react-router';

const MyProfile = () => {
    const { user, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef(null);

    const [canHover, setCanHover] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(hover: hover)').matches;
    });

    useEffect(() => {
        const mq = window.matchMedia('(hover: hover)');
        const handler = (e) => setCanHover(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    if (!user) return null;

    const defaultPhoto = `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random&color=fff`;

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('👋 Successfully logged out!');
            setOpen(false);
        } catch (err) {
            console.error(err);
            toast.error('⚠️ Failed to logout!');
        }
    };

    const handleMouseEnter = () => {
        if (canHover) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (canHover) {
            timeoutRef.current = setTimeout(() => {
                setOpen(false);
            }, 300);
        }
    };

    const handleClick = () => {
        if (!canHover) {
            setOpen((prev) => !prev);
        }
    };
    
    const menuVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.95, 
            y: -10,
            transition: { duration: 0.2, ease: 'easeOut' }
        },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { duration: 0.2, ease: 'easeIn' }
        }
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <label 
                tabIndex={0} 
                className="btn btn-ghost btn-circle avatar"
                onClick={handleClick}
            >
                <div className="w-10 rounded-full ring-2 ring-offset-2 ring-offset-base-100 ring-primary/50 hover:ring-primary transition-all">
                    <img
                        src={user.photoURL || defaultPhoto}
                        alt="User profile"
                    />
                </div>
            </label>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow-2xl bg-base-100 rounded-box w-60 absolute right-0"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                       
                        <li className="p-2">
                            <div className="flex flex-col items-start pointer-events-none">
                                <span className="font-bold text-base-content">{user.displayName || 'Anonymous User'}</span>
                                <span className="text-xs text-base-content/60">{user.email}</span>
                            </div>
                        </li>
                        <div className="divider my-0"></div>

                       
                        <li>
                            <Link to="/my-bookings" onClick={() => setOpen(false)}>
                                <FaUserCircle />
                                My Bookings
                            </Link>
                        </li>
                        
                        
                        <li>
                            <Link to="/user-profile" onClick={() => setOpen(false)}>
                                <FaUserEdit />
                                Update Profile
                            </Link>
                        </li>

                        <li>
                            <a onClick={handleLogout} className="text-error hover:bg-error hover:text-error-content">
                                <FaSignOutAlt />
                                Logout
                            </a>
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MyProfile;