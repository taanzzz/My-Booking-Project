import React, { useContext, useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';
import { motion } from 'framer-motion';
import { FaUserSlash, FaCamera, FaSignature } from 'react-icons/fa';
import { useNavigate } from 'react-router';


const NotLoggedInState = () => (
    <div className="flex items-center justify-center min-h-[60vh] bg-base-200 p-4">
        <div className="card bg-base-100 shadow-xl max-w-md w-full text-center p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
               <FaUserSlash className="text-4xl text-primary" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-base-content">Access Denied</h2>
            <p className="mt-2 text-base-content/70">Please log in first to update your profile.</p>
            <div className="card-actions justify-center mt-8">
                <Link to="/login" className="btn btn-primary">
                    Go to Login
                </Link>
            </div>
        </div>
    </div>
);


const UpdateProfile = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [name, setName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();
    
    const defaultPhoto = `https://ui-avatars.com/api/?name=${name || 'User'}&background=random&color=fff&size=128`;

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            await updateProfile(user, { 
                displayName: name, 
                photoURL: photoURL 
            });
            toast.success('✅ Profile updated successfully!');
            navigate('/user-profile'); 
        } catch (error) {
            toast.error('❌ Failed to update profile!');
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (authLoading) {
        
        return <div className="flex items-center justify-center h-64"><span className="loading loading-spinner text-primary"></span></div>;
    }

    if (!user) {
        return <NotLoggedInState />;
    }

    return (
        <div className="bg-base-200 min-h-screen py-10 md:py-16 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-base-content">Update Your Profile</h1>
                    <p className="text-base-content/70 mt-2">Keep your information up to date.</p>
                </div>

                <div className="card bg-base-100 shadow-2xl rounded-2xl">
                    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                        
                       
                        <div className="md:col-span-1 flex flex-col items-center text-center">
                            <h3 className="font-bold text-lg mb-4">Avatar Preview</h3>
                            <div className="avatar">
                                <div className="w-40 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-4">
                                    <img src={photoURL || defaultPhoto} alt="Avatar Preview" />
                                 </div>
                            </div>
                             <p className="text-xs text-base-content/60 mt-4">The preview will update as you type in the Photo URL field.</p>
                        </div>

                       
                        <div className="md:col-span-2 space-y-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold flex items-center gap-2"><FaSignature /> Display Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold flex items-center gap-2"><FaCamera /> Photo URL</span>
                                </label>
                                <input
                                    type="url"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="https://example.com/your-photo.jpg"
                                />
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full sm:w-auto"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? <span className="loading loading-spinner"></span> : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default UpdateProfile;