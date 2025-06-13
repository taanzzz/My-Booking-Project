import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegCheckCircle, FaPrint, FaArrowRight, FaBed, FaCalendarAlt, FaCreditCard, FaExclamationTriangle } from 'react-icons/fa';
import { AuthContext } from '../Components/AuthContext/AuthContext';
import axiosSecure from '../Axios/Axios';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router';


const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};


const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <span className="loading loading-infinity w-20 text-primary"></span>
        <p className="mt-4 text-base-content/70 animate-pulse">Fetching your confirmation...</p>
    </div>
);

const ErrorDisplay = ({ message }) => (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
        <div className="card bg-base-100 shadow-xl max-w-lg w-full text-center p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error/10">
               <FaExclamationTriangle className="text-4xl text-error" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-base-content">Oops! Something went wrong.</h2>
            <p className="mt-2 text-base-content/70">{message || "We couldn't load your booking details."}</p>
            <div className="card-actions justify-center mt-8">
                <Link to="/my-bookings" className="btn btn-primary">
                    Go to My Bookings
                </Link>
            </div>
        </div>
    </div>
);


const BookingConfirmationPage = () => {
   
    const { bookingId } = useParams();
    const { user, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [bookingDetails, setBookingDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            toast.warn("Please log in to view your booking.");
            navigate('/login');
            return;
        }

        if (bookingId) {
            setIsLoading(true);
            axiosSecure.get(`/booking/${bookingId}`)
                .then(res => {
                    setBookingDetails(res.data);
                    setError(null);
                })
                .catch(err => {
                    console.error("Failed to fetch booking:", err);
                    setError(err.response?.data?.message || "Could not find the booking.");
                })
                .finally(() => setIsLoading(false));
        } else {
            
            setIsLoading(false);
            setError("No booking ID was provided in the URL.");
        }
    }, [bookingId, user, authLoading, navigate]);

    if (authLoading || isLoading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay message={error} />;
    if (!bookingDetails) return <ErrorDisplay message="No booking details found." />;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="min-h-screen font-sans flex items-center justify-center bg-base-200 p-4"
        >
            <div className="max-w-3xl w-full bg-base-100 shadow-2xl rounded-2xl overflow-hidden">
                <div className="bg-primary text-primary-content p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_40%,transparent)]"></div>
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
                    >
                        <FaRegCheckCircle className="text-5xl mx-auto mb-3" />
                    </motion.div>
                    <h1 className="text-3xl font-bold tracking-tight">Booking Confirmed!</h1>
                    <p className="opacity-80 mt-1">Thank you, {user?.displayName}. Your stay is officially reserved.</p>
                </div>

                <div className="p-8 md:p-10">
                    <div className="text-center mb-8 pb-8 border-b-2 border-dashed border-base-300">
                        <p className="text-sm text-base-content/60 uppercase tracking-wider">Booking ID</p>
                        <p className="text-xl font-mono font-semibold text-base-content mt-1">{bookingDetails._id}</p>
                    </div>
                    
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-base-content">Your Stay Details</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-base-200/60 p-4 rounded-lg flex items-start gap-4">
                                <FaCalendarAlt className="text-xl text-primary mt-1"/>
                                <div>
                                    <p className="font-semibold text-base-content">Check-in Date</p>
                                    <p className="text-sm text-base-content/70">{formatDate(bookingDetails.date)}</p>
                                </div>
                            </div>
                            
                            <div className="bg-base-200/60 p-4 rounded-lg flex items-start gap-4">
                                <FaCreditCard className="text-xl text-primary mt-1"/>
                                <div>
                                    <p className="font-semibold text-base-content">${bookingDetails.price.toFixed(2)} / night</p>
                                    <p className="text-sm text-base-content/70">Total payable at the hotel.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-base-200/60 p-4 rounded-lg flex items-start gap-4">
                            <FaBed className="text-xl text-primary mt-1"/>
                            <div>
                                <p className="font-semibold text-base-content">{bookingDetails.roomName}</p>
                                <p className="text-sm text-base-content/70">A confirmation has been sent to {user?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col lg:flex-row justify-between items-center gap-4">
  <Link to="/my-bookings" className="w-full lg:w-auto">
    <button className="btn btn-primary w-full lg:w-auto text-base flex items-center gap-2 justify-center">
      Manage All Bookings <FaArrowRight />
    </button>
  </Link>

  <button
    onClick={() => window.print()}
    className="btn btn-ghost w-full lg:w-auto text-base flex items-center gap-2 justify-center"
  >
    <FaPrint /> Print Confirmation
  </button>
</div>

                </div>
            </div>
        </motion.div>
    );
};

export default BookingConfirmationPage;