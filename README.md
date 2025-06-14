# EchoNest - A Modern Hotel Booking Platform

*EchoNest* is a fully responsive and modern hotel booking platform designed to provide users with a seamless and engaging experience for discovering,booking and sharing their accommodation experiences.This project focuses on delivering an attractive user interface,robust functionality and secure authentication.

![EchoNest Homepage](https://i.ibb.co/JjQ2mGWb/Screenshot-2025-06-15-033110.png)


---

## 🔗 Live Links

- **Live Website:** *[https://my-assignment-project-2a864.web.app/](https://hotel-db-server.vercel.app/)*
- **Client-Side Repository:** *[https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-taanzzz]*
- **Server-Side Repository:** *[https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-taanzzz]*

---

## ✨ Key Features

The main features of this platform are listed below:

### 🏡 *Homepage & General Features*

- **Slider Banner:** A dynamic slider featuring an engaging title a short description and a button that redirects to the "Rooms" page.
- **Featured Rooms:** A showcase of the top 6 rooms with images,descriptions and a "Details" button.
- **Hotel Location Map:** An interactive map powered by `react-leaflet` to display the hotel's precise location.
- **User Reviews:** A testimonial carousel on the homepage displaying the latest user reviews to build trust.
- **Special Offers:** An eye-catching pop-up modal on the homepage to showcase special offers and promotions to users.
- **Extra Sections:** Two additional relevant and attractive sections have been added to enhance user engagement.
- **Fully Responsive:** A seamless experience across mobile, tablet, and desktop devices.

### 🖼️ *Visual Gallery*

- **Interactive Image Gallery:** A dedicated page to visually explore the hotel,rooms and special events in a stunning and engaging layout.
- **Category Filtering:** Users can easily filter images by categories like 'Hotel','Rooms' and 'Events' to find what they're looking for.
- **Carousel Display:** Images are presented in a sleek,responsive carousel for each category, powered by `Swiper.js`, for a modern Browse experience.
- **Fullscreen Lightbox:** Clicking on any image opens it in a beautiful,full-screen lightbox for a detailed,immersive view.
- **Easy Navigation:** The lightbox includes next/previous controls for seamless Browse through the entire collection of images.
- **Smooth Animations:** The gallery is enhanced with `framer-motion` for fluid transitions and a polished, professional feel.

### 🔐 *User Authentication*

- **Secure Login & Registration:** Email and password-based authentication system.
- **Social Login:** Quick login functionality using Google.
- **JWT Integration:** Upon login a JWT token is generated and stored on the client side.Private routes are protected using this token.
- **Password Validation:** During registration,password strength is verified (must be at least 6 characters long,including one uppercase and one lowercase letter).
- **Success Notifications:** User-friendly toast notifications from `react-toastify` are shown after successful login or registration.

### 🛌 *Room & Booking Management*

- **Rooms Page:** Displays all available rooms from the database in a card & table format.
- **Price Range Filter:** A filter system at the top of the Rooms page to sort rooms by price (implemented on the server side).
- **Room Details Page:** Shows comprehensive information for a single room,including all details,images and user reviews.
- **Booking Modal:** A modal pops up on clicking "Book Now," showing a summary of the room,price and a date picker for booking.
- **Availability Check:** Once a room is booked for a specific date,it becomes unavailable for others on that date.
- **My Bookings Page:** A private route where logged-in users can view a list of all their booked rooms.
- **Booking Cancellation:** Users can cancel their booking at least 1 day before the check-in date.Upon cancellation the room becomes available again.
- **Date Update:** Users have the option to update the date for an existing booking.
- **Booking Confirmation Page:** After successfully booking a room,the user is redirected to a dedicated confirmation page.It displays the booking ID a summary of stay details (room name,date,price) and provides options to print the confirmation or navigate to their "My Bookings" page.It includes loading and error states for a robust user experience.

### 📝 *Review System*

- **Post Reviews:** Users can post a review only for rooms they have booked.
- **Review Structure:** Reviews include the user's name (read-only) a rating from 1-5, a comment and a timestamp.
- **Review Display:** All reviews for a specific room are displayed on its details page.

### 🚀 *Other Features*

- **404 Page:** A custom-designed 404 page with an engaging Lottie animation and a "Back to Home" button.
- **Smooth Animations:** The entire website is enriched with smooth and appealing animations using `framer-motion`.

---

## 🛠 Tech Stack & Packages

### Client-Side

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS,DaisyUI
- **Routing:** React Router
- **Animation:** Framer Motion
- **API Calls:** Axios
- **Authentication:** Firebase Authentication
- **Mapping:** React-Leaflet
- **Icons:** React Icons
- **Slider/Carousel:** Swiper.js/slick
- **Notifications:** React-Toastify
- **Date Picker:** React Datepicker

### Server-Side

- **Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT)
- **Middleware:** Cors, Dotenv
- **Date Handling:** Moment.js