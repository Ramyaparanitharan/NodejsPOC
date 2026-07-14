# Ticket Booking POC

## Goal

Build a proof-of-concept ticket booking system where users can:

* View available seats
* Select seats
* Prevent double booking
* Complete a booking successfully

---

# Phase 1 - Project Setup

## Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **Socket.IO**
* **CORS**
* **dotenv**

---

## Initialize Project

Create a new Node.js project:

```bash
npm init -y
```

---

## Install Dependencies

Install production dependencies:

```bash
npm install express socket.io cors mongoose dotenv
```

Install development dependency:

```bash
npm install --save-dev nodemon
```

---

## Dependencies

| Package   | Purpose                                                           |
| --------- | ----------------------------------------------------------------- |
| Express   | Creates the server and REST APIs (GET, POST, PUT, DELETE)         |
| Socket.IO | Enables real-time two-way communication between client and server |
| CORS      | Allows frontend applications to communicate with the backend      |
| Mongoose  | Object Data Modeling (ODM) library for MongoDB                    |
| dotenv    | Loads environment variables from `.env` into `process.env`        |
| Nodemon   | Automatically restarts the server when code changes are detected  |

---

# Project Structure

```text
ticket-booking-poc/
│
├── server.js                  # Application entry point
│
├── config/
│   └── db.js                  # MongoDB connection configuration
│
├── models/
│   ├── Event.js               # Event schema
│   ├── Seat.js                # Seat schema
│   └── Booking.js             # Booking schema
│
├── routes/
│   ├── eventRoutes.js         # Event API routes
│   ├── seatRoutes.js          # Seat API routes
│   └── bookingRoutes.js       # Booking API routes
│
├── controllers/               # API request handlers
│
├── services/                  # Business logic layer
│
├── sockets/                   # Socket.IO event handlers
│
├── public/                    # Frontend static files
│
└── package.json
```

---

# Phase 2 - Database Design

## Database

**Database Name**

```
ticket_booking
```

---

# Collections

## 1. Events Collection

Stores event information.

**Collection Name**

```
events
```

### Example Document

```json
{
  "_id": {
    "$oid": "6a54b41b437339b5422ef459"
  },
  "name": "Marvel Movie",
  "date": "2026-08-15T18:00:00Z",
  "venue": "Hall 1"
}
```

---

## 2. Seats Collection

Stores available seats for each event.

**Collection Name**

```
seats
```

### Example Document

```json
{
  "_id": {
    "$oid": "6a54b55f437339b5422ef45c"
  },
  "eventId": {
    "$oid": "6873d8c2d9c3f75c8d6e1234"
  },
  "row": "A",
  "number": 1,
  "status": "available",
  "price": 250
}
```

### Seat Status

| Status    | Description                                 |
| --------- | ------------------------------------------- |
| available | Seat can be selected and booked             |
| locked    | Temporarily reserved during booking process |
| booked    | Successfully booked                         |

---

## 3. Bookings Collection

Stores completed booking details.

**Collection Name**

```
bookings
```

### Example Document

```json
{
  "_id": {
    "$oid": "6a54b65f437339b5422ef45d"
  },
  "eventId": {
    "$oid": "6873d8c2d9c3f75c8d6e1234"
  },
  "seatId": {
    "$oid": "6a54b55f437339b5422ef45c"
  },
  "userName": "John Doe",
  "status": "confirmed",
  "createdAt": "2026-08-01T10:00:00Z"
}
```

---

# Phase 3 - API Development

## Event APIs

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | `/api/events`     | Get all events    |
| GET    | `/api/events/:id` | Get event details |

---

## Seat APIs

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| GET    | `/api/seats/:eventId` | Get seats for an event  |
| PUT    | `/api/seats/:id/lock` | Temporarily lock a seat |

---

## Booking APIs

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | `/api/bookings`     | Create a booking    |
| GET    | `/api/bookings/:id` | Get booking details |

---

# Phase 4 - Real-Time Seat Updates

Using Socket.IO:

* Notify users when a seat is selected
* Update seat availability instantly
* Prevent multiple users from booking the same seat

---

# Future Improvements

* User authentication
* Payment integration
* Booking expiration timer
* Email confirmation
* Admin dashboard
