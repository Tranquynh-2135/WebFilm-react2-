// src/pages/AdminPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllFilms, deleteFilm } from '../../services/FilmService'; // Các API để lấy và xóa phim


const AdminPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await getAllFilms();
        setMovies(data);
      } catch (err) {
        console.error('Lỗi khi tải phim:', err);
      }
    };

    fetchFilms();
  }, []);

  // Xóa phim
  const handleDeleteFilm = async (id) => {
    try {
      await deleteFilm(id);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
    } catch (err) {
      console.error('Lỗi khi xóa phim:', err);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Quản trị phim</h2>
      
      {/* Nút thêm phim */}
      <div className="mb-4">
        <Link to="/admin/add-film" className="px-4 py-2 bg-blue-500 text-white rounded">Thêm phim mới</Link>
      </div>


      {/* Xóa phim */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Danh sách phim</h3>
        <div className="space-y-4">
          {movies.map((movie) => (
            <div key={movie._id} className="flex justify-between items-center">
              <h4 className="text-md font-semibold">{movie.title}</h4>
              <div>
                <Link to={`/admin/edit-film/${movie._id}`} className="px-4 py-2 bg-yellow-500 text-white rounded mr-2">Sửa</Link>
                <button
                  onClick={() => handleDeleteFilm(movie._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
