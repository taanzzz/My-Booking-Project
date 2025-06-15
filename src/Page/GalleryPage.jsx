import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const galleryImages = [
    // (Category: 'Hotel')
    { id: 1, category: 'Hotel', src: 'https://i.ibb.co/bgfYRSyC/20250608-051904.jpg', alt: 'The Skyline Luxe: An ultra-modern luxury skyscraper hotel.' },
    { id: 2, category: 'Hotel', src: 'https://i.ibb.co/tw7m7FHh/20250608-052500.jpg', alt: 'Coastal Breeze Retreat: A minimalist beachfront resort.' },
    { id: 3, category: 'Hotel', src: 'https://i.ibb.co/CKm6JbCw/20250608-052423.jpg', alt: 'Neo Tokyo Suites: Futuristic boutique hotel with vibrant neon lights.' },
    { id: 4, category: 'Hotel', src: 'https://i.ibb.co/5hf4wY3B/20250608-052308.jpg', alt: 'Alpine Glow Chalet: Modern mountain retreat with scenic views.' },
    { id: 5, category: 'Hotel', src: 'https://i.ibb.co/vxVv4bM4/20250608-051314.jpg', alt: 'Tropical Nest Eco Resort: A jungle-surrounded retreat.' },
    { id: 6, category: 'Hotel', src: 'https://i.ibb.co/dsRJTPXW/20250608-052029.jpg', alt: 'Skyline Lounge Inn: An urban oasis with a rooftop pool.' },
    { id: 7, category: 'Hotel', src: 'https://i.ibb.co/twpBMp3Y/20250608-052500.jpg', alt: 'Desert Mirage Hotel: Luxury hotel inspired by desert sands.' },
    { id: 8, category: 'Hotel', src: 'https://i.ibb.co/jPmTN2z0/20250608-051738.jpg', alt: 'Nordic Light Lodge: A serene winter escape with Nordic minimalism.' },
    { id: 9, category: 'Hotel', src: 'https://i.ibb.co/8LpNgbYm/20250608-051548.jpg', alt: 'Rain & Shine Business Hotel: Cinematic business hotel.' },
    { id: 10, category: 'Hotel', src: 'https://i.ibb.co/Y70Y4LrS/20250608-051519.jpg', alt: 'The Regal Heritage: A fusion of historical architecture with modern luxury.' },
    { id: 11, category: 'Hotel', src: 'https://i.ibb.co/N6BKjn0r/20250608-051429.jpg', alt: 'Lakeview Zen Retreat: A lakeside paradise with reflective waters.' },
    { id: 12, category: 'Hotel', src: 'https://i.ibb.co/DDVK4CcB/20250608-052757.jpg', alt: 'The Crown Boulevard: Prestigious hotel with cinematic evening lighting.' },
    { id: 13, category: 'Hotel', src: 'https://i.ibb.co/3mGy5XzD/20250608-051314.jpg', alt: 'Green Horizon Hotel: An eco-conscious hotel with modern design.' },
    { id: 14, category: 'Hotel', src: 'https://i.ibb.co/v6mxgxkj/20250608-051158.jpg', alt: 'Golden Hour Heights: Stylish high-rise hotel glowing with golden trim.' },
    { id: 15, category: 'Hotel', src: 'https://i.ibb.co/99v6V1Z8/20250608-051014.jpg', alt: 'The Fountain Grand: Majestic hotel with a modern fountain.' },

    //  (Category: 'Events')
    { id: 16, category: 'Events', src: 'https://i.ibb.co/FbMmJ2QJ/20250611-061356.jpg', alt: 'Romantic Getaway Offer for Couples' },
    { id: 17, category: 'Events', src: 'https://i.ibb.co/kgrxbW4S/20250611-061410.jpg', alt: 'Solo Traveler Deal' },
    { id: 18, category: 'Events', src: 'https://i.ibb.co/JRw03vXG/20250611-061445.jpg', alt: 'Corporate Booking Bonus for Business' },
    { id: 19, category: 'Events', src: 'https://i.ibb.co/LzJz6mQX/20250611-061520.jpg', alt: 'Family Fun Package' },
    { id: 20, category: 'Events', src: 'https://i.ibb.co/5XnHy3cR/20250611-061557.jpg', alt: 'Adventure Time: Mountain & Jungle Packages' },
    { id: 21, category: 'Events', src: 'https://i.ibb.co/27ffQpWz/20250611-061624.jpg', alt: 'Luxury Escape with free spa sessions' },
    { id: 22, category: 'Events', src: 'https://i.ibb.co/KQ4kdn6/20250611-062811.jpg', alt: 'Student Saver Deal' },
    { id: 23, category: 'Events', src: 'https://i.ibb.co/1GcdDVBZ/20250611-061717.jpg', alt: 'Weekend Flash Sale' },
    { id: 24, category: 'Events', src: 'https://i.ibb.co/SXSwj24J/20250611-061732.jpg', alt: 'Relax & Unwind Spa Offer' },
    { id: 25, category: 'Events', src: 'https://i.ibb.co/TqdjJ1cd/20250611-061757.jpg', alt: 'Eco Nature Deal for eco-resorts' },
    { id: 26, category: 'Events', src: 'https://i.ibb.co/9Hz6S5jr/20250611-061820.jpg', alt: 'Desert Safari Bundle' },
    { id: 27, category: 'Events', src: 'https://i.ibb.co/DHCFDqMp/20250611-061835.jpg', alt: 'Beachside Bliss Offer' },
    { id: 28, category: 'Events', src: 'https://i.ibb.co/dJpY7h88/20250611-061854.jpg', alt: 'Festival Frenzy Discount' },
    { id: 29, category: 'Events', src: 'https://i.ibb.co/Y4hnkZbC/20250611-061921.jpg', alt: 'Long Stay Bonus with free meals' },
    { id: 30, category: 'Events', src: 'https://i.ibb.co/rKwxzJCj/20250611-061935.jpg', alt: 'Early Bird Discount' },
    { id: 31, category: 'Events', src: 'https://i.ibb.co/8DbLkmvv/20250611-062009.jpg', alt: 'Honeymoon Special with complimentary wine' },
    { id: 32, category: 'Events', src: 'https://i.ibb.co/tpCqJ0wy/20250611-062021.jpg', alt: 'Pet-Friendly Stays' },
    { id: 33, category: 'Events', src: 'https://i.ibb.co/C3NxNg4M/20250611-062104.jpg', alt: 'Winter Wonderland Discounts' },
    { id: 34, category: 'Events', src: 'https://i.ibb.co/bMb5D3gw/20250611-062126.jpg', alt: 'City Tour Combo Offer' },
    { id: 35, category: 'Events', src: 'https://i.ibb.co/qLrxLGsM/20250611-062257.jpg', alt: 'Midnight Flash Deal' },
    
    //  Rooms 
    { id: "36", category: 'Rooms', src: "https://i.ibb.co/GQmHx49x/20250605-082018.jpg", alt: "Executive Suite: Luxury suite with a workspace, lounge area, and premium services." },
    { id: "37", category: 'Rooms', src: "https://i.ibb.co/KcKqtDP2/20250605-082806.jpg", alt: "Budget Room: Affordable room with essential facilities, perfect for short stays." },
    { id: "38", category: 'Rooms', src: "https://i.ibb.co/cGwhxHn/20250605-081639.jpg", alt: "Standard Twin Room: Comfortable twin room ideal for business travelers or friends." },
    { id: "39", category: 'Rooms', src: "https://i.ibb.co/HTp2FZft/20250605-075705.jpg", alt: "Ocean View Suite: Spacious suite with breathtaking ocean views, king-sized bed, and luxury amenities." },
    { id: "40", category: 'Rooms', src: "https://i.ibb.co/Kjx7HJ59/20250605-082847.jpg", alt: "Garden View Room: Peaceful room with a lush garden view, great for relaxation." },
    { id: "41", category: 'Rooms', src: "https://i.ibb.co/QF3c10dm/20250605-082639.jpg", alt: "Deluxe King Room: Deluxe room with a king-sized bed, city view, and all modern amenities." },
    { id: "42", category: 'Rooms', src: "https://i.ibb.co/YFScT4c3/20250605-082517.jpg", alt: "Couple’s Paradise Room: Romantic room designed for couples with soft lighting and cozy interiors." },
    { id: "43", category: 'Rooms', src: "https://i.ibb.co/C5NN4DNg/20250605-082345.jpg", alt: "Business Class Room: Modern room equipped with office desk and high-speed internet for business travelers." },
    { id: "44", category: 'Rooms', src: "https://i.ibb.co/hFD8FsMr/20250605-082709.jpg", alt: "Mountain View Room: Panoramic mountain view from your bed and balcony. A serene getaway." },
    { id: "45", category: 'Rooms', src: "https://i.ibb.co/DDCxTq7B/20250605-082553.jpg", alt: "Family Suite: Spacious suite perfect for families, includes multiple beds and a kitchenette." },
    { id: "46", category: 'Rooms', src: "https://i.ibb.co/Vp95bhHT/20250610-091502.jpg", alt: "Royal Palace Suite: Experience royalty in this lavish suite with classic decor, a four-poster bed, and a private balcony." },
    { id: "47", category: 'Rooms', src: "https://i.ibb.co/ymrGtgzk/20250610-071337.jpg", alt: "Arctic Igloo Experience: A unique stay inside a glass igloo with a chance to witness the Northern Lights." },
    { id: "48", category: 'Rooms', src: "https://i.ibb.co/bR2R1qsB/20250610-071236.jpg", alt: "Amazon Rainforest Treehouse: Sleep amidst the canopy of the Amazon in a luxurious treehouse with 360-degree views of the jungle." },
    { id: "49", category: 'Rooms', src: "https://i.ibb.co/9krQhD8T/20250610-071138.jpg", alt: "Sahara Desert Camp: A luxurious tented camp in the heart of the Sahara Desert, offering stargazing and camel treks." },
    { id: "50", category: 'Rooms', src: "https://i.ibb.co/1fCVTh92/20250610-071429.jpg", alt: "Classic Venetian Room: Elegant room with Venetian decor, overlooking a quiet canal in the heart of Venice." },
    { id: "51", category: 'Rooms', src: "https://i.ibb.co/wrYLQ5dX/20250610-080243.jpg", alt: "Outback Wilderness Lodge: A rugged yet comfortable lodge providing an authentic Australian outback experience." },
    { id: "52", category: 'Rooms', src: "https://i.ibb.co/wrYLQ5dX/20250610-080243.jpg", alt: "Kyoto Ryokan Retreat: Traditional Japanese inn with tatami floors, futon beds, and access to a serene garden." },
    { id: "53", category: 'Rooms', src: "https://i.ibb.co/JwKt43B0/20250610-070951.jpg", alt: "Caribbean Beachfront Villa: Private villa with direct access to a white sand beach and crystal clear waters." },
    { id: "54", category: 'Rooms', src: "https://i.ibb.co/sJWLtttP/20250610-070919.jpg", alt: "Spartan Cave House: A traditional cave house carved into the cliffs of Santorini, offering stunning caldera views." },
    { id: "55", category: 'Rooms', src: "https://i.ibb.co/qM0KQ1M9/20250610-070834.jpg", alt: "Scottish Highlands Castle Room: Stay in a historic Scottish castle, complete with antique furnishings and a roaring fireplace." },
    { id: "56", category: 'Rooms', src: "https://i.ibb.co/2m9qpW6/20250610-070821.jpg", alt: "Nile River View Chamber: Comfortable room with a private balcony overlooking the majestic Nile River." },
    { id: "57", category: 'Rooms', src: "https://i.ibb.co/8L8LpHhC/20250610-070728.jpg", alt: "Patagonian Eco Dome: Sustainable dome with transparent panels, perfect for watching the stars in Patagonia." },
    { id: "58", category: 'Rooms', src: "https://i.ibb.co/mrcMsfCS/20250610-071106.jpg", alt: "Bavarian Alpine Chalet: A cozy wooden chalet nestled in the Bavarian Alps, ideal for hiking and skiing." },
    { id: "59", category: 'Rooms', src: "https://i.ibb.co/mCqm9r77/20250610-070549.jpg", alt: "Masai Mara Safari Tent: Luxury safari tent on the plains of the Masai Mara, with opportunities for wildlife viewing." },
];

