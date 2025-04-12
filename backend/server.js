// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const filmRoutes = require("./routes/filmRoutes");


dotenv.config();
const app = express();

// Sử dụng middleware
app.use(express.json());
app.use(cors());

// Kết nối cơ sở dữ liệu
require("./config/db");

// Import các route
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// Sử dụng các route
app.use("/", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/films", filmRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server chạy trên http://localhost:${PORT}`)
);

