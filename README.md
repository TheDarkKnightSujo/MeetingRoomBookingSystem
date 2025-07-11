#  Meeting Room Booking System

A robust full-stack system to manage corporate meeting room reservations, recurring meetings, participants, room features, and meeting minutes, with audit and compliance tracking.
```You can find the DEMO video in the repo.```

---

## 🚀 Key Features

- 🔐 User authentication (JWT-based)
- 🗓️ Book/Edit/Cancel meetings
- 👥 Add/Update/Remove participants
- ♻️ Recurring meetings (Daily, Weekly, Monthly)
- 📝 Manage minutes of meetings
- 📍 Multi-location and multi-room support
- ⚙️ Admin-protected routes
- 📊 Dashboard & timeline
- 🧾 Audit logs and user preferences

---

## 🛠️ Tech Stack

**Frontend**  
- React.js  
- Axios  
- Tailwind / CSS

**Backend**  
- Node.js (Express.js)  
- Sequelize ORM  
- MySQL  
- JWT / bcrypt  
- Nodemailer (for email notifications)

---
## ⚙️ Installation and Run

```bash
git clone https://github.com/TheDarkKnightSujo/MeetingRoomBookingSystem.git
cd MeetingRoomBookingSystem

cd backend
npm install

```
You also need to install all these packages:
```
├── cookie-parser@1.4.7
├── cors@2.8.5
├── dotenv@16.5.0
├── express-validator@7.2.1
├── express@5.1.0
├── jsonwebtoken@9.0.2
├── mysql2@3.14.1
├── nodemon@3.1.10
└── sequelize@6.37.7
```
You must also create a .env file:
```
REFERSH_TOKEN_SECRET=
```
In terminal:
```bash
PS C:meetingroom\backend> node
Welcome to Node.js v22.16.0.
Type ".help" for more information.
> require('crypto').randomBytes(64).toString('hex')
```
You will get a random number and letter combination, copy this without the quotes and paste it in the ```.env``` file after ```REFERSH_TOKEN_SECRET=```

---

## 🔧 Download SQL
In backend folder, open the sql query file and run it in the sql workbench.

---

## 🔧 Configure MySQL
Update /backend/models/index.js with your database credentials:

```
const sequelize = new Sequelize('DB_NAME', 'USERNAME', 'PASSWORD', {
  host: 'localhost',
  dialect: 'mysql'
});
```
---



## ▶️ Start Backend Server
```
node server.js
```
---

## 3️⃣ Frontend Setup
```
npm install
npm start
```
In meetingroom directory
---

## 🧩 Database Schema

### 1. `users`
| Field | Type |
|-------|------|
| User_ID (PK) | INT |
| First_Name | VARCHAR |
| Last_Name | VARCHAR |
| Email (unique) | VARCHAR |
| Password_Hash | VARCHAR |
| Role | ENUM('Admin', 'User') |
| Created_At | DATETIME |

---

### 2. `locations`
| Field | Type |
|-------|------|
| Location_ID (PK) | INT |
| Name | VARCHAR |
| Address | TEXT |
| City | VARCHAR |
| Postal_Code | VARCHAR |

---

### 3. `meetingrooms`
| Field | Type |
|-------|------|
| Room_ID (PK) | INT |
| Name | VARCHAR |
| Location_ID (FK) | INT |
| Description | TEXT |
| Capacity | INT |
| Created_At | DATETIME |
| Updated_At | DATETIME |

---

### 4. `room_features`
| Field | Type |
|-------|------|
| Feature_ID (PK) | INT |
| Name | VARCHAR |

---

### 5. `room_feature_mapping`
| Field | Type |
|-------|------|
| Room_ID (FK) | INT |
| Feature_ID (FK) | INT |
| PRIMARY KEY | (Room_ID, Feature_ID) |

---

### 6. `bookings`
| Field | Type |
|-------|------|
| Booking_ID (PK) | INT |
| Room_ID (FK) | INT |
| User_ID (FK) | INT |
| Title | VARCHAR |
| Start_Time | DATETIME |
| End_Time | DATETIME |
| Status | ENUM('Confirmed', 'Cancelled') |
| Created_At | DATETIME |
| Updated_At | DATETIME |

---

### 7. `participants`
| Field | Type |
|-------|------|
| Participant_ID (PK) | INT |
| Booking_ID (FK) | INT |
| User_ID (FK) | INT |
| Invitation_Status | ENUM('Pending', 'Accepted', 'Declined') |
| Notification_Sent | BOOLEAN |

---

### 8. `meeting_minutes`
| Field | Type |
|-------|------|
| Minute_ID (PK) | INT |
| Booking_ID (FK) | INT |
| Notes_Text | TEXT |
| Attachments_Path | VARCHAR |
| Created_By (User_ID) | INT |
| Created_At | DATETIME |

---

### 9. `email_log`
| Field | Type |
|-------|------|
| Email_ID (PK) | INT |
| Booking_ID (FK) | INT |
| Recipient_Email | VARCHAR |
| Subject | VARCHAR |
| Body | TEXT |
| Sent_At | DATETIME |
| Status | ENUM('Sent', 'Failed') |

---

