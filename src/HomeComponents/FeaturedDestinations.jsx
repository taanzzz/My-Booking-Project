import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { FaMapMarkerAlt, FaBed } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router';



const destinations = [
    {
        id: 1, city: 'Paris', country: 'France',
        imageUrl: 'https://i.ibb.co/TBj2NF3F/20250610-053909.jpg',
        coordinates: [48.8566, 2.3522], description: "The city of love,art and fashion."
    },
    {
        id: 2, city: 'Zurich', country: 'Switzerland',
        imageUrl: 'https://i.ibb.co/BVm2Wx3D/20250610-045559.jpg',
        coordinates: [47.3769, 8.5417], description: "A global center for banking and finance,set by a pristine lake."
    },
    {
        id: 3, city: 'Bali', country: 'Indonesia',
        imageUrl: 'https://i.ibb.co/23VGMT9F/20250610-045809.jpg',
        coordinates: [-8.6500, 115.2167], description: "The famed Island of the Gods, with lush volcanic mountains."
    },
    {
        id: 4, city: 'Doha', country: 'Qatar',
        imageUrl: 'https://i.ibb.co/cSc8RDjW/20250610-050442.jpg',
        coordinates: [25.2854, 51.5310], description: "A futuristic skyline and ultramodern architecture."
    },
    {
        id: 5, city: 'Reykjavík', country: 'Iceland',
        imageUrl: 'https://i.ibb.co/xq1674HN/20250610-050239.jpg',
        coordinates: [64.1466, -21.9426], description: "The gateway to the land of fire, ice, and Northern Lights."
    },
    {
        id: 6, city: 'Seoul', country: 'South Korea',
        imageUrl: 'https://i.ibb.co/7N6JDVQC/20250610-050518.jpg',
        coordinates: [37.5665, 126.9780], description: "Where modern skyscrapers and pop culture meet ancient temples."
    },
    {
        id: 7, city: 'Vienna', country: 'Austria',
        imageUrl: 'https://i.ibb.co/BVdHVC63/20250610-050609.jpg',
        coordinates: [48.2082, 16.3738], description: "A city of imperial palaces, music, and artistic masterpieces."
    },
    {
        id: 8, city: 'Queenstown', country: 'New Zealand',
        imageUrl: 'https://i.ibb.co/q3J0rQsc/20250610-050753.jpg',
        coordinates: [-45.0312, 168.6626], description: "The adventure capital of the world, nestled by majestic mountains."
    },
    {
        id: 9, city: 'Nice', country: 'France',
        imageUrl: 'https://i.ibb.co/1YR3ngzz/20250610-050816.jpg',
        coordinates: [43.7102, 7.2620], description: "Stunning seaside beauty on the French Riviera."
    },
    {
        id: 10, city: 'Vancouver', country: 'Canada',
        imageUrl: 'https://i.ibb.co/GvwfS57N/20250610-050926.jpg',
        coordinates: [49.2827, -123.1207], description: "A bustling seaport surrounded by mountains and evergreen forests."
    },
    {
        id: 11, city: 'Bangkok', country: 'Thailand',
        imageUrl: 'https://i.ibb.co/jv1kRTtw/20250610-051011.jpg',
        coordinates: [13.7563, 100.5018], description: "A city of ornate shrines and vibrant street life."
    },
    {
        id: 12, city: 'Barcelona', country: 'Spain',
        imageUrl: 'https://i.ibb.co/1YdZ8mZH/20250610-051033.jpg',
        coordinates: [41.3851, 2.1734], description: "Famed for its unique architecture, art, and vibrant nightlife."
    }
];


const createCustomIcon = (colorClass) => new L.divIcon({
    html: ReactDOMServer.renderToString(<FaMapMarkerAlt className={`${colorClass} text-4xl`} />),
    className: '', iconSize: [30, 42], iconAnchor: [15, 42], popupAnchor: [0, -42]
});
const defaultIcon = createCustomIcon('text-gray-500');
const activeIcon = createCustomIcon('text-primary');

function ChangeMapView({ coords }) {
    const map = useMap();
    map.flyTo(coords, map.getZoom(), { animate: true, duration: 1.5 });
    return null;
}

const FeaturedDestinations = () => {
    const [activeLocation, setActiveLocation] = useState(destinations[0].coordinates);
    
    const handleLocationChange = (coords) => {
        setActiveLocation(coords);
    };

    return (
        <section className="bg-base-100 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Our Global Hotspots</h2>
                    <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
                        Slide through destinations or click one to explore on the map.
                    </p>
                </div>
                
                
                <div className="flex flex-col lg:gap-8">

                    
                    <div className="w-full order-2 lg:order-1">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={30}
                            loop={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            grabCursor={true}
                            onSlideChange={(swiper) => {
                                const currentDestination = destinations[swiper.realIndex];
                                handleLocationChange(currentDestination.coordinates);
                            }}
                            breakpoints={{
                                320: { slidesPerView: 1, spaceBetween: 20 },
                                640: { slidesPerView: 2, spaceBetween: 20 },
                                1024: { slidesPerView: 3, spaceBetween: 30 },
                                1280: { slidesPerView: 4, spaceBetween: 30 },
                            }}
                            className="mySwiper py-4"
                        >
                            {destinations.map((dest) => (
                                <SwiperSlide key={dest.id}>
                                    <div onClick={() => handleLocationChange(dest.coordinates)} className="h-full mb-5 cursor-pointer">
                                        <div className={`card bg-base-100 shadow-xl border-2 transition-colors duration-300 h-full ${activeLocation[0] === dest.coordinates[0] && activeLocation[1] === dest.coordinates[1] ? 'border-primary' : 'border-transparent'}`}>
                                            <figure className="h-40">
                                                <img src={dest.imageUrl} alt={dest.city} className="w-full h-full object-cover" />
                                            </figure>
                                            <div className="card-body p-5">
                                                <h3 className="card-title text-xl">{dest.city}</h3>
                                                <p>{dest.country}</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    
                    <div className="w-full order-1 lg:order-2">
                        
                        <div className="h-[300px] lg:h-[500px] w-full mb-2 rounded-2xl overflow-hidden shadow-2xl border-2 border-base-300">
                            <MapContainer
                                center={activeLocation}
                                zoom={5}
                                style={{ height: '100%', width: '100%' }}
                                scrollWheelZoom={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {destinations.map(dest => (
                                    <Marker
                                        key={dest.id}
                                        position={dest.coordinates}
                                        icon={activeLocation[0] === dest.coordinates[0] && activeLocation[1] === dest.coordinates[1] ? activeIcon : defaultIcon}
                                    >
                                        <Popup>
                                            <div className="text-center w-40">
                                                <h4 className="font-bold text-md">{dest.city}, {dest.country}</h4>
                                                <p className="text-sm">{dest.description}</p>
                                                <Link 
                                                to={`/rooms`}
                                                className="btn btn-primary btn-sm mt-2 inline-flex items-center gap-2">
                                                    <FaBed />
                                                    View Stays
                                                </Link>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                                <ChangeMapView coords={activeLocation} />
                            </MapContainer>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturedDestinations;