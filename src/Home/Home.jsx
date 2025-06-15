import React, { lazy, Suspense } from 'react'; 
import HotelSlider from '../HomeComponents/HotelSlider';
import OfferModal from '../HomeComponents/OfferModal';

const ReviewSlider = lazy(() => import('../HomeComponents/ReviewSlider'));
const FeaturedRooms = lazy(() => import('../HomeComponents/FeaturedRooms'));
const WhyChooseUs = lazy(() => import('../HomeComponents/WhyChooseUs'));
const StatsCounter = lazy(() => import('../HomeComponents/StatsCounter'));
const GalleryPage = lazy(() => import('../Page/GalleryPage'));
const FeaturedDestinations = lazy(() => import('../HomeComponents/FeaturedDestinations'));


const SectionLoader = () => (
  <div className="flex justify-center items-center h-80">
    <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
  </div>
);


const Home = () => {
  return (
    <div className=''>
      
      <OfferModal />
      <HotelSlider />

      <Suspense fallback={<SectionLoader />}>
        <ReviewSlider />
        <FeaturedRooms />
        <WhyChooseUs />
        <StatsCounter />
        <GalleryPage />
        <FeaturedDestinations />
      </Suspense>
    </div>
  )
}

export default Home;