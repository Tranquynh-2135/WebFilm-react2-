// src/components/FilmList.js
import React from "react";
import { Link } from "react-router-dom";

const FILMS_PER_PAGE = 8;

const FilmList = ({ movies, currentPage, setCurrentPage }) => {
  // Tính toán phân trang
  const totalPages = Math.ceil(movies.length / FILMS_PER_PAGE);
  const startIndex = (currentPage - 1) * FILMS_PER_PAGE;
  const displayedMovies = movies.slice(startIndex, startIndex + FILMS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {displayedMovies.map((movie) => (
          <div key={movie._id} className="relative">
            <Link to={`/movie/${movie._id}`}>
              <div className="bg-white shadow rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[500px] object-cover object-top"
                />
                <div className="p-3 text-center">
                  <h3 className="text-base font-semibold text-gray-800 truncate">
                    {movie.title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Nút phân trang */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Trang trước
        </button>
        <span className="self-center text-gray-700">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Trang sau
        </button>
      </div>
    </>
  );
};

export default FilmList;
