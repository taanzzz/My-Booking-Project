import { useEffect, useState } from "react";
import axiosSecure from "../Axios/Axios";
import { FaHotel, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router";


const StarRating = ({ rating }) => {
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
        if (i <= rating) {
            stars.push(<FaStar key={i} />);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<FaStarHalfAlt key={i} />);
        } else {
            stars.push(<FaRegStar key={i} />);
        }
    }

    return <div className="flex items-center gap-1 text-orange-400">{stars}</div>;
};


const RoomSkeleton = () => (
    <div className="card bg-base-200 shadow-lg rounded-2xl animate-pulse">
        <div className="w-full h-56 bg-base-300 rounded-t-2xl"></div>
        <div className="card-body">
            <div className="h-6 bg-base-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-base-300 rounded w-5/6 mb-4"></div>
            <div className="h-10 bg-base-300 rounded-lg w-full"></div>
        </div>
    </div>
);


const EmptyState = () => (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 px-4 bg-base-200 rounded-2xl">
        <FaHotel className="mx-auto text-5xl text-base-content/30" />
        <h3 className="mt-4 text-xl font-semibold text-base-content/80">No Top-Rated Rooms Found</h3>
        <p className="mt-1 text-base-content/60">Please check back later to see our best rooms.</p>
    </div>
);


const FeaturedRooms = () => {
    const [featuredRooms, setFeaturedRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axiosSecure.get(`/rooms/featured/top-rated`)
            .then(res => {
                setFeaturedRooms(res.data);
            })
            .catch(err => {
                console.error("Error fetching featured rooms:", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <section className="py-16 sm:py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
                    🌟 Our Top-Rated Rooms
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        [...Array(3)].map((_, i) => <RoomSkeleton key={i} />)
                    ) : featuredRooms.length === 0 ? (
                        <EmptyState />
                    ) : (
                        featuredRooms.map(room => (
                            <div key={room._id} className="card bg-base-100 shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                <figure className="h-56">
                                    <img
                                        src={room.image}
                                        alt={room.name}
                                        className="w-full h-full object-cover"
                                    />
                                </figure>
                                <div className="card-body">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="card-title text-xl font-bold text-base-content">{room.name}</h3>
                                        <div className="flex-shrink-0 mt-1">
                                          <StarRating rating={room.rating} />
                                        </div>
                                    </div>
                                    <p className="text-base-content/70 grow my-2">{room.description.slice(0, 90)}...</p>
                                    <div className="card-actions items-center justify-between">
                                        <p className="font-semibold text-primary text-lg">${room.price} <span className="font-normal text-base-content/60 text-sm">/ night</span></p>
                                        <Link to={`/rooms/${room._id}`} className="btn btn-primary">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedRooms;