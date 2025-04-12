// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  age: Number,
  phoneNumber: String,
  address: String,
  role: {
    type: String,
    enum: ["user", "admin"], // Các giá trị role được phép. Bạn có thể thêm nhiều role khác nếu cần.
    default: "user",         // Mặc định là "user"
  },

});

module.exports = mongoose.model("users", UserSchema);