const categories = ['All', 'Hotel', 'Rooms', 'Events'];



const GalleryHeader = () => (
    <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
    >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Gallery of Dreams
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Step into a visual journey of our stunning properties, elegant interiors, and exclusive events. Find your inspiration here.
        </p>
    </motion.div>
);

const CategoryFilters = ({ activeCategory, setActiveCategory }) => (
    <div className="flex justify-center flex-wrap gap-3 sm:gap-4 mb-16">
        {categories.map((category) => (
            <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-50 ${activeCategory === category
                        ? 'bg-blue-600 text-white shadow-xl transform hover:scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
            >
                {category}
            </button>
        ))}
    </div>
);

const GalleryCarousel = ({ images, openLightbox }) => {
    const swiperRef = useRef(null);

    return (
        <div className="relative group">
            <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={24}
                slidesPerView={1.25}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                breakpoints={{
                    640: { slidesPerView: 2.5 },
                    1024: { slidesPerView: 3.5 },
                    1280: { slidesPerView: 4.5 },
                }}
                className="!pb-12"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={image.id}>
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="aspect-w-3 aspect-h-4 rounded-xl overflow-hidden cursor-pointer shadow-lg group-hover:shadow-2xl transition-shadow duration-400"
                            onClick={() => openLightbox(index)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-400 ease-in-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                                <div className="absolute bottom-0 left-0 p-4">
                                    <p className="text-white text-base font-bold leading-tight">{image.alt.split(':')[0]}</p>
                                    <p className="text-gray-300 text-sm">{image.category}</p>
                                </div>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2 bg-white/80 dark:bg-black/50 rounded-full shadow-md cursor-pointer hover:bg-white transition-all transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
                <FiArrowLeft className="text-gray-800 dark:text-white" size={24} />
            </div>
            <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2 bg-white/80 dark:bg-black/50 rounded-full shadow-md cursor-pointer hover:bg-white transition-all transform translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
                <FiArrowRight className="text-gray-800 dark:text-white" size={24} />
            </div>
        </div>
    );
};


const Lightbox = ({ images, selectedIndex, closeLightbox, goToNext, goToPrev }) => {
    if (selectedIndex === null) return null;

    
    const image = images && selectedIndex >= 0 && selectedIndex < images.length
        ? images[selectedIndex]
        : null;

    if (!image) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                onClick={closeLightbox}
            >
               
                <button
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50"
                    onClick={closeLightbox}
                >
                    <FiX size={36} />
                </button>

                
                <div className="relative w-full h-full flex items-center justify-center p-4">
                   
                    <button
                        className="absolute left-4 sm:left-8 text-white/70 hover:text-white transition-colors z-50 p-3 bg-black/30 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrev();
                        }}
                    >
                        <FiChevronLeft size={32} />
                    </button>

                    
                    <motion.div
                        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                        key={image.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        
                        <div className="w-full flex justify-center">
                            <img
                                src={image.src}
                                alt={image.alt}
                                loading="lazy"
                                className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
                            />
                        </div>
                        <div className="text-center text-white mt-4 max-w-xl px-4">
                            <h3 className="font-bold text-lg">{image.alt.split(':')[0]}</h3>
                            {image.alt.split(':')[1] && (
                                <p className="text-gray-300 text-sm">{image.alt.split(':')[1].trim()}</p>
                            )}
                        </div>
                    </motion.div>

                    
                    <button
                        className="absolute right-4 sm:right-8 text-white/70 hover:text-white transition-colors z-50 p-3 bg-black/30 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                    >
                        <FiChevronRight size={32} />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};



const GalleryPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [filteredImages, setFilteredImages] = useState(galleryImages);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    useEffect(() => {
        if (activeCategory === 'All') {
            setFilteredImages(galleryImages);
        } else {
            setFilteredImages(galleryImages.filter(image => image.category === activeCategory));
        }
    }, [activeCategory]);

    const openLightbox = (image) => {
        const globalIndex = galleryImages.findIndex(img => img.id === image.id);
        if (globalIndex !== -1) {
            setSelectedImageIndex(globalIndex);
        }
    };

    const closeLightbox = () => {
        setSelectedImageIndex(null);
    };

    const goToNext = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    };

    const goToPrev = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
    };

    const imagesByCat = activeCategory === 'All'
        ? categories.slice(1).map(cat => ({
            category: cat,
            images: galleryImages.filter(img => img.category === cat)
        }))
        : [{ category: activeCategory, images: filteredImages }];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
                <GalleryHeader />
                <CategoryFilters activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

                <div className="space-y-16">
                    {imagesByCat.map(({ category, images }) => (
                        images.length > 0 && (
                            <div key={category}>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
                                    {category}
                                </h2>
                                
                                <GalleryCarousel images={images} openLightbox={(index) => openLightbox(images[index])} />
                            </div>
                        )
                    ))}
                </div>
            </div>

            <Lightbox
                images={galleryImages}
                selectedIndex={selectedImageIndex}
                closeLightbox={closeLightbox}
                goToNext={goToNext}
                goToPrev={goToPrev}
            />
        </div>
    );
};

export default GalleryPage;