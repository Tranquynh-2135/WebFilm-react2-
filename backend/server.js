const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Kết nối MongoDB thành công"))
  .catch(err => console.log("Lỗi kết nối MongoDB:", err));

// Tạo Schema người dùng
const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  age: Number,
  phoneNumber: String,
  address: String,
});
const User = mongoose.model("User", UserSchema);

// API đăng ký
app.post("/signup", async (req, res) => {
  try {
    const { email, username, password, age, phoneNumber, address } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email đã tồn tại!" });

    const newUser = new User({ email, username, password, age, phoneNumber, address });
    await newUser.save();
    
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!" });
  }
});

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));
