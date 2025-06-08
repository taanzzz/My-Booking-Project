import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";


const locationCoords = {
  "New York, USA": [40.7128, -74.006],
  "Malibu, California": [34.0259, -118.7798],
  "Tokyo, Japan": [35.6762, 139.6503],
  "Zermatt,Switzerland": [46.0207, 7.7491],
  "Ubud, Bali": [-8.5069, 115.2625],
  "Dubai, UAE": [25.2048, 55.2708],
  "Doha, Qatar": [25.276987, 51.520008],
  "Reykjavik, Iceland": [64.1466, -21.9426],
  "Seoul,South Korea": [37.5665, 126.978],
  "Vienna, Austria": [48.2082, 16.3738],
  "Queenstown, New Zealand": [-45.0312, 168.6626],
  "Paris, France": [48.8566, 2.3522],
  "Vancouver, Canada": [49.2827, -123.1207],
  "Bangkok, Thailand": [13.7563, 100.5018],
  "Madrid, Spain": [40.4168, -3.7038]
};

const textVariants = {
  enter: (direction) => ({
    y: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: (direction) => ({
    y: direction < 0 ? 50 : -50,
    opacity: 0,
    transition: { duration: 0.5, ease: "easeIn" },
  }),
};

const HotelSlider = () => {
  const [hotels, setHotels] = useState([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error("Failed to fetch hotels:", err));
  }, []);

  const changeSlide = useCallback(
    (newDirection) => {
      setDirection(newDirection);
      setIndex((prevIndex) => {
        const newIndex =
          newDirection > 0
            ? (prevIndex + 1) % hotels.length
            : (prevIndex - 1 + hotels.length) % hotels.length;
        return newIndex;
      });
    },
    [hotels.length]
  );

  useEffect(() => {
    if (hotels.length === 0) return;
    const interval = setInterval(() => changeSlide(1), 10000);
    return () => clearInterval(interval);
  }, [changeSlide, hotels.length]);

  if (hotels.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  const handleDragEnd = (event, info) => {
    const offsetY = info.offset.y;
    const velocityY = info.velocity.y;

    const swipe = Math.abs(offsetY) * velocityY;

    if (offsetY < -50 || swipe < -10000) {
      changeSlide(1);
    } else if (offsetY > 50 || swipe > 10000) {
      changeSlide(-1);
    }
  };

  const currentHotel = hotels[index];
  const coords = locationCoords[currentHotel.location];

  return (
    <div
      className="w-full h-screen flex items-center justify-center text-white relative overflow-hidden px-2"
      style={{ backgroundColor: currentHotel?.bgColor || "#111827" }}
    >
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 relative z-10">
        
        <div className="md:w-1/2 w-full p-4 min-h-[250px] flex flex-col justify-center relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute md:relative w-full"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
                {currentHotel?.title}
              </h1>
              <p className="mb-3 text-base md:text-lg max-w-md">
                {currentHotel?.description}
              </p>
              <p className="text-sm mb-1">📍 {currentHotel?.location}</p>
              <p className="text-sm">⭐ {currentHotel?.rating}</p>
              <Link
  to={`/rooms`}
  className="mt-2 inline-flex items-center justify-center  gap-2
    bg-gradient-to-r from-teal-500 to-emerald-500 
    hover:from-emerald-600 hover:to-teal-600 
    text-white text-sm font-medium rounded-md px-4 py-2 
    transition duration-300 ease-in-out transform hover:scale-105
    md:px-5 md:py-2.5"
>
  View Details
</Link>

              {coords && (
  <div className="w-full rounded-xl overflow-hidden mt-4 mb-6 z-0 border-[3px] border-white/10 shadow-xl">
    <div className="h-20 sm:h-52 md:h-60 w-full">
      <MapContainer
        center={coords}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full rounded-xl"
        style={{
          filter: "brightness(0.9) contrast(1.1) saturate(1.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}>
          <Popup className="text-xs font-medium">{currentHotel?.title}</Popup>
        </Marker>
      </MapContainer>
    </div>
  </div>
)}

            </motion.div>
          </AnimatePresence>
        </div>

        
        <div className="md:w-1/2 w-full p-4 flex items-center justify-center h-[45vh] md:h-[70vh] relative">
          {[-1, 0, 1].map((pos) => {
            const slideIndex = (index + pos + hotels.length) % hotels.length;
            const hotel = hotels[slideIndex];

            let transform = "translateY(0) scale(1)";
            let zIndex = 1;
            let opacity = 0;

            if (pos === 0) {
              transform = "translateY(0%) scale(1)";
              zIndex = 3;
              opacity = 1;
            } else if (pos === 1) {
              transform = "translateX(-10%) translateY(40%) scale(0.8) rotate(4deg)";
              zIndex = 2;
              opacity = 0.7;
            } else if (pos === -1) {
              transform = "translateX(-10%) translateY(-40%) scale(0.8) rotate(-4deg)";
              zIndex = 2;
              opacity = 0.7;
            }

            return (
              <motion.div
                key={slideIndex}
                className="absolute w-[90%] sm:w-[75%] md:w-[70%] h-[60%] sm:h-[65%] md:h-[70%] cursor-grab"
                animate={{ transform, opacity, zIndex }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag={pos === 0 ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={handleDragEnd}
              >
                <img
                  src={hotel.image}
                  alt={hotel.title}
                  className="w-full h-full object-cover rounded-xl shadow-2xl"
                  draggable={false}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HotelSlider;