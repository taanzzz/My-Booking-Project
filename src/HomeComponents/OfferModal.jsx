import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Components/AuthContext/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const allOffers = [
  {
    type: "Couples",
    title: "Romantic Getaway Offer",
    desc: "Enjoy 30% off for couples on your weekend stays.",
    image: "https://i.ibb.co/FbMmJ2QJ/20250611-061356.jpg",
  },
  {
    type: "Single",
    title: "Solo Traveler Deal",
    desc: "Flat 20% discount for solo adventurers!",
    image: "https://i.ibb.co/kgrxbW4S/20250611-061410.jpg",
  },
  {
    type: "Business",
    title: "Corporate Booking Bonus",
    desc: "Get free upgrades and meeting space access.",
    image: "https://i.ibb.co/JRw03vXG/20250611-061445.jpg",
  },
  {
    type: "Family",
    title: "Family Fun Package",
    desc: "Stay 3 nights, pay for 2. Kids stay free!",
    image: "https://i.ibb.co/LzJz6mQX/20250611-061520.jpg",
  },
  {
    type: "Adventure",
    title: "Adventure Time",
    desc: "20% off for mountain and jungle packages.",
    image: "https://i.ibb.co/5XnHy3cR/20250611-061557.jpg",
  },
  {
    type: "Luxury",
    title: "Luxury Escape",
    desc: "Book a suite and get a free spa session.",
    image: "https://i.ibb.co/27ffQpWz/20250611-061624.jpg",
  },
  {
    type: "Student",
    title: "Student Saver Deal",
    desc: "Special prices for students with ID.",
    image: "https://i.ibb.co/KQ4kdn6/20250611-062811.jpg",
  },
  {
    type: "Weekend",
    title: "Weekend Flash Sale",
    desc: "Book within 24 hours to grab 40% off!",
    image: "https://i.ibb.co/1GcdDVBZ/20250611-061717.jpg",
  },
  {
    type: "Spa",
    title: "Relax & Unwind",
    desc: "Complimentary spa services with 2+ nights stay.",
    image: "https://i.ibb.co/SXSwj24J/20250611-061732.jpg",
  },
  {
    type: "Nature",
    title: "Eco Nature Deal",
    desc: "Enjoy eco-resorts at 25% off.",
    image: "https://i.ibb.co/TqdjJ1cd/20250611-061757.jpg",
  },
  {
    type: "Desert",
    title: "Desert Safari Bundle",
    desc: "Get camel rides and tent stays at 30% off.",
    image: "https://i.ibb.co/9Hz6S5jr/20250611-061820.jpg",
  },
  {
    type: "Beach",
    title: "Beachside Bliss",
    desc: "Free drinks and seafood on beach bookings.",
    image: "https://i.ibb.co/DHCFDqMp/20250611-061835.jpg",
  },
  {
    type: "Festival",
    title: "Festival Frenzy",
    desc: "Book for festivals & get 15% cashback.",
    image: "https://i.ibb.co/dJpY7h88/20250611-061854.jpg",
  },
  {
    type: "LongStay",
    title: "Long Stay Bonus",
    desc: "Stay 7+ days & get 3 meals free daily.",
    image: "https://i.ibb.co/Y4hnkZbC/20250611-061921.jpg",
  },
  {
    type: "EarlyBird",
    title: "Early Bird Discount",
    desc: "Book 30 days ahead to save 25%.",
    image: "https://i.ibb.co/rKwxzJCj/20250611-061935.jpg",
  },
  {
    type: "Honeymoon",
    title: "Honeymoon Special",
    desc: "Book a honeymoon suite and get wine free.",
    image: "https://i.ibb.co/8DbLkmvv/20250611-062009.jpg",
  },
  {
    type: "PetFriendly",
    title: "Bring Your Pet",
    desc: "Pets welcome! Book now and get treats free.",
    image: "https://i.ibb.co/tpCqJ0wy/20250611-062021.jpg",
  },
  {
    type: "Winter",
    title: "Winter Wonderland",
    desc: "Snow season discounts up to 35%.",
    image: "https://i.ibb.co/C3NxNg4M/20250611-062104.jpg",
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
    image: "https://i.ibb.co/qLrxLGsM/20250611-062257.jpg",
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
        });
      }, 600);
    }
  }, [user]); 

  const closeModal = () => {
    setShowModal(false);
  };

  const typeEmojis = {
    Couples: "💑",
    Single: "🧍‍♂️",
    Business: "💼",
    Family: "👨‍👩‍👧‍👦",
    Adventure: "🧗‍♂️",
    Luxury: "🛎️",
    Student: "🎓",
    Weekend: "📅",
    Spa: "💆‍♀️",
    Nature: "🌿",
    Desert: "🏜️",
    Beach: "🏖️",
    Festival: "🎉",
    LongStay: "🛌",
    EarlyBird: "⏰",
    Honeymoon: "🍷",
    PetFriendly: "🐶",
    Winter: "❄️",
    CityTour: "🏙️",
    FlashDeal: "⚡",
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-opacity-70 z-50 flex items-center justify-center px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-label="Special Offers Modal"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[90vh] relative"
          >
            <button
              onClick={closeModal} 
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-600 hover:text-red-500 transition text-xl sm:text-2xl font-bold z-50"
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-700">
              🎁 Best Offers Just for You!
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-5">
              {randomOffers.map((offer, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 bg-gray-50"
                >
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-40 md:h-80 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1">
                      {typeEmojis[offer.type]} <span className="text-blue-600 font-extrabold text-sm sm:text-2xl">{offer.title}</span>
                    </h3>
                    <p className="text-gray-700 font-extrabold text-sm sm:text-base">
                      {offer.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfferModal;