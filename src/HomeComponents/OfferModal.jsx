import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Components/AuthContext/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import { Link } from "react-router";

const allOffers = [
  {
    type: "Couples",
    title: "Romantic Getaway Offer",
    desc: "Enjoy 30% off for couples on your weekend stays.",
    image: "https://i.ibb.co/cSRJQYjz/20250611-061356-1.jpg",
  },
  {
    type: "Single",
    title: "Solo Traveler Deal",
    desc: "Flat 20% discount for solo adventurers!",
    image: "https://i.ibb.co/RGMmxJRN/20250611-061410-1.jpg",
  },
  {
    type: "Business",
    title: "Corporate Booking Bonus",
    desc: "Get free upgrades and meeting space access.",
    image: "https://i.ibb.co/jvwKTCxf/20250611-061445-1.jpg",
  },
  {
    type: "Family",
    title: "Family Fun Package",
    desc: "Stay 3 nights, pay for 2. Kids stay free!",
    image: "https://i.ibb.co/ns1H1NYQ/20250611-061520-1.jpg",
  },
  {
    type: "Adventure",
    title: "Adventure Time",
    desc: "20% off for mountain and jungle packages.",
    image: "https://i.ibb.co/TB0598JG/20250611-061557-1.jpg",
  },
  {
    type: "Luxury",
    title: "Luxury Escape",
    desc: "Book a suite and get a free spa session.",
    image: "https://i.ibb.co/spvnjWvB/20250611-061624-1.jpg",
  },
  {
    type: "Student",
    title: "Student Saver Deal",
    desc: "Special prices for students with ID.",
    image: "https://i.ibb.co/KcjTNb0G/20250611-062811-1.jpg",
  },
  {
    type: "Weekend",
    title: "Weekend Flash Sale",
    desc: "Book within 24 hours to grab 40% off!",
    image: "https://i.ibb.co/XZ140bGr/20250611-061717-1.jpg",
  },
  {
    type: "Spa",
    title: "Relax & Unwind",
    desc: "Complimentary spa services with 2+ nights stay.",
    image: "https://i.ibb.co/pj6wbxsq/20250611-061732-1.jpg",
  },
  {
    type: "Nature",
    title: "Eco Nature Deal",
    desc: "Enjoy eco-resorts at 25% off.",
    image: "https://i.ibb.co/Fkzh3cnp/20250611-061757-1.jpg",
  },
  {
    type: "Desert",
    title: "Desert Safari Bundle",
    desc: "Get camel rides and tent stays at 30% off.",
    image: "https://i.ibb.co/kgsK2g7R/20250611-061820-1.jpg",
  },
  {
    type: "Beach",
    title: "Beachside Bliss",
    desc: "Free drinks and seafood on beach bookings.",
    image: "https://i.ibb.co/cSf9gLrv/20250611-061835-1.jpg",
  },
  {
    type: "Festival",
    title: "Festival Frenzy",
    desc: "Book for festivals & get 15% cashback.",
    image: "https://i.ibb.co/KRt1FWz/20250611-061854-1.jpg",
  },
  {
    type: "LongStay",
    title: "Long Stay Bonus",
    desc: "Stay 7+ days & get 3 meals free daily.",
    image: "https://i.ibb.co/nM3cqfNH/20250611-061921-1.jpg",
  },
  {
    type: "EarlyBird",
    title: "Early Bird Discount",
    desc: "Book 30 days ahead to save 25%.",
    image: "https://i.ibb.co/ksqVN3kt/20250611-061935-1.jpg",
  },
  {
    type: "Honeymoon",
    title: "Honeymoon Special",
    desc: "Book a honeymoon suite and get wine free.",
    image: "https://i.ibb.co/0RRdKstY/20250611-062009-1.jpg",
  },
  {
    type: "PetFriendly",
    title: "Bring Your Pet",
    desc: "Pets welcome! Book now and get treats free.",
    image: "https://i.ibb.co/gbwhYW4r/20250611-062021-1.jpg",
  },
  {
    type: "Winter",
    title: "Winter Wonderland",
    desc: "Snow season discounts up to 35%.",
    image: "https://i.ibb.co/hFJRq3c6/20250611-062104-1.jpg",
  },
  {
    type: "CityTour",
    title: "City Tour Combo",
    desc: "Includes free city tour for bookings 2+ nights.",
    image: "https://i.ibb.co/bMb5D3gw/20250611-062126.jpg",
  },
  {
    type: "FlashDeal",
    title: "Midnight Flash Deal",
    desc: "Massive 50% off from 12–2 AM bookings.",
    image: "https://i.ibb.co/QWw7y3k/20250611-062257-1.jpg",
  },
];

const getRandomOffers = () => {
    const shuffled = [...allOffers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
};

const OfferModal = () => {
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [randomOffers, setRandomOffers] = useState([]);

    useEffect(() => {
        if (user && !sessionStorage.getItem('offerModalShown')) {
            setRandomOffers(getRandomOffers());
            setShowModal(true);
            sessionStorage.setItem('offerModalShown', 'true');
            
            setTimeout(() => {
                
                confetti({
                    particleCount: 180,
                    spread: 120,
                    origin: { y: 0.4 },
                    zIndex: 1200 
                });
            }, 600);
        }
    }, [user]);

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    
                    className="fixed inset-0 bg-black/50 backdrop-blur-md z-[1000] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="offer-modal-title"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-base-100 w-full max-w-4xl rounded-2xl shadow-2xl max-h-[90vh] flex flex-col"
                    >
                        <div className="p-4 sm:p-6 flex-shrink-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 id="offer-modal-title" className="text-2xl sm:text-3xl font-extrabold text-base-content">
                                        🎁 Deals Just For You!
                                    </h2>
                                    <p className="text-base-content/70 mt-1 text-sm sm:text-base">
                                        Welcome, {user?.displayName}! Here are some special offers.
                                    </p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="btn btn-sm btn-circle btn-ghost"
                                    aria-label="Close modal"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-y-auto p-4 sm:p-6 pt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {randomOffers.map((offer, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="card image-full shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                    >
                                        <figure className="h-48 md:h-64">
                                            <img
                                                src={offer.image}
                                                alt={offer.title}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </figure>
                                        <div className="card-body justify-between p-4 sm:p-5">
                                            <div>
                                                <div className="badge badge-primary font-semibold">{offer.type}</div>
                                                <h3 className="card-title text-xl sm:text-2xl font-bold text-white mt-2">
                                                    {offer.title}
                                                </h3>
                                                <p className="text-white/90 text-sm sm:text-base">{offer.desc}</p>
                                            </div>
                                            <div className="card-actions justify-end">
                                                <Link
                                              to="/rooms"
                                                   className="btn btn-primary btn-sm btn-outline border-white text-white hover:bg-white hover:text-primary inline-flex items-center gap-1"
                                               >
                                              View Offer <FaArrowRight />
                                               </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OfferModal;