import React, { useContext, useEffect, useState, useRef } from "react";
import { format, differenceInCalendarDays } from "date-fns"; 
import axiosSecure from "../Axios/Axios";
import { AuthContext } from "../Components/AuthContext/AuthContext";
import { FaTrashAlt, FaStar, FaCalendarAlt, FaThLarge, FaList, FaSuitcaseRolling } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router"; 


const EmptyState = () => (
    <div className="text-center py-20 px-4">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-base-200 shadow-lg">
            <FaSuitcaseRolling className="text-4xl text-primary" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-base-content">No Bookings Yet</h3>
        <p className="mt-2 text-base text-base-content/70">Looks like you haven't booked any rooms with us.</p>
        <div className="mt-8">
            <Link
                to={`/rooms`}
                className="btn btn-primary btn-wide shadow-lg hover:shadow-xl transition-shadow duration-300">
                Explore Rooms
            </Link>
        </div>
    </div>
);


const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
        <span className="loading loading-infinity w-24 text-primary"></span>
        <p className="text-lg font-medium text-base-content/80 animate-pulse">Loading Your Bookings...</p>
    </div>
);


const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [newDate, setNewDate] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState("card");

    const modalRef = useRef(null);

    useEffect(() => {
        if (user?.email) {
            setIsLoading(true);
            axiosSecure
                .get(`/bookings?email=${user.email}`)
                .then((res) => {
                    setBookings(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching bookings:", err);
                    setIsLoading(false);
                });
        }
    }, [user?.email]);

    const openModal = (booking, type) => {
        setSelectedBooking({ ...booking, modalType: type });
        setNewDate(booking.date ? format(new Date(booking.date), "yyyy-MM-dd") : "");
        modalRef.current?.showModal();
    };

    const closeModal = () => {
        modalRef.current?.close();

        setTimeout(() => {
            setSelectedBooking(null);
            setRating(5);
            setComment("");
            setNewDate("");
        }, 300);
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
                userPhoto: user.photoURL,
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
        
        const diff = differenceInCalendarDays(bookingDate, today);
        
        return diff > 1;
    };

    const renderModalContent = () => {
        if (!selectedBooking) return null;

        switch (selectedBooking.modalType) {
            case "cancel":
                return (
                    <>
                        <h3 className="font-bold text-2xl text-base-content">Confirm Cancellation</h3>
                        <p className="py-4 text-base-content/80">Are you sure you want to cancel your booking for <span className="font-semibold">{selectedBooking.roomName}</span>? This action cannot be undone.</p>
                        <div className="modal-action">
                            <button onClick={closeModal} className="btn btn-ghost">Dismiss</button>
                            <button onClick={handleCancelBooking} className="btn btn-error text-white">Yes, Cancel</button>
                        </div>
                    </>
                );
            case "review":
                return (
                    <>
                        <h3 className="font-bold text-2xl text-base-content">Submit a Review</h3>
                        <p className="text-sm text-base-content/70 mb-4">
                            Reviewing as: <span className="font-semibold">{user.displayName}</span>
                        </p>
                        <div className="form-control gap-4">
                            <div className="rating rating-lg rating-half mb-2">
                                {[...Array(10)].map((_, i) => (
                                    <input key={i} type="radio" name="rating-10"
                                        className={`bg-yellow-400 mask mask-star-2 ${i % 2 === 0 ? 'mask-half-1' : 'mask-half-2'}`}
                                        checked={rating === (i + 1) / 2}
                                        onChange={() => setRating((i + 1) / 2)}
                                    />
                                ))}
                            </div>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="textarea textarea-bordered h-28 w-full text-base"
                                placeholder="How was your stay? What did you like or dislike?"
                            />
                        </div>
                        <div className="modal-action">
                            <button onClick={closeModal} className="btn btn-ghost">Cancel</button>
                            <button onClick={handleReviewSubmit} className="btn btn-primary">Submit Review</button>
                        </div>
                    </>
                );
            case "update":
                return (
                    <>
                        <h3 className="font-bold text-2xl text-base-content">Update Booking Date</h3>
                        <p className="py-4 text-base-content/80">Select a new date for your booking at <span className="font-semibold">{selectedBooking.roomName}</span>.</p>
                        <div className="form-control w-full">
                            <input
                                type="date"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                                className="input input-bordered w-full text-base"
                                min={format(new Date(), "yyyy-MM-dd")}
                            />
                        </div>
                        <div className="modal-action">
                            <button onClick={closeModal} className="btn btn-ghost">Cancel</button>
                            <button onClick={handleUpdateDate} className="btn btn-primary">Update Date</button>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };


    return (
        <div className="bg-base-200/50 min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-4xl font-bold text-base-content">My Bookings</h2>
                    {bookings.length > 0 && (
                        <div className="join">
                            <button className={`btn join-item ${view === 'card' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setView('card')}><FaThLarge /></button>
                            <button className={`btn join-item ${view === 'table' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setView('table')}><FaList /></button>
                        </div>
                    )}
                </div>

                {isLoading ? (
                    <LoadingSpinner />
                ) : bookings.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div>
                        {view === 'card' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {bookings.map((b) => (
                                    <div key={b._id} className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                        <figure><img src={b.image} alt={b.roomName} loading="lazy" className="h-56 w-full object-cover" /></figure>
                                        <div className="card-body p-5">
                                            <h3 className="card-title text-xl font-semibold text-base-content">{b.roomName}</h3>
                                            <p className="text-base-content/70">Booking Date: <span className="font-medium text-base-content">{format(new Date(b.date), "PPP")}</span></p>
                                            <div className="card-actions justify-end mt-4 gap-2">
                                                <button onClick={() => openModal(b, "update")} className="btn btn-circle btn-outline btn-info" title="Update Date"><FaCalendarAlt /></button>
                                                <button onClick={() => openModal(b, "review")} className="btn btn-circle btn-outline btn-warning" title="Submit Review"><FaStar /></button>
                                                
                                                <button onClick={() => {
                                                    if (isCancelable(b.date)) {
                                                        openModal(b, 'cancel');
                                                    } else {
                                                        toast.warn("Cancellation is only allowed up to 2 days before the booking date.");
                                                    }
                                                }} className="btn btn-circle btn-outline btn-error" title="Cancel Booking">
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-xl">
                                <table className="table table-lg">
                                    <thead className="bg-base-200">
                                        <tr>
                                            <th className="rounded-tl-2xl">Room</th>
                                            <th>Booking Date</th>
                                            <th className="text-right rounded-tr-2xl">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((b) => (
                                            <tr key={b._id} className="hover:bg-base-200 transition-colors duration-200">
                                                <td>
                                                    <div className="flex items-center gap-4">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-16 h-16">
                                                                <img src={b.image} alt={b.roomName} loading="lazy" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-base-content">{b.roomName}</div>
                                                            <div className="text-sm opacity-60">${b.price} per night</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="font-medium text-base-content/90">{format(new Date(b.date), "PPP")}</td>
                                                <td>
                                                    <div className="flex flex-wrap justify-start md:justify-end items-center gap-2">
                                                        <button onClick={() => openModal(b, "update")} className="btn btn-sm btn-ghost btn-circle" title="Update Date"><FaCalendarAlt className="text-info" /></button>
                                                        <button onClick={() => openModal(b, "review")} className="btn btn-sm btn-ghost btn-circle" title="Submit Review"><FaStar className="text-warning" /></button>
                                                        
                                                        <button onClick={() => {
                                                            if (isCancelable(b.date)) {
                                                                openModal(b, 'cancel');
                                                            } else {
                                                                toast.warn("Cancellation is only allowed up to 2 days before the booking date.");
                                                            }
                                                        }} className="btn btn-sm btn-ghost btn-circle" title="Cancel Booking">
                                                            <FaTrashAlt className="text-error" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <dialog id="my-modal" ref={modalRef} className="modal modal-middle">
                <div className="modal-box backdrop-blur-md bg-base-100/80 shadow-2xl">
                    {renderModalContent()}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeModal}>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default MyBookings;