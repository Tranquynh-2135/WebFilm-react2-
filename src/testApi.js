// src/testApi.js
import { getAllUsers, getUserById } from './services/api';

// Hàm lấy và in toàn bộ người dùng dưới dạng JSON
const fetchAllUsers = async () => {
  try {
    const users = await getAllUsers();
    console.log('Danh sách người dùng (JSON):', JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Lỗi:', error.message);
  }
};

// Hàm lấy và in một người dùng theo ID dưới dạng JSON
const fetchUserById = async (id) => {
  try {
    const user = await getUserById(id);
    console.log(`Thông tin người dùng ${id} (JSON):`, JSON.stringify(user, null, 2));
  } catch (error) {
    console.error('Lỗi:', error.message);
  }
};

// Gọi các hàm để kiểm tra
fetchAllUsers();

// Thay 'your_user_id' bằng ID thực tế của người dùng trong cơ sở dữ liệu
fetchUserById('your_user_id');