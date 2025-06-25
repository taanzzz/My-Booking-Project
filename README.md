# 🌐 EchoNest - A Modern Hotel Booking Platform

> *EchoNest* is a fully responsive and modern hotel booking platform designed to provide users with a seamless and engaging experience for discovering, booking, and sharing their accommodation experiences. This project delivers an attractive user interface, robust functionalities, and secure authentication.

![EchoNest Homepage](https://i.ibb.co/cKShFKfG/Screenshot-2025-06-17-225939.png)

---

## 🔗 Live Links

- 🌍 **Live Website:** [https://my-assignment-project-2a864.web.app/](https://my-assignment-project-2a864.web.app/)
- 💻 **Client Repository:** [https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-taanzzz](https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-taanzzz)
- 🔧 **Server Repository:** [https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-taanzzz](https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-taanzzz)

---

## ✨ Key Features

### 🏡 Homepage & General

- 🔁 **Dynamic Slider Banner** with engaging text and CTA
- 🌟 **Featured Rooms** (Top 6) with images and quick access to details
- 🗺️ **Hotel Location Map** with `react-leaflet` for real-time location view
- 💬 **User Reviews Carousel** on homepage
- 🎁 **Special Offers Modal** with random promotional deals
- 📱 **Fully Responsive** across all devices
- ➕ **Extra Custom Sections** for enhanced user engagement

### 🖼️ Visual Gallery

- 🖼️ **Image Gallery Page** for exploring hotel visuals
- 🗂️ **Category Filtering**: Hotel, Rooms, Events
- 🧭 **Carousel View** powered by `Swiper.js`
- 🔍 **Fullscreen Lightbox** with navigation controls
- 💫 **Smooth Transitions** via `framer-motion`

### 🔐 Authentication

- 🔒 **Email/Password Auth** via Firebase
- 🔐 **JWT Integration** for secure private route access
- 🔑 **Google Social Login**
- ✅ **Password Validation Rules**
- 🎉 **Success Toast Notifications** using `react-toastify`

### 🛌 Room & Booking Management

- 🛏️ **Room Listings Page** with card/table views
- 💸 **Server-Side Price Filter**
- 🧾 **Room Details Page** with images, description, reviews
- 🗓️ **Booking Modal** with room summary & date picker
- 🚫 **Prevent Overbooking** by checking existing reservations
- 📋 **My Bookings Page** (private route)
- ❌ **Cancel Booking** (at least 1 day prior)
- 🔁 **Date Update** for existing bookings
- ✅ **Booking Confirmation Page** with summary, print option & robust error handling

### 📝 Review System

- ✍️ **Authenticated Users Can Post Reviews**
- ⭐ **Rating + Comments** format with timestamps
- 📃 **Review Display** on Room Details Page

### 🚀 Other Features

- 🧭 **Custom 404 Page** with Lottie animation
- 🌈 **Global Animations** using `framer-motion` for UX polish

---

## 💻 Instructions to Run the Project Locally

### Prerequisites

- ✅ Node.js (v16+)
- ✅ MongoDB (local or MongoDB Atlas)
- ✅ npm

### Step 1: Clone the Repositories

```bash
# Clone the Client Repository
git clone https://github.com/taanzzz/My-Booking-Project

# Clone the Server Repository
git clone https://github.com/taanzzz/hotelDB-server
```

### Step 2: Setup Server

```bash
cd hotelDB-server
npm install
```

### Step 3: Setup Client

```bash
cd ../My-Booking-Project
npm install
npm run dev
```

---

## 📡 Backend Server API Endpoints

### 🔐 Authentication

#### `POST /jwt`
Generates JWT token for authenticated user.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "token": "your_jwt_token_here"
}
```

---

### 🏨 Rooms API

#### `GET /rooms`
Returns all rooms. Optional filters:
- `minPrice`
- `maxPrice`

#### `GET /rooms/featured/top-rated`
Returns top 6 rated rooms.

#### `GET /rooms/:id`
Returns details of a specific room.

---

### 📆 Bookings API

#### `POST /bookings`
Creates a booking. JWT required.

**Request:**
```json
{
  "roomId": "room_id_here",
  "email": "user@example.com",
  "date": "YYYY-MM-DD"
}
```

#### `GET /bookings`
Get all bookings for logged-in user.

#### `GET /booking/:id`
Get specific booking by ID.

#### `GET /bookings/room/:roomId/dates`
Returns all booked dates for a room.

#### `GET /bookings/check?roomId=&email=`
Checks if a user already booked a room.

#### `GET /bookings/room/:roomId/date/:date`
Returns booking for a room on a date.

#### `GET /bookings/user/:email`
Get all bookings by user email.

#### `DELETE /bookings/:id`
Cancel a booking (JWT & user match required).

#### `PATCH /bookings/:id`
Update a booking date. JWT required.

**Request:**
```json
{
  "roomId": "room_id_here",
  "date": "YYYY-MM-DD"
}
```

---

### 🗣️ Reviews API

#### `POST /reviews`
Submit review for booked room (JWT required).

**Request:**
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

#### `GET /reviews`
Get all reviews.

#### `GET /reviews/:roomId`
Get reviews for a specific room.

---

## 🛠 Tech Stack

### 🌐 Frontend

- React + Vite
- Tailwind CSS + DaisyUI
- React Router
- Framer Motion
- Axios
- Firebase Auth
- React Icons
- React-Leaflet
- Swiper.js
- React-Toastify
- React Datepicker

### 🔧 Backend

- Node.js + Express.js
- MongoDB (Native Driver)
- JWT Auth
- Dotenv, CORS

---

## ⚙️ Server Environment Variables

Create a `.env` file in `/hotelDB-server`:

```env
PORT=3000
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=development
```

---

> 🔚 That’s it! Your full-stack hotel booking platform is ready to go. Happy coding!
