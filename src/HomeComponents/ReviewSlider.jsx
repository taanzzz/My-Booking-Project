import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosSecure from "../Axios/Axios";
import { format } from "date-fns";
import { FaQuoteLeft, FaRegCommentDots, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";


const StarRating = ({ rating }) => {
  const totalStars = 5;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} />); // Full star
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} />); 
    } else {
      stars.push(<FaRegStar key={i} />); 
    }
  }

  return <div className="flex items-center gap-1 text-orange-400">{stars}</div>;
};



const ReviewSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-base-200 p-6 rounded-2xl animate-pulse">
                <div className="flex items-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-base-300 mr-4"></div>
                    <div className="flex-1">
                        <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-base-300 rounded w-1/2"></div>
                    </div>
                </div>
                <div className="h-5 bg-base-300 rounded w-1/3 mb-4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-base-300 rounded"></div>
                    <div className="h-4 bg-base-300 rounded w-5/6"></div>
                </div>
            </div>
        ))}
    </div>
);


const EmptyState = () => (
    <div className="text-center py-16 px-4 bg-base-200 rounded-2xl">
        <FaRegCommentDots className="mx-auto text-5xl text-base-content/30" />
        <h3 className="mt-4 text-xl font-semibold text-base-content/80">No Guest Reviews Yet</h3>
        <p className="mt-1 text-base-content/60">Be the first to share your experience!</p>
    </div>
);


const ReviewSlider = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        axiosSecure.get("/reviews")
            .then((res) => {
                const sorted = res.data
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 6);
                setReviews(sorted);
            })
            .catch((err) => console.error("Error fetching reviews:", err))
            .finally(() => setIsLoading(false));
    }, []);

    const slidesToShow = reviews.length >= 3 ? 3 : (reviews.length > 0 ? reviews.length : 1);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        arrows: false,
        afterChange: (current) => setCurrentSlide(current),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: reviews.length >= 2 ? 2 : 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        
        <div className="bg-base-100 py-16 sm:py-20 mb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
                    What Our Guests Say
                </h2>

                {isLoading ? (
                    <ReviewSkeleton />
                ) : reviews.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        <style>
                            {`
                                .slick-dots li button:before {
                                    font-size: 10px;
                                    color: hsl(var(--bc) / 0.3);
                                    opacity: 1;
                                    transition: all 0.3s ease;
                                }
                                .slick-dots li.slick-active button:before {
                                    color: hsl(var(--p));
                                    transform: scale(1.5);
                                }
                            `}
                        </style>
                        <Slider {...settings}>
                            {reviews.map((r, index) => (
                                <div key={r._id} className="p-4 h-full">
                                    <div className={`card bg-base-200 rounded-2xl h-full flex flex-col transition-all duration-300 ease-in-out ${
                                        index === currentSlide ? 'transform scale-100 md:scale-105 shadow-2xl' : 'scale-100 shadow-lg'
                                    }`}>
                                        <div className="card-body relative">
                                            <FaQuoteLeft className="absolute top-4 right-4 text-4xl text-base-content/10" />
                                            <div className="flex items-center mb-4">
                                                <div className="avatar mr-4">
                                                    <div className={`w-14 rounded-full ring ring-offset-base-100 ring-offset-2 transition-colors duration-300 ${
                                                        index === currentSlide ? 'ring-primary' : 'ring-transparent'
                                                    }`}>
                                                        <img src={r.userPhoto || `https://ui-avatars.com/api/?name=${r.username}&background=random`} alt={r.username} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="card-title text-base-content">{r.username}</h4>
                                                    <p className="text-sm text-base-content/60">
                                                        {format(new Date(r.createdAt), "MMMM d, yyyy")}
                                                    </p>
                                                </div>
                                            </div>

                                           
                                            {r.rating && (
                                                <div className="mb-3">
                                                   <StarRating rating={r.rating} />
                                                </div>
                                            )}

                                            <p className="text-base-content/80 leading-relaxed italic">"{r.comment}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </>
                )}
            </div>
        </div>
    );
};

export default ReviewSlider;