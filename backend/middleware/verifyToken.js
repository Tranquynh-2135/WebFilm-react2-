const jwt = require('jsonwebtoken');

// Middleware để xác thực và kiểm tra role của người dùng
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Không có token!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    req.user = decoded;  // Gán thông tin người dùng đã giải mã vào request
    next();
  } catch (err) {
    res.status(403).json({ message: "Token không hợp lệ!" });
  }
};

const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user?.role === "admin") {
    next();  // Tiếp tục nếu người dùng có role là admin
  } else {
    res.status(403).json({ message: "Bạn không có quyền truy cập!" });
  }
};

module.exports = { verifyToken, isAdmin };
