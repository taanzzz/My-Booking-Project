import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import ErrorPage from "../Home/ErrorPage/ErrorPage";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
const PageLoader = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>
);

const Home = lazy(() => import("../Home/Home"));
const RoomsPage = lazy(() => import("../Bookings/RoomsPage"));
const RoomDetailsPage = lazy(() => import("../Bookings/RoomDetailsPage"));
const MyBookings = lazy(() => import("../Bookings/MyBookings"));
const MyProfile = lazy(() => import("../Components/User/MyProfile"));
const UpdateProfile = lazy(() => import("../Components/User/UpdateProfile"));
const LoginForm = lazy(() => import("../Components/LoginForm/LoginForm"));
const Register = lazy(() => import("../Components/Register/Register"));
const UserProfile = lazy(() => import("../Components/User/UserProfile"));
const ContactUs = lazy(() => import('./../Page/ContactUs'));
const AboutUs = lazy(() => import("../Page/AboutUs"));
const BookingConfirmationPage = lazy(() => import("../HomeComponents/BookingConfirmationPage"));


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true, 
        element: <Suspense fallback={<PageLoader />}><Home /></Suspense> 
      },
      { 
        path: "rooms", 
        element: <Suspense fallback={<PageLoader />}><RoomsPage /></Suspense> 
      },
      { 
        path: "/contact", 
        element: <Suspense fallback={<PageLoader />}><ContactUs /></Suspense> 
      },
      { 
        path: "/about", 
        element: <Suspense fallback={<PageLoader />}><AboutUs /></Suspense> 
      },
      {
        path: "rooms/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivateRoute>
              <RoomDetailsPage />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "confirmation/:bookingId",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivateRoute>
              <BookingConfirmationPage />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "update-profile",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "user-profile",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          </Suspense>
        ),
      },
    ],
  },
  { 
    path: "/login", 
    element: <Suspense fallback={<PageLoader />}><LoginForm /></Suspense> 
  },
  { 
    path: "/register", 
    element: <Suspense fallback={<PageLoader />}><Register /></Suspense> 
  },
]);