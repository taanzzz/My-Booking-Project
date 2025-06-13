import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; 
import { Link } from "react-router";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const locationCoords = {
  "New York, USA": [40.7128, -74.006],
  "Malibu, California": [34.0259, -118.7798],
  "Tokyo, Japan": [35.6762, 139.6503],
  "Zermatt, Switzerland": [46.0207, 7.7491],
  "Ubud, Bali": [-8.5069, 115.2625],
  "Dubai, UAE": [25.2048, 55.2708],
  "Doha, Qatar": [25.276987, 51.520008],
  "Reykjavik, Iceland": [64.1466, -21.9426],
  "Seoul, South Korea": [37.5665, 126.978],
  "Vienna, Austria": [48.2082, 16.3738],
  "Queenstown, New Zealand": [-45.0312, 168.6626],
  "Paris, France": [48.8566, 2.3522],
  "Vancouver, Canada": [49.2827, -123.1207],
  "Bangkok, Thailand": [13.7563, 100.5018],
  "Madrid, Spain": [40.4168, -3.7038],
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  exit: { opacity: 0, y: -20, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

const HotelSlider = () => {
  const [hotels, setHotels] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error("Failed to fetch hotels:", err));
  }, []);

  const nextSlide = useCallback(() => {
    if (hotels.length > 0) {
      setIndex((prev) => (prev + 1) % hotels.length);
    }
  }, [hotels.length]);

  const prevSlide = useCallback(() => {
    if (hotels.length > 0) {
      setIndex((prev) => (prev - 1 + hotels.length) % hotels.length);
    }
  }, [hotels.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide]);
  
  
  const handleDragEnd = (event, { offset, velocity }) => {
    const swipeThreshold = 50; 
    const swipeVelocityThreshold = 500; 

    if (offset.x < -swipeThreshold || velocity.x < -swipeVelocityThreshold) {
      nextSlide();
    } else if (offset.x > swipeThreshold || velocity.x > swipeVelocityThreshold) {
      prevSlide();
    }
  };


  const currentHotel = hotels[index];
  const coords = currentHotel ? locationCoords[currentHotel.location] : null;

  return (
    <div
      className="relative w-full min-h-screen px-4 py-10 text-white transition-colors duration-1000 ease-in-out flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 overflow-hidden"
      style={{ backgroundColor: currentHotel?.bgColor || "#1f2937" }}
    >
      
      <div className="md:w-1/2 w-full relative min-h-[450px] flex items-center z-10">
        <AnimatePresence mode="wait">
          {currentHotel && (
            <motion.div
              key={index}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute w-full p-4 sm:p-6 md:p-8 rounded-lg"
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-serif">
                {currentHotel.title}
              </h2>
              <motion.p
                className="text-base md:text-lg text-white/90 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
              >
                {currentHotel.description}
              </motion.p>
              <motion.p
                className="text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
              >
                📍 {currentHotel.location} | ⭐ {currentHotel.rating}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.6 } }}
              >
                <Link
                  to="/rooms"
                  className="mt-5 inline-block px-8 py-3 bg-white text-black rounded-lg font-semibold shadow-lg hover:scale-105 transform transition-transform duration-300"
                >
                  View Details
                </Link>
              </motion.div>
              {coords && (
                <motion.div
                  className="mt-6 rounded-xl overflow-hidden border border-white/10 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
                >
                  <MapContainer
                    center={coords}
                    zoom={12}
                    scrollWheelZoom={false}
                    className="h-48 w-full"
                  >
                    
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={coords}>
                      <Popup>{currentHotel.title}</Popup>
                    </Marker>
                  </MapContainer>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      
      <motion.div
        className="md:w-1/2 w-full h-[50vh] md:h-[70vh] relative flex flex-col items-center justify-center cursor-grab"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      >
        <div className="relative w-[70%] sm:w-[60%] md:w-[80%] h-full flex flex-col items-center justify-center">
          <AnimatePresence>
            {hotels.map((hotel, i) => {
              const position = i - index;
              const isCurrent = position === 0;
              const isNext = position === 1 || position === -(hotels.length - 1);
              const isPrev = position === -1 || position === hotels.length - 1;
              
              let scale = 0.8;
              let opacity = 0;
              let translateY = 0;
              let zIndex = 0;

              if (isCurrent) {
                scale = 1;
                opacity = 1;
                translateY = 0;
                zIndex = 3;
              } else if (isNext) {
                scale = 0.9;
                opacity = 0.5;
                translateY = 100;
                zIndex = 2;
              } else if (isPrev) {
                scale = 0.9;
                opacity = 0.5;
                translateY = -100;
                zIndex = 2;
              }

              return (
                <motion.img
                  key={hotel.title + i}
                  src={hotel.image}
                  alt={hotel.title}
                  className="absolute w-full h-[75%] object-cover rounded-2xl shadow-2xl pointer-events-none"
                  animate={{ scale, opacity, y: translateY, zIndex }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default HotelSlider;