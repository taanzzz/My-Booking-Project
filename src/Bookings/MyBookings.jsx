import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import axiosSecure from "../Axios/Axios";
import { AuthContext } from "../Components/AuthContext/AuthContext";
import { FaTrashAlt, FaStar, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/bookings?email=${user.email}`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [user?.email]);

  const closeModal = () => {
    setModalType(null);
    setSelectedBooking(null);
    setRating(5);
    setComment("");
    setNewDate("");
  };

  const handleCancelBooking = async () => {
    try {
      await axiosSecure.delete(`/bookings/${selectedBooking._id}`);
      setBookings((prev) => prev.filter((b) => b._id !== selectedBooking._id));
      toast.success("Booking cancelled successfully");
      closeModal();
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  const handleReviewSubmit = async () => {
    if (!comment.trim()) return toast.warn("Comment cannot be empty");
    try {
      await axiosSecure.post("/reviews", {
        roomId: selectedBooking.roomId,
        username: user.displayName,
        userEmail: user.email,
        rating,
        comment,
      });
      toast.success("Review submitted successfully");
      closeModal();
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  const handleUpdateDate = async () => {
    if (!newDate) return toast.warn("Please select a date");
    try {
      await axiosSecure.patch(`/bookings/${selectedBooking._id}`, {
        date: newDate,
      });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBooking._id ? { ...b, date: newDate } : b
        )
      );
      toast.success("Booking date updated");
      closeModal();
    } catch (error) {
      toast.error("Failed to update date");
    }
  };

  const isCancelable = (date) => {
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const diff = (bookingDate - today) / (1000 * 3600 * 24);
  return diff >= 1;
};


  return (
    <div
      className=" bg-gradient-to-tr from-[#f0f9ff] via-[#e0f2fe] to-[#f8fbff] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] mt-8 py-10 px-4"
    >
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-gray-200">
        My Bookings
      </h2>
      {bookings.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1e293b]">
            <thead>
              <tr className="bg-green-100 dark:bg-green-900 text-gray-700 dark:text-green-300">
                <th className="p-3 border border-gray-300 dark:border-gray-700">Image</th>
                <th className="p-3 border border-gray-300 dark:border-gray-700">Room</th>
                <th className="p-3 border border-gray-300 dark:border-gray-700">Date</th>
                <th className="p-3 border border-gray-300 dark:border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b._id}
                  className="text-center border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#334155] transition-colors"
                >
                  <td className="p-3 border border-gray-300 dark:border-gray-700">
  <div className="flex justify-center items-center w-full">
    <img
      src={b.image}
      alt="Room"
      className="h-16 w-40 rounded-lg object-cover shadow-sm mx-auto"
    />
  </div>
</td>


                  <td className="p-3 border border-gray-300 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-200">
                    {b.roomName}
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                    {format(new Date(b.date), "PPP")}
                  </td>
                  <td className="p-3  flex flex-wrap justify-center  gap-3">
                    <button
                      onClick={() => {
                        if (isCancelable(b.date)) {
                          setSelectedBooking(b);
                          setModalType("cancel");
                        } else {
                          toast.warn(
                            "Cancellations must be made at least 1 day in advance"
                          );
                        }
                      }}
                      className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
                      title="Cancel Booking"
                      aria-label="Cancel Booking"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBooking(b);
                        setModalType("review");
                      }}
                      className="bg-yellow-100 text-yellow-600 p-2 rounded-lg hover:bg-yellow-200 transition dark:bg-yellow-900 dark:text-yellow-400 dark:hover:bg-yellow-800"
                      title="Submit Review"
                      aria-label="Submit Review"
                    >
                      <FaStar size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBooking(b);
                        setModalType("update");
                      }}
                      className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                      title="Update Date"
                      aria-label="Update Booking Date"
                    >
                      <FaCalendarAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Cancel Modal */}
      {modalType === "cancel" && (
        <Modal title="Confirm Cancel?" onClose={closeModal}>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Are you sure you want to cancel this booking?
          </p>
          <ModalActions
            onCancel={closeModal}
            onConfirm={handleCancelBooking}
            confirmClass="bg-red-600 hover:bg-red-700"
            confirmText="Yes, Cancel"
          />
        </Modal>
      )}

      {/* Review Modal */}
      {modalType === "review" && (
        <Modal title="Submit Review" onClose={closeModal}>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Name: <span className="font-semibold">{user.displayName}</span>
          </p>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 p-2 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-[#334155] text-black dark:text-white"
            placeholder="Rating (1-5)"
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-2 rounded-md w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-[#334155] text-black dark:text-white"
            placeholder="Write your comment..."
          />
          <ModalActions
            onCancel={closeModal}
            onConfirm={handleReviewSubmit}
            confirmClass="bg-yellow-600 hover:bg-yellow-700"
            confirmText="Submit"
          />
        </Modal>
      )}

      {/* Update Date Modal */}
      {modalType === "update" && (
        <Modal title="Update Booking Date" onClose={closeModal}>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-2 rounded-md w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-[#334155] text-black dark:text-white"
          />
          <ModalActions
            onCancel={closeModal}
            onConfirm={handleUpdateDate}
            confirmClass="bg-blue-600 hover:bg-blue-700"
            confirmText="Update"
          />
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ title, children, onClose }) => (
  <div
    className="fixed inset-0 flex items-center justify-center z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm"
  >
    <div
      className="bg-white dark:bg-[#1e293b] p-7 rounded-2xl shadow-xl max-w-md w-full relative animate-fadeIn"
      style={{
        boxShadow:
          "0 12px 30px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-2xl font-bold transition"
        aria-label="Close modal"
      >
        &times;
      </button>
      <h3 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-200">{title}</h3>
      {children}
    </div>
  </div>
);

const ModalActions = ({ onCancel, onConfirm, confirmText, confirmClass }) => (
  <div className="mt-6 flex justify-end gap-4">
    <button
      onClick={onCancel}
      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#334155] transition"
    >
      Cancel
    </button>
    <button
      onClick={onConfirm}
      className={`px-4 py-2 text-white rounded-lg transition ${confirmClass}`}
    >
      {confirmText}
    </button>
  </div>
);

export default MyBookings;
