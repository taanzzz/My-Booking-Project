import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosSecure from "../Axios/Axios";
import { AuthContext } from "../Components/AuthContext/AuthContext";
import { MdOutlineBedroomParent } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaUserFriends, FaStar, FaStarHalfAlt, FaRegStar, FaTimes, FaInfoCircle } from "react-icons/fa"; 
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router";


const StarRating = ({ rating }) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
        if (i <= rating) stars.push(<FaStar key={i} />);
        else if (i === Math.ceil(rating) && !Number.isInteger(rating)) stars.push(<FaStarHalfAlt key={i} />);
        else stars.push(<FaRegStar key={i} />);
    }
    return <div className="flex items-center gap-1 text-orange-400">{stars}</div>;
};


const isSameDay = (d1, d2) => d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();


const RoomDetailsSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full h-80 bg-base-300 rounded-2xl animate-pulse mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-8">
                <div className="bg-base-200 p-6 rounded-2xl animate-pulse">
                    <div className="h-8 w-3/4 bg-base-300 rounded mb-4"></div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <div className="h-6 w-24 bg-base-300 rounded-full"></div>
                        <div className="h-6 w-32 bg-base-300 rounded-full"></div>
                        <div className="h-6 w-28 bg-base-300 rounded-full"></div>
                    </div>
                    <div className="space-y-2 mt-4">
                        <div className="h-4 bg-base-300 rounded"></div>
                        <div className="h-4 w-5/6 bg-base-300 rounded"></div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-2">
                <div className="bg-base-200 p-6 rounded-2xl animate-pulse h-48"></div>
            </div>
        </div>
    </div>
);

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
        window.scrollTo(0, 0);
        setIsLoading(true);
        Promise.all([
            axiosSecure.get(`/rooms/${id}`),
            axiosSecure.get(`/reviews/${id}`),
            axiosSecure.get(`/bookings/room/${id}/dates`)
        ])
        .then(([roomRes, reviewsRes, datesRes]) => {
            setRoom(roomRes.data);
            setReviews(reviewsRes.data);
            const dates = datesRes.data.map((dateStr) => new Date(dateStr));
            setBookedDates(dates);
        })
        .catch(error => {
            console.error("Error fetching room data:", error);
            toast.error("Could not load room details. Please try again.");
            navigate('/');
        })
        .finally(() => setIsLoading(false));

        if (user?.email) {
            axiosSecure.get(`/bookings/check?roomId=${id}&email=${user.email}`)
                .then((res) => setUserHasBooked(res.data.hasBooked));
        }
    }, [id, user?.email, navigate]);

    const handleBooking = () => {
    if (!bookingDate) return toast.error("Please select a booking date");
    if (!user) {
        toast.error("Please log in to book a room");
        navigate('/login');
        return;
    }

    const bookingData = {
        roomId: room._id,
        date: format(bookingDate, "yyyy-MM-dd"),
        email: user.email,
        roomName: room.name,
        image: room.image,
        price: room.price,
    };

    toast.promise(
        axiosSecure.post("/bookings", bookingData).then(res => {
            const newBookingId = res.data.insertedId;
            setShowModal(false); 

            
            if (newBookingId) {
                navigate(`/confirmation/${newBookingId}`);
            } else {
                navigate('/my-bookings');
            }
            
            return res;
        }),
        {
            pending: 'Confirming your booking...',
            success: 'Room booked successfully! 🎉',
            error: {
                render({ data }) {
                    return data.response?.status === 409
                        ? "This date is already booked."
                        : "Booking failed. Please try again.";
                }
            }
        }
    );
};

    const renderDayContents = (day, date) => {
        const isBooked = bookedDates.some(bookedDate => isSameDay(date, bookedDate));
        if (isBooked) return <div title="Unavailable">{day}</div>;
        return day;
    };

    if (isLoading) return <RoomDetailsSkeleton />;
    if (!room) return null;

    return (
        <>
            
            <style>{`/* ... (CSS styles remain unchanged) ... */`}</style>

            <div className="bg-base-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-8 md:mb-12"
                    >
                        <img src={room.image} alt={room.name} loading="lazy" className="w-full h-full object-cover" />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        <div className="lg:col-span-3 space-y-10">
                            <div className="card bg-base-100 shadow-xl rounded-2xl">
                                <div className="card-body">
                                    <h1 className="card-title text-3xl lg:text-4xl font-extrabold text-base-content flex items-center gap-3">
                                        <MdOutlineBedroomParent className="text-primary" /> {room.name}
                                    </h1>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <div className="badge badge-lg badge-outline gap-2"><IoLocationSharp /> {room.location}</div>
                                        <div className="badge badge-lg badge-outline gap-2"><FaUserFriends /> Max: {room.maxGuests} Guests</div>
                                        
                                        <div className="badge badge-lg badge-outline gap-2"><StarRating rating={room.rating} /> ({reviews.length} Reviews)</div>
                                    </div>
                                    <p className="mt-4 text-base-content/80 leading-relaxed">{room.description}</p>
                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold text-base-content mb-2">Room Features:</h3>
                                        <ul className="list-disc list-inside text-base-content/80 space-y-1 marker:text-primary">
                                            {room.features?.map((feature, index) => <li key={index}>{feature}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-100 shadow-xl rounded-2xl">
                                <div className="card-body">
                                    <h2 className="card-title text-2xl font-bold">Guest Reviews</h2>
                                    {reviews.length > 0 ? (
                                        <div className="space-y-6 mt-4">
                                            {reviews.map((review) => (
                                                <div key={review._id} className="flex items-start gap-4">
                                                    <div className="avatar">
                                                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                            <img src={review.userPhoto} alt={review.username} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <p className="font-bold text-base-content">{review.username}</p>
                                                            
                                                            <StarRating rating={review.rating} />
                                                        </div>
                                                        <p className="text-sm text-base-content/60 mb-2">{format(new Date(review.createdAt), 'MMMM d, yyyy')}</p>
                                                        <p className="text-base-content/80 italic">"{review.comment}"</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-base-content/60 mt-4">No reviews available for this room yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="card bg-base-100 shadow-2xl rounded-2xl">
                                <div className="card-body">
                                    <p className="text-2xl font-bold text-base-content mb-4">
                                        <span className="text-4xl font-extrabold text-primary">${room.price}</span>
                                        <span className="text-base-content/60 font-medium"> / night</span>
                                    </p>
                                    <p className="text-base-content/70">Ready for an unforgettable stay? Click below to select your date and confirm your booking.</p>
                                    <div className="card-actions mt-4">
                                        {userHasBooked ? (
                                             <div className="alert alert-success shadow-lg">
                                                  <div>
                                                      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                      <span>You have a booking here.See "My Bookings".</span>
                                                  </div>
                                             </div>
                                        ) : (
                                            <button onClick={() => setShowModal(true)} className="btn btn-primary btn-block text-lg">
                                                Book Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-md"
                        >
                            <div className="flex items-center justify-between p-5 border-b border-base-300">
                                <h2 className="text-xl font-bold">Confirm Your Stay</h2>
                                <button onClick={() => setShowModal(false)} className="btn btn-sm btn-circle btn-ghost" aria-label="Close modal">
                                    <FaTimes />
                                </button>
                            </div>
                            
                            <div className="p-6">
                                <h3 className="font-bold text-lg text-primary">{room.name}</h3>
                                <p className="text-sm text-base-content/60 mb-4">{room.description.slice(0, 100)}...</p>
                                <p className="font-semibold text-lg mb-4">Price: <span className="font-extrabold text-primary">${room.price}</span> / night</p>
                                
                                <div className="datepicker-container">
                                    <DatePicker
                                        selected={bookingDate}
                                        onChange={(date) => setBookingDate(date)}
                                        minDate={new Date()}
                                        excludeDates={bookedDates}
                                        renderDayContents={renderDayContents}
                                        inline
                                    />
                                </div>

                                <div className="mt-4 flex items-center gap-2 p-3 bg-blue-500/10 rounded-lg">
                                    <FaInfoCircle className="text-blue-500 text-lg flex-shrink-0" />
                                    <p className="text-xs text-blue-700 dark:text-blue-300">Grayed out dates are already booked.</p>
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-4 p-5 bg-base-200/50 rounded-b-2xl">
                                <button onClick={() => setShowModal(false)} className="btn btn-ghost">Cancel</button>
                                <button onClick={handleBooking} disabled={!bookingDate} className="btn btn-primary">
                                    Confirm Booking
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default RoomDetailsPage;