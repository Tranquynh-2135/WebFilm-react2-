// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyToken, isAdmin } = require("../middleware/verifyToken");
// routes/auth.js (đăng ký)
router.post("/signup", async (req, res) => {
    try {
      const { email, username, password, age, phoneNumber, address, role } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "Email đã tồn tại!" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        age,
        phoneNumber,
        address,
        role: role || "user",

      });
      await newUser.save();
  
      res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server!" });
    }
  });
  

// API đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Kiểm tra email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email không đúng!" });

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Mật khẩu sai!" });

    // Tạo và trả về token
    const token = jwt.sign(
        { id: user._id, email: user.email, username: user.username, role: user.role },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { username: user.username, email: user.email, role: user.role },
  
    });
  } catch (error) {
    console.error("Lỗi server:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
});

router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: "Bạn đã vào được trang admin" });
});




module.exports = router;
