import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router";
import axiosSecure from "../Axios/Axios";
import { AuthContext } from "../Components/AuthContext/AuthContext";


const RoomDetailsPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [bookingDate, setBookingDate] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext); 

  useEffect(() => {
    axiosSecure.get(`/rooms/${id}`).then((res) => {
      setRoom(res.data);
      setIsBooked(res.data.isBooked);
    });
    axiosSecure.get(`/reviews/${id}`).then((res) => setReviews(res.data));
  }, [id]);

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
      })
      .then(() => {
        toast.success("Room booked successfully");
        setIsBooked(true);
        setShowModal(false);
      })
      .catch(() => toast.error("Booking failed"));
  };

  if (!room) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-64 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{room.name}</h1>
      <p className="mt-2">{room.description}</p>
      <p className="text-lg mt-2 font-medium">Price: ${room.price}</p>
      {!isBooked ? (
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Book Now
        </button>
      ) : (
        <p className="mt-4 text-red-500 font-semibold">Already Booked</p>
      )}

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded w-96 relative">
            <h2 className="text-xl font-bold mb-2">Confirm Booking</h2>
            <p>{room.name}</p>
            <p>Price: ${room.price}</p>
            <DatePicker
              selected={bookingDate}
              onChange={(date) => setBookingDate(date)}
              minDate={new Date()}
              className="border w-full p-2 rounded mt-2"
              placeholderText="Select Booking Date"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={handleBooking}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-3">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border border-gray-200 p-3 rounded shadow-sm"
              >
                <p className="text-sm font-bold">{review.username}</p>
                <p className="text-yellow-600 text-sm">
                  Rating: {review.rating}⭐
                </p>
                <p className="text-sm mt-1">{review.comment}</p>
                <p className="text-xs text-gray-500">
                  {new Date(review.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No reviews available for this room yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default RoomDetailsPage;