### 10. `recurring_rules`
| Field | Type |
|-------|------|
| RecurringRule_ID (PK) | INT |
| Booking_ID (FK) | INT |
| Frequency | ENUM('Daily', 'Weekly', 'Monthly') |
| End_Date | DATE |
| Repeat_On | VARCHAR (e.g., 'Monday,Wednesday') |

---

### 11. `user_preferences`
| Field | Type |
|-------|------|
| Preference_ID (PK) | INT |
| User_ID (FK) | INT |
| Default_Location_ID (FK) | INT |
| Receive_Email_Notifications | BOOLEAN |
| TimeZone | VARCHAR |

---

### 12. `audit_logs`
| Field | Type |
|-------|------|
| Log_ID (PK) | INT |
| User_ID (FK) | INT |
| Action_Type | VARCHAR |
| Description | TEXT |
| Timestamp | DATETIME |
| IP_Address | VARCHAR |

---

## 🔗 Relationships

- **Users ↔ MeetingRooms**: One-to-many (creator)
- **Locations ↔ MeetingRooms**: One-to-many
- **MeetingRooms ↔ RoomFeatures**: Many-to-many
- **Users ↔ Bookings**: One-to-many
- **Bookings ↔ Participants**: One-to-many
- **Bookings ↔ MeetingMinutes**: One-to-one

---

## 🌐 API Endpoints

### 👤 User

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/register` | Register a new user |
| POST | `/users/login` | Authenticate & get token |
| GET | `/users/me` | Get current user info |
| GET | `/users/:id` | Get user by ID (admin only) |
| GET | `/users` | List all users (admin only) |
| PUT | `/users/me` | Update current user |
| DELETE | `/users/me` | Delete current user |

---

### 📍 Location

| Method | Endpoint |
|--------|----------|
| GET | `/locations` |
| GET | `/locations/:id` |
| POST | `/locations` (admin only) |
| PUT | `/locations/:id` (admin only) |
| DELETE | `/locations/:id` (admin only) |

---

### 🏢 Meeting Rooms

| Method | Endpoint |
|--------|----------|
| GET | `/meeting-rooms` |
| GET | `/locations/:locationId/rooms` |
| GET | `/meeting-rooms/:id` |
| POST | `/locations/:locationId/rooms` (admin only) |
| PUT | `/meeting-rooms/:id` (admin only) |
| DELETE | `/meeting-rooms/:id` (admin only) |

---

### 🧩 Room Features

| Method | Endpoint |
|--------|----------|
| GET | `/room-features` |
| POST | `/room-features` (admin only) |
| GET | `/meeting-rooms/:roomId/features` |
| POST | `/meeting-rooms/:roomId/features` (admin only) |
| DELETE | `/meeting-rooms/:roomId/features/:featureId` |

---

### 📅 Bookings

| Method | Endpoint |
|--------|----------|
| GET | `/bookings` (admin only) |
| GET | `/bookings/my` |
| GET | `/bookings/:id` |
| POST | `/meeting-rooms/:roomId/bookings` |
| PUT | `/bookings/:id` |
| DELETE | `/bookings/:id` |

---

### 👥 Participants

| Method | Endpoint |
|--------|----------|
| GET | `/bookings/:bookingId/participants` |
| POST | `/bookings/:bookingId/participants` |
| PUT | `/bookings/:bookingId/participants/:userId` |
| DELETE | `/bookings/:bookingId/participants/:userId` |

---

### 📝 Meeting Minutes

| Method | Endpoint |
|--------|----------|
| GET | `/bookings/:bookingId/minutes` |
| POST | `/bookings/:bookingId/minutes` |
| PUT | `/bookings/:bookingId/minutes` |
| DELETE | `/bookings/:bookingId/minutes` |

---

### 🔁 Recurring Meetings

| Method | Endpoint |
|--------|----------|
| POST | `/bookings/recurring` |
| GET | `/bookings/:parentId/instances` |
| DELETE | `/bookings/:parentId/instances/:instanceId` |

---

### 🧾 Audit Logs

| Method | Endpoint |
|--------|----------|
| GET | `/audit-logs` (admin only) |
| GET | `/audit-logs/user/:userId` |

---

## 🧑‍💻 Author

**Suhaas N.**  
🔗 [GitHub - TheDarkKnightSujo](https://github.com/TheDarkKnightSujo)

---

## 💡 Future Enhancements

- 🔔 Real-time notifications
- 📧 Email scheduling & calendar integration
- 📅 iCal/Outlook export
- 📱 Mobile-friendly UI
- 🌍 Time zone support with daylight savings handling

---

## 🌟 Show Your Support

If this project helped you, star the repo and share it with your team!

---

## ⚙️ Installation and Run

```bash
git clone https://github.com/TheDarkKnightSujo/MeetingRoomBookingSystem.git
cd MeetingRoomBookingSystem

cd backend
npm install

```
---

## 🔧 Configure MySQL
Update /backend/models/index.js with your database credentials:

```
const sequelize = new Sequelize('DB_NAME', 'USERNAME', 'PASSWORD', {
  host: 'localhost',
  dialect: 'mysql'
});
```
---

## ✅ Sync Database

You can use Sequelize sync to auto-create tables:

```
sequelize.sync({ alter: true });
```
---

## ▶️ Start Backend Server
```
node server.js
```
---

## 3️⃣ Frontend Setup
```
npm install
npm start
```
In meetingroom directory
---
