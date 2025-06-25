# EchoNest - A Modern Hotel Booking Platform

*EchoNest* is a fully responsive and modern hotel booking platform designed to provide users with a seamless and engaging experience for discovering, booking and sharing their accommodation experiences. This project focuses on delivering an attractive user interface, robust functionality and secure authentication.

![EchoNest Homepage](https://i.ibb.co/cKShFKfG/Screenshot-2025-06-17-225939.png)

---

## 🔗 Live Links

-   **Live Website:** *[https://my-assignment-project-2a864.web.app/](https://my-assignment-project-2a864.web.app/)*
-   **Client-Side Repository:** *[https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-taanzzz]*
-   **Server-Side Repository:** *[https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-taanzzz]*

---

## ✨ Key Features

The main features of this platform are listed below:

### 🏡 *Homepage & General Features*

-   **Slider Banner:** A dynamic slider featuring an engaging title, a short description and a button that redirects to the "Rooms" page.
-   **Featured Rooms:** A showcase of the top 6 rooms with images, descriptions and a "Details" button.
-   **Hotel Location Map:** An interactive map powered by `react-leaflet` to display the hotel's precise location.
-   **User Reviews:** A testimonial carousel on the homepage displaying the latest user reviews to build trust.
-   **Special Offers:** An eye-catching pop-up modal on the homepage to showcase special offers and promotions to users.
-   **Extra Sections:** Two additional relevant and attractive sections have been added to enhance user engagement.
-   **Fully Responsive:** A seamless experience across mobile, tablet, and desktop devices.

### 🖼️ *Visual Gallery*

-   **Interactive Image Gallery:** A dedicated page to visually explore the hotel, rooms and special events in a stunning and engaging layout.
-   **Category Filtering:** Users can easily filter images by categories like 'Hotel', 'Rooms' and 'Events' to find what they're looking for.
-   **Carousel Display:** Images are presented in a sleek, responsive carousel for each category, powered by `Swiper.js`, for a modern Browse experience.
-   **Fullscreen Lightbox:** Clicking on any image opens it in a beautiful, full-screen lightbox for a detailed, immersive view.
-   **Easy Navigation:** The lightbox includes next/previous controls for seamless Browse through the entire collection of images.
-   **Smooth Animations:** The gallery is enhanced with `framer-motion` for fluid transitions and a polished, professional feel.

### 🔐 *User Authentication*

-   **Secure Login & Registration:** Email and password-based authentication system.
-   **Social Login:** Quick login functionality using Google.
-   **JWT Integration:** Upon login a JWT token is generated and stored on the client side. Private routes are protected using this token.
-   **Password Validation:** During registration, password strength is verified (must be at least 6 characters long, including one uppercase and one lowercase letter).
-   **Success Notifications:** User-friendly toast notifications from `react-toastify` are shown after successful login or registration.

### 🛌 *Room & Booking Management*

-   **Rooms Page:** Displays all available rooms from the database in a card & table format.
-   **Price Range Filter:** A filter system at the top of the Rooms page to sort rooms by price (implemented on the server side).
-   **Room Details Page:** Shows comprehensive information for a single room, including all details, images and user reviews.
-   **Booking Modal:** A modal pops up on clicking "Book Now," showing a summary of the room, price and a date picker for booking.
-   **Availability Check:** Once a room is booked for a specific date, it becomes unavailable for others on that date.
-   **My Bookings Page:** A private route where logged-in users can view a list of all their booked rooms.
-   **Booking Cancellation:** Users can cancel their booking at least 1 day before the check-in date. Upon cancellation the room becomes available again.
-   **Date Update:** Users have the option to update the date for an existing booking.
-   **Booking Confirmation Page:** After successfully booking a room, the user is redirected to a dedicated confirmation page. It displays the booking ID a summary of stay details (room name, date, price) and provides options to print the confirmation or navigate to their "My Bookings" page. It includes loading and error states for a robust user experience.

### 📝 *Review System*

-   **Post Reviews:** Users can post a review only for rooms they have booked.
-   **Review Structure:** Reviews include the user's name (read-only), a rating from 1-5, a comment and a timestamp.
-   **Review Display:** All reviews for a specific room are displayed on its details page.

### 🚀 *Other Features*

-   **404 Page:** A custom-designed 404 page with an engaging Lottie animation and a "Back to Home" button.
-   **Smooth Animations:** The entire website is enriched with smooth and appealing animations using `framer-motion`.

---

## 🚀 Backend Server API Endpoints

This section details the API endpoints provided by the EchoNest backend server.

### Authentication Endpoints

* **`POST /jwt`**
    * **Description:** Generates a JWT token for a user upon successful authentication.
    * **Request Body:**
        ```json
        {
            "email": "user@example.com"
        }
        ```
    * **Response:**
        ```json
        {
            "token": "your_jwt_token_here"
        }
        ```

### Rooms Endpoints

* **`GET /rooms`**
    * **Description:** Retrieves a list of all available rooms. Supports optional price range filtering.
    * **Query Parameters:**
        * `minPrice` (optional): Minimum price for filtering.
        * `maxPrice` (optional): Maximum price for filtering.
    * **Example:** `/rooms?minPrice=50&maxPrice=150`
    * **Authentication:** None required.

* **`GET /rooms/featured/top-rated`**
    * **Description:** Retrieves the top 6 rooms globally, sorted by rating in descending order.
    * **Authentication:** None required.

* **`GET /rooms/:id`**
    * **Description:** Retrieves comprehensive details for a single room by its unique ID.
    * **Path Parameter:** `id` (MongoDB ObjectId of the room)
    * **Authentication:** None required.

### Bookings Endpoints

* **`POST /bookings`**
    * **Description:** Creates a new room booking. Includes checks to prevent duplicate bookings by the same user on the same date and ensures a room isn't double-booked by different users on the same date.
    * **Authentication:** Required (JWT `verifyToken` middleware).
    * **Request Body:**
        ```json
        {
            "roomId": "room_id_here",
            "email": "user@example.com",
            "date": "YYYY-MM-DD"
        }
        ```

* **`GET /bookings`**
    * **Description:** Retrieves all bookings made by the authenticated user, filtered by their email.
    * **Query Parameter:** `email` (User's email)
    * **Authentication:** Required (JWT `verifyToken` middleware and email authorization).

* **`GET /booking/:id`**
    * **Description:** Retrieves detailed information for a single booking by its ID.
    * **Path Parameter:** `id` (MongoDB ObjectId of the booking)
    * **Authentication:** Required (JWT `verifyToken` middleware and email authorization).

* **`GET /bookings/room/:roomId/dates`**
    * **Description:** Fetches all dates for which a specific room has already been booked.
    * **Path Parameter:** `roomId` (Room ID)
    * **Authentication:** None required.

* **`GET /bookings/check`**
    * **Description:** Checks if the authenticated user has an existing booking for a specific room.
    * **Query Parameters:** `roomId`, `email`
    * **Authentication:** Required (JWT `verifyToken` middleware and email authorization).

* **`GET /bookings/room/:roomId/date/:date`**
    * **Description:** Retrieves bookings for a specific room on a precise date.
    * **Path Parameters:** `roomId`, `date` (YYYY-MM-DD)
    * **Authentication:** None required.

* **`GET /bookings/user/:email`**
    * **Description:** Retrieves all bookings associated with a particular user's email.
    * **Path Parameter:** `email` (User's email)
    * **Authentication:** Required (JWT `verifyToken` middleware and email authorization).

* **`DELETE /bookings/:id`**
    * **Description:** Cancels an existing booking by its ID. Only the user who made the booking is authorized to cancel it.
    * **Path Parameter:** `id` (MongoDB ObjectId of the booking)
    * **Authentication:** Required (JWT `verifyToken` middleware and email authorization).

* **`PATCH /bookings/:id`**
    * **Description:** Updates the date of an existing booking. This operation includes a check for room availability on the newly requested date.
    * **Path Parameter:** `id` (MongoDB ObjectId of the booking)
    * **Authentication:** Required (JWT `verifyToken` middleware).
    * **Request Body:**
        ```json
        {
            "roomId": "room_id_of_the_booking",
            "date": "YYYY-MM-DD"
        }
        ```

### Reviews Endpoints

* **`POST /reviews`**
    * **Description:** Allows an authenticated user to submit a new review for a room.
    * **Authentication:** Required (JWT `verifyToken` middleware).
    * **Request Body:**
        ```json
        {
            "roomId": "room_id_here",
            "username": "Reviewer Name",
            "userEmail": "reviewer@example.com",
            "userPhoto": "url_to_photo",
            "rating": 5,
            "comment": "Great room and service!"
        }
        ```

* **`GET /reviews`**
    * **Description:** Retrieves all reviews present in the database.
    * **Authentication:** None required.

* **`GET /reviews/:roomId`**
    * **Description:** Retrieves all reviews specifically for a given room, sorted by creation date in descending order.
    * **Path Parameter:** `roomId` (Room ID)
    * **Authentication:** None required.

---

## 🛠 Tech Stack & Packages

### Client-Side

-   **Framework:** React
-   **Build Tool:** Vite
-   **Styling:** Tailwind CSS, DaisyUI
-   **Routing:** React Router
-   **Animation:** Framer Motion
-   **API Calls:** Axios
-   **Authentication:** Firebase Authentication
-   **Mapping:** React-Leaflet
-   **Icons:** React Icons
-   **Slider/Carousel:** Swiper.js/slick
-   **Notifications:** React-Toastify
-   **Date Picker:** React Datepicker

### Server-Side

-   **Environment:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB
-   **MongoDB Driver:** Native MongoDB Driver
-   **Authentication:** JSON Web Token (JWT)
-   **Middleware:** Cors, Dotenv
-   **Unique ID Generation:** `ObjectId` from `mongodb`

---

## ⚙️ Environment Variables (Server-Side)

To run the backend server, create a `.env` file in the root directory of your server project and populate it with the following:

```dotenv
PORT=3000
MONGODB_URI=<Your MongoDB Connection String>
JWT_SECRET=<A strong, random secret key for JWT signing>
NODE_ENV=development # Use 'production' for deployment