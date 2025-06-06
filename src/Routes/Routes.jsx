import Root from "../Root/Root";
import Home from "../Home/Home";
import RoomsPage from "../Bookings/RoomsPage";
import RoomDetailsPage from "../Bookings/RoomDetailsPage";
import MyBookings from "../Bookings/MyBookings";
import MyProfile from "../Components/User/MyProfile";
import UpdateProfile from "../Components/User/UpdateProfile";
import LoginForm from "../Components/LoginForm/LoginForm";
import Register from "../Components/Register/Register";
import UserProfile from "../Components/User/UserProfile";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "rooms", element: <RoomsPage /> },
      {
        path: "rooms/:id",
        element: (
          <PrivateRoute>
            <RoomDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "user-profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <Register /> },
]);
