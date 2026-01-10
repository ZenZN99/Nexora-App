# 💬 Nexora App - Chat RealTime

![Website Preview](https://res.cloudinary.com/dgagbheuj/image/upload/v1766948373/sttrh1lmohktowhnmtx0.jpg)

## About

Nexora App is a modern real-time chat application designed for seamless and secure communication.

Instant Messaging: Send and receive text messages instantly.

Media Support: Share images and emojis to make conversations more engaging.

User Presence: Know who is online and see when someone is typing.

Profile Management: View user profiles and search for contacts easily.

Message Control: Delete messages and see read receipts.

Responsive Design: Works flawlessly on both desktop and mobile devices.

Secure & Reliable: Built with modern technologies ensuring fast and safe messaging.

---

### Features

- Real-time messaging with instant delivery
- Send and receive images and emojis
- Online status indicators and typing notifications
- User profile management
- Delete messages and see read receipts
- Responsive design for desktop and mobile
- Secure authentication and token-based access
- Smooth and modern user interface

### ⚙️ Technical Features
- RESTful API built with ExpressJs
- State management using Zustand
- Full front-end and back-end integration
- MongoDB database
- Scalable and maintainable codebase

---

## Tech Stack

### Front-End
- React
- TypeScript
- Zustand
- Tailwind CSS
- Socket.io-client

### Back-End
- ExpressJs
- Bun.js
- MongoDB
- JWT Authentication
- Socket.io

### Tools
- Git & GitHub
- Render / Netlify (Deployment)

---

## How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ZenZN99/Nexora-App.git
cd Nexora-App
2️⃣ Run Back-End (ExpressJs)
bash
Copy code
cd server
bun install
bun run start
Create a .env file in the backend root directory with the following variables:

Variable Name	Description	Example Value
PORT	Server port	5000
DATABASE_URL	MongoDB Atlas URL	your_mongodb_atlas_url
JWT_SECRET	JWT secret	your_secret
JWT_EXPIRES_IN	JWT expiration	your_expires_in
ADMIN_EMAIL	Admin email	your_admin_email
ADMIN_PASSWORD	Admin password	your_admin_password
CLOUDINARY_CLOUD_NAME	Cloudinary cloud name	your_cloud_name
CLOUDINARY_API_KEY	Cloudinary API key	your_api_key
CLOUDINARY_API_SECRET	Cloudinary API secret	your_api_secret

The server will run on: http://localhost:5000

3️⃣ Run Front-End (React)
bash
Copy code
cd client
bun install
npm run dev
The application will run on: http://localhost:5173

🚀 The project is complete and ready for use, with future enhancements planned such as:

Add notifications

Add a chat group

Add audio recording

Author
Zen
Full-Stack Developer 
Built with ❤️ using React & ExpressJs
