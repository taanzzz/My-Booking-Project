import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { AuthContext } from "../Components/AuthContext/AuthContext";
import axiosSecure from "../Axios/Axios";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalType, setModalType] = useState(null); // 'cancel' | 'review' | 'update'
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    axiosSecure.get(`/bookings?email=${user.email}`).then((res) => {
      setBookings(res.data);
    });
  }, [user.email]);

  const closeModal = () => {
    setModalType(null);
    setSelectedBooking(null);
    setRating(5);
    setComment("");
    setNewDate("");
  };

  const handleCancelBooking = async () => {
    await axiosSecure.delete(`/bookings/${selectedBooking._id}`);
    setBookings((prev) =>
      prev.filter((b) => b._id !== selectedBooking._id)
    );
    closeModal();
  };

  const handleReviewSubmit = async () => {
    await axiosSecure.post("/reviews", {
      roomId: selectedBooking.roomId,
      userName: user.displayName,
      rating,
      comment,
    });
    closeModal();
  };

  const handleUpdateDate = async () => {
    await axiosSecure.patch(`/bookings/${selectedBooking._id}`, {
      date: newDate,
    });
    setBookings((prev) =>
      prev.map((b) =>
        b._id === selectedBooking._id ? { ...b, date: newDate } : b
      )
    );
    closeModal();
  };

  const isCancelable = (date) => {
    const bookingDate = new Date(date);
    const today = new Date();
    const diff = (bookingDate - today) / (1000 * 3600 * 24);
    return diff >= 1;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
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
                <td className="p-2 border flex gap-2 justify-center">
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

      {/* Cancel Modal */}
      {modalType === "cancel" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Confirm Cancel?</h3>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="mt-4 flex gap-2 justify-end">
              <button onClick={closeModal} className="px-3 py-1 border rounded">
                No
              </button>
              <button onClick={handleCancelBooking} className="px-3 py-1 bg-red-600 text-white rounded">
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {modalType === "review" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-80">
            <h3 className="text-lg font-bold mb-4">Submit Review</h3>
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
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={closeModal} className="px-3 py-1 border rounded">
                Cancel
              </button>
              <button onClick={handleReviewSubmit} className="px-3 py-1 bg-green-600 text-white rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Date Modal */}
      {modalType === "update" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-80">
            <h3 className="text-lg font-bold mb-4">Update Booking Date</h3>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button onClick={closeModal} className="px-3 py-1 border rounded">
                Cancel
              </button>
              <button onClick={handleUpdateDate} className="px-3 py-1 bg-blue-600 text-white rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
