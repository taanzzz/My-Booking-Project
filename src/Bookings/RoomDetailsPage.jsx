import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosSecure from "../Axios/Axios";
import { AuthContext } from "../Components/AuthContext/AuthContext";
import { MdOutlineBedroomParent } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useParams } from "react-router";


const RoomDetailsPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [bookingDate, setBookingDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);

  
  const [userHasBooked, setUserHasBooked] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    
    axiosSecure.get(`/rooms/${id}`).then((res) => {
      setRoom(res.data);
    });

   
    axiosSecure.get(`/reviews/${id}`).then((res) => setReviews(res.data));

    
    axiosSecure.get(`/bookings/room/${id}/dates`).then((res) => {
      
      const dates = res.data.map((dateStr) => new Date(dateStr));
      setBookedDates(dates);
    });

    
    if (user?.email) {
      axiosSecure
        .get(`/bookings/check?roomId=${id}&email=${user.email}`)
        .then((res) => {
          setUserHasBooked(res.data.hasBooked);
        });
    }
  }, [id, user?.email]); 

  const handleBooking = () => {
    if (!bookingDate) return toast.error("Please select a booking date");
    if (!user?.email) return toast.error("Please log in to book a room");

    axiosSecure
      .post("/bookings", {
        roomId: room._id,
        date: format(bookingDate, "yyyy-MM-dd"),
        email: user.email,
        roomName: room.name,
        image: room.image,
        price: room.price,
      })
      .then(() => {
        toast.success("Room booked successfully");
        setUserHasBooked(true); 
        setShowModal(false);
        
        setBookedDates((prevDates) => [...prevDates, bookingDate]);
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          toast.error("This room is already booked on the selected date.");
        } else {
          toast.error("Booking failed. Please try again.");
        }
      });
  };

  if (!room) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f0f9ff] via-[#e0f2fe] to-[#f8fbff] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] py-10">
      <div className="p-4 max-w-4xl mx-auto space-y-10">
        
        <div className="rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-emerald-100 to-green-200 dark:from-emerald-900 dark:to-green-800">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-120 object-cover"
          />
        </div>

        
        <div className="p-6 rounded-xl shadow-xl bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-800">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <MdOutlineBedroomParent className="text-green-600" /> {room.name}
          </h1>

          <div className="flex flex-wrap gap-3 mt-3">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              💵 ${room.price} /night
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <IoLocationSharp /> {room.location}
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <FaUserFriends /> Max Guests: {room.maxGuests}
            </span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              ⭐ {room.rating} Rating
            </span>
            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              🏷️ Type: {room.roomType}
            </span>
          </div>

          <p className="mt-4 text-gray-700 dark:text-gray-200 leading-relaxed text-justify">
            {room.description}
          </p>

          
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Features:
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1">
              {room.features?.map((feature, index) => (
                <li key={index}>✅ {feature}</li>
              ))}
            </ul>
          </div>

          
          {!userHasBooked ? (
            <button
              className="mt-6 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300"
              onClick={() => setShowModal(true)}
            >
              🛏️ Book Now
            </button>
          ) : (
            <p className="mt-4 text-red-500 font-semibold">
              You have already booked this room.
            </p>
          )}
        </div>

        {/* Booking Modal */}
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/30 z-50">
            <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-xl w-96 relative">
              <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                Confirm Booking
              </h2>
              <p className="text-gray-700 dark:text-gray-200">{room.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Price: ${room.price}
              </p>
              <DatePicker
                selected={bookingDate}
                onChange={(date) => setBookingDate(date)}
                minDate={new Date()}
                
                excludeDates={bookedDates}
                className="border w-full p-2 rounded mt-2"
                placeholderText="Select Booking Date"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleBooking}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="p-6 rounded-xl shadow-xl bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900 dark:to-orange-900">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Reviews
          </h2>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm bg-white dark:bg-gray-800"
                >
                  <p className="text-base font-semibold text-gray-800 dark:text-white">
                    {review.username}{" "}
                    <span className="text-xs text-gray-500 dark:text-gray-300">
                      ({review.userEmail})
                    </span>
                  </p>
                  <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                    Rating: {review.rating}⭐
                  </p>
                  <p className="text-sm mt-1 text-gray-700 dark:text-gray-200">
                    {review.comment}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-400">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              No reviews available for this room yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;