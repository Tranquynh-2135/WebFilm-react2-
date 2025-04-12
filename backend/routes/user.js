// routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyToken, isAdmin } = require("../middleware/verifyToken");

 
// Middleware kiểm tra quyền admin (chỉ cho phép user có role admin truy cập)
const verifyAdmin = (req, res, next) => {
  // Giả sử middleware verifyToken đã thêm thông tin user vào req.user
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Bạn không có quyền truy cập vào chức năng này!" });
  }
  next();
};

// API cập nhật role cho user (chỉ admin mới có thể cập nhật)
router.put("/:id/role", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ["user", "admin"];  // Danh sách role hợp lệ, bạn có thể mở rộng thêm
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Role không hợp lệ!" });
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) return res.status(404).json({ message: "Người dùng không tồn tại!" });

    res.status(200).json({ message: "Cập nhật role thành công!", user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error });
  }
});

// API cập nhật thông tin cá nhân (username, age, address, password)
router.put("/update-user", verifyToken, async (req, res) => {
  console.log(req.user);  // Kiểm tra thông tin người dùng
  try {
    const { username, age, address, password, phoneNumber } = req.body;

    const updateFields = {};
    if (username) updateFields.username = username;
    if (age) updateFields.age = age;
    if (address) updateFields.address = address;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    if (password) {
      // Mã hóa mật khẩu nếu có cập nhật
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true }
    ).select("-password"); // Không trả về password

    if (!updatedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại!" });
    }

    res.status(200).json({
      message: "Cập nhật thông tin thành công!",
      updatedUser,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
});





module.exports = router;
