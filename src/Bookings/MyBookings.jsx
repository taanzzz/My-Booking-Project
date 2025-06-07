import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import axiosSecure from "../Axios/Axios";
import { AuthContext } from "../Components/AuthContext/AuthContext";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalType, setModalType] = useState(null); // 'cancel' | 'review' | 'update'
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [newDate, setNewDate] = useState("");

  // Fetch bookings
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/bookings?email=${user.email}`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [user?.email]);

  // Helper to close any modal
  const closeModal = () => {
    setModalType(null);
    setSelectedBooking(null);
    setRating(5);
    setComment("");
    setNewDate("");
  };

  // Cancel Booking
  const handleCancelBooking = async () => {
    try {
      await axiosSecure.delete(`/bookings/${selectedBooking._id}`);
      setBookings((prev) => prev.filter((b) => b._id !== selectedBooking._id));
      closeModal();
    } catch (error) {
      console.error("Cancel failed:", error);
    }
  };

  // Submit Review
  const handleReviewSubmit = async () => {
    if (!comment.trim()) return alert("Comment cannot be empty.");
    try {
      await axiosSecure.post("/reviews", {
  roomId: selectedBooking.roomId,
  username: user.displayName,
  userEmail: user.email,
  rating,
  comment,
  // timestamp: new Date().toISOString(),
});

      closeModal();
    } catch (error) {
      console.error("Review submission failed:", error);
    }
  };

  // Update Booking Date
  const handleUpdateDate = async () => {
    if (!newDate) return alert("Please select a date.");
    try {
      await axiosSecure.patch(`/bookings/${selectedBooking._id}`, {
        date: newDate,
      });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBooking._id ? { ...b, date: newDate } : b
        )
      );
      closeModal();
    } catch (error) {
      console.error("Date update failed:", error);
    }
  };

  // Check if booking is cancelable
  const isCancelable = (date) => {
    const bookingDate = new Date(date);
    const today = new Date();
    const diff = (bookingDate - today) / (1000 * 3600 * 24);
    return diff >= 1;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-green-100">
                <th className="p-2 border">Room</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="text-center border-t">
                  <td className="p-2 border">{b.roomName}</td>
                  <td className="p-2 border">{format(new Date(b.date), "PPP")}</td>
                  <td className="p-2 border flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => {
                        if (isCancelable(b.date)) {
                          setSelectedBooking(b);
                          setModalType("cancel");
                        } else {
                          alert("You can only cancel 1 day before the booking date.");
                        }
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBooking(b);
                        setModalType("review");
                      }}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBooking(b);
                        setModalType("update");
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Update Date
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
          <p>Are you sure you want to cancel this booking?</p>
          <ModalActions
            onCancel={closeModal}
            onConfirm={handleCancelBooking}
            confirmText="Yes, Cancel"
            confirmClass="bg-red-600"
          />
        </Modal>
      )}

      {/* Review Modal */}
      {modalType === "review" && (
        <Modal title="Submit Review" onClose={closeModal}>
          <p className="text-sm text-gray-700 mb-2">Name: {user.displayName}</p>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-2 rounded w-full mb-2"
            placeholder="Rating (1-5)"
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Write your comment..."
          />
          <ModalActions
            onCancel={closeModal}
            onConfirm={handleReviewSubmit}
            confirmText="Submit"
            confirmClass="bg-green-600"
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
            className="border p-2 rounded w-full mb-4"
          />
          <ModalActions
            onCancel={closeModal}
            onConfirm={handleUpdateDate}
            confirmText="Update"
            confirmClass="bg-blue-600"
          />
        </Modal>
      )}
    </div>
  );
};

// Reusable Modal Component
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow w-80">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      {children}
    </div>
  </div>
);

// Reusable Actions
const ModalActions = ({ onCancel, onConfirm, confirmText, confirmClass }) => (
  <div className="mt-4 flex justify-end gap-2">
    <button onClick={onCancel} className="px-3 py-1 border rounded">
      Cancel
    </button>
    <button onClick={onConfirm} className={`px-3 py-1 text-white rounded ${confirmClass}`}>
      {confirmText}
    </button>
  </div>
);

export default MyBookings;
