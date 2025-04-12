import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;


// Lấy toàn bộ người dùng
export const getAllUsers = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    throw new Error("Không thể lấy danh sách người dùng: " + error.message);
  }
};

// Lấy người dùng theo ID
export const getUserById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}?id=${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Không thể lấy thông tin người dùng: " + error.message);
  }
};


