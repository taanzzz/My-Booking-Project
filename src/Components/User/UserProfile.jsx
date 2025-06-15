import React, { useContext } from 'react';
import { FaUserEdit, FaEnvelope, FaIdBadge, FaUserSlash } from 'react-icons/fa';
import { AuthContext } from '../AuthContext/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';



const ProfileSkeleton = () => (
    <div className="max-w-2xl mx-auto mt-10 p-4">
        <div className="bg-base-200 rounded-2xl shadow-xl p-8 animate-pulse">
            <div className="h-32 bg-base-300 rounded-t-2xl -m-8"></div>
            <div className="flex justify-center -mt-16">
                <div className="w-32 h-32 bg-base-300 rounded-full ring-4 ring-base-200"></div>
            </div>
            <div className="mt-6 flex flex-col items-center">
                <div className="h-7 w-48 bg-base-300 rounded mb-2"></div>
                <div className="h-5 w-56 bg-base-300 rounded"></div>
            </div>
            <div className="mt-8 pt-6 border-t-2 border-dashed border-base-300 flex justify-center">
                 <div className="h-10 w-36 bg-base-300 rounded-lg"></div>
            </div>
        </div>
    </div>
);


const NotLoggedInState = () => (
    <div className="flex items-center justify-center min-h-[60vh] bg-base-200 p-4">
        <div className="card bg-base-100 shadow-xl max-w-md w-full text-center p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
               <FaUserSlash className="text-4xl text-primary" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-base-content">No User Found</h2>
            <p className="mt-2 text-base-content/70">Please log in to view your profile information.</p>
            <div className="card-actions justify-center mt-8">
                <Link to="/login" className="btn btn-primary">
                    Go to Login
                </Link>
            </div>
        </div>
    </div>
);


const UserProfile = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    if (loading) {
        return <ProfileSkeleton />;
    }

    if (!user) {
        return <NotLoggedInState />;
    }
    
    const defaultPhoto = `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random&color=fff&size=128`;

    return (
        <div className="bg-base-200 min-h-screen py-10 md:py-16 px-4">
            <motion.div 
                className="card max-w-2xl mx-auto bg-base-100 shadow-2xl rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                
                <div 
                    className="h-36 rounded-t-2xl bg-gradient-to-br from-primary to-secondary"
                    style={{
                        backgroundImage: `url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="scale(4)" opacity="0.1" xmlns="http://www.w3.org/2000/svg"><g fill="%23FFFFFF"><path d="M50 50a50 50 0 01-50-50h10a40 40 0 0040 40V50zM50 50a50 50 0 0150 50v-10a40 40 0 00-40-40H50z"/></g></svg>')`
                    }}
                ></div>

                <div className="p-6 md:p-8">
                    
                    <div className="flex flex-col items-center -mt-24 text-center">
                        <div className="avatar">
                            <div className="w-32 rounded-full ring-4 ring-offset-4 ring-offset-base-100 ring-primary">
                                <img
                                    src={user.photoURL || defaultPhoto}
                                    alt="User Avatar"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <h2 className="text-3xl font-extrabold mt-4 text-base-content">{user.displayName || 'Anonymous User'}</h2>
                        <p className="text-base-content/70 mt-1">{user.email}</p>
                        <button
                            onClick={() => navigate('/update-profile')}
                            className="btn btn-sm btn-outline btn-primary mt-4"
                        >
                            <FaUserEdit size={14} /> Edit Profile
                        </button>
                    </div>

                   
                    <div className="divider my-8">Details</div>

                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-base-200/60 rounded-lg">
                           <FaEnvelope className="text-xl text-primary flex-shrink-0" />
                           <div>
                               <p className="text-xs text-base-content/60">Email Address</p>
                               <p className="font-semibold text-base-content break-all">{user.email}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-base-200/60 rounded-lg">
                           <FaIdBadge className="text-xl text-primary flex-shrink-0" />
                           <div>
                               <p className="text-xs text-base-content/60">User ID</p>
                               <p className="font-mono text-sm text-base-content break-all">{user.uid}</p>
                           </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default UserProfile;