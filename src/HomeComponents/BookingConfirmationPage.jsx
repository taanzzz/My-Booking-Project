import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegCheckCircle, FaPrint, FaArrowRight, FaBed, FaUserFriends, FaRegCreditCard, FaSpinner } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../Components/AuthContext/AuthContext';
import axiosSecure from '../Axios/Axios';


const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  
  return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
};


const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900">
    <FaSpinner className="animate-spin text-4xl text-teal-500" />
    <p className="mt-4 text-slate-600 dark:text-slate-400">Fetching your confirmation...</p>
  </div>
);


const ErrorDisplay = ({ message }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 dark:bg-red-900/50">
        <h2 className="text-2xl font-bold text-red-600">Oops! Something went wrong.</h2>
        <p className="mt-2 text-red-500">{message || "We couldn't load your booking details."}</p>
        <Link to="/my-bookings" className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
            Go to My Bookings
        </Link>
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
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [bookingId, user, authLoading, navigate]);

  if (authLoading || isLoading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!bookingDetails) {
    return <ErrorDisplay message="No booking details found." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen font-sans flex items-center justify-center bg-gray-100 dark:bg-slate-900 p-4"
    >
      <div className="max-w-3xl w-full bg-white dark:bg-slate-800 shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-teal-600 text-white p-8 text-center">
          <FaRegCheckCircle className="text-5xl mx-auto mb-3" />
          <h1 className="text-3xl font-bold tracking-tight">Booking Confirmed!</h1>
          <p className="text-teal-100 mt-1">Thank you, {user?.displayName}. Your stay is officially reserved.</p>
        </div>

        <div className="p-8 md:p-10">
          <div className="text-center mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">Booking ID</p>
            <p className="text-xl font-mono font-semibold text-slate-800 dark:text-white mt-1">{bookingDetails._id}</p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Your Stay Details</h2>
            
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                <p className="text-sm text-slate-500 dark:text-slate-400">Check-in Date</p>
                <p className="font-semibold text-slate-800 dark:text-white">{formatDate(bookingDetails.date)}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg flex items-start gap-4">
              <FaBed className="text-xl text-teal-600 dark:text-teal-400 mt-1"/>
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">{bookingDetails.roomName}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">A confirmation has been sent to {user?.email}</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg flex items-start gap-4">
              <FaRegCreditCard className="text-xl text-teal-600 dark:text-teal-400 mt-1"/>
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">
                  ${bookingDetails.price.toFixed(2)} / night
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total payable at the hotel.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/my-bookings" className="w-full">
              <button className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-teal-700 transition-all duration-300 flex items-center justify-center gap-2">
                Manage All Bookings <FaArrowRight />
              </button>
            </Link>
            <button onClick={() => window.print()} className="w-full bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-500 transition-all duration-300 flex items-center justify-center gap-2">
              <FaPrint /> Print Confirmation
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingConfirmationPage;