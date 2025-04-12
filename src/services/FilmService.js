// src/services/FilmService.js
import axios from 'axios';

// Địa chỉ API của bạn
const API_URL = 'http://localhost:5000/api/films';

// Lấy tất cả các phim
export const getAllFilms = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error('Lỗi khi gọi API films:', error);
    throw error;
  }
};

// Lấy phim theo ID
export const getFilmById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi gọi API phim với id ${id}:`, error);
    throw error;
  }
};

// Thêm một phim mới
export const addFilm = async (film) => {
  try {
    const response = await axios.post(API_URL, film);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm phim:', error);
    throw error;
  }
};

// Cập nhật thông tin phim
export const updateFilm = async (id, film) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, film);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật phim với id ${id}:`, error);
    throw error;
  }
};

// Xóa phim
export const deleteFilm = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa phim với id ${id}:`, error);
    throw error;
  }
};
