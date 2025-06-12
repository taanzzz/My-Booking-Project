import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosSecure from "../Axios/Axios";
import { AuthContext } from "../Components/AuthContext/AuthContext";
import { MdOutlineBedroomParent } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaUserFriends, FaSpinner, FaTimes, FaInfoCircle } from "react-icons/fa"; 
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion"; 

const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};


const RoomDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [bookingDate, setBookingDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userHasBooked, setUserHasBooked] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      axiosSecure.get(`/rooms/${id}`),
      axiosSecure.get(`/reviews/${id}`),
      axiosSecure.get(`/bookings/room/${id}/dates`)
    ])
    .then(([roomRes, reviewsRes, datesRes]) => {
      setRoom(roomRes.data);
      setReviews(reviewsRes.data);
      const dates = datesRes.data.map((dateStr) => new Date(dateStr + 'T00:00:00'));
      setBookedDates(dates);
    })
    .catch(error => {
      console.error("Error fetching room data:", error);
      toast.error("Could not load room details. Please try again.");
    })
    .finally(() => {
      setIsLoading(false);
    });

    if (user?.email) {
      axiosSecure.get(`/bookings/check?roomId=${id}&email=${user.email}`)
        .then((res) => {
          setUserHasBooked(res.data.hasBooked);
        });
    }
  }, [id, user?.email]);

  const handleBooking = () => {
    if (!bookingDate) return toast.error("Please select a booking date");
    if (!user) return toast.error("Please log in to book a room");

    axiosSecure.post("/bookings", {
        roomId: room._id,
        date: format(bookingDate, "yyyy-MM-dd"),
        email: user.email,
        roomName: room.name,
        image: room.image,
        price: room.price,
      })
      .then((res) => {
        toast.success("Room booked successfully!");
        const newBookingId = res.data.insertedId;
        if (newBookingId) {
          navigate(`/confirmation/${newBookingId}`);
        } else {
          navigate('/my-bookings');
        }
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          toast.error("This room is already booked on the selected date.");
        } else {
          toast.error("Booking failed. Please try again.");
        }
      });
  };
  
  
  const renderDayContents = (day, date) => {
    const isBooked = bookedDates.some(bookedDate => isSameDay(date, bookedDate));
    if (isBooked) {
      return (
        <div title="Booked & Unavailable" className="react-datepicker__day--disabled-tooltip">
          {day}
        </div>
      );
    }
    return day;
  };


  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900">
        <FaSpinner className="animate-spin text-4xl text-teal-500" />
        <p className="mt-4 text-slate-600 dark:text-slate-400">Loading Room Details...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Sorry, the requested room could not be found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f0f9ff] via-[#e0f2fe] to-[#f8fbff] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] py-10">
      <div className="p-4 max-w-4xl mx-auto space-y-10">
        
        
        <div className="rounded-xl overflow-hidden shadow-xl">
          <img src={room.image} alt={room.name} className="w-full h-auto md:h-96 object-cover"/>
        </div>

        <div className="p-6 rounded-xl shadow-xl bg-white dark:bg-slate-800">
            
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <MdOutlineBedroomParent className="text-teal-500" /> {room.name}
            </h1>
            <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 px-3 py-1 rounded-full text-sm font-semibold">💵 ${room.price} /night</span>
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"><IoLocationSharp /> {room.location}</span>
                <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"><FaUserFriends /> Max Guests: {room.maxGuests}</span>
                <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-semibold">⭐ {room.rating} Rating</span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">{room.description}</p>
            
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Features:</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    {room.features?.map((feature, index) => <li key={index}>{feature}</li>)}
                </ul>
            </div>
            
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                {!userHasBooked ? (
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105" onClick={() => setShowModal(true)}>
                    Book This Room
                </button>
                ) : (
                <p className="text-green-600 font-semibold text-lg">You have a booking for this room. Manage it in "My Bookings".</p>
                )}
            </div>
        </div>
        <div className="p-6 rounded-xl shadow-xl bg-white dark:bg-slate-800">
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Reviews</h2>
            {reviews.length > 0 ? (
                <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review._id} className="border-l-4 border-teal-500 p-4 bg-gray-50 dark:bg-slate-700 rounded-r-lg">
                    <div className="flex items-center gap-3">
                        <img src={review.userPhoto} alt={review.username} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{review.username}</p>
                        <p className="text-yellow-500 text-sm">{'⭐'.repeat(review.rating)}</p>
                        </div>
                    </div>
                    <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{review.comment}</p>
                    <p className="text-xs text-gray-400 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">No reviews available for this room yet.</p>
            )}
        </div>
      </div>

      
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md m-4"
            >
              
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Book Your Stay
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition" aria-label="Close modal">
                  <FaTimes size={20} />
                </button>
              </div>

             
              <div className="p-6">
                <p className="font-semibold text-lg text-gray-700 dark:text-gray-200">{room.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Price: <span className="font-bold text-teal-600 dark:text-teal-400">${room.price}</span> / night</p>
                
                <div className="datepicker-container">
                  <DatePicker
                    selected={bookingDate}
                    onChange={(date) => setBookingDate(date)}
                    minDate={new Date()}
                    excludeDates={bookedDates}
                    renderDayContents={renderDayContents} // Custom renderer for tooltips
                    placeholderText="Click to select a booking date"
                    inline
                  />
                </div>

                <div className="mt-4 flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                  <FaInfoCircle className="text-blue-500 dark:text-blue-400 text-lg flex-shrink-0" />
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Dates in gray are already booked by other guests. Hover on them to check.
                  </p>
                </div>
              </div>

              
              <div className="flex justify-end gap-4 p-5 bg-gray-50 dark:bg-slate-900/50 rounded-b-2xl">
                <button onClick={() => setShowModal(false)} className="px-5 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition">Cancel</button>
                <button onClick={handleBooking} disabled={!bookingDate} className="px-5 py-2 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed disabled:dark:bg-gray-700">
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomDetailsPage;