// src/pages/FilmListPage.js
import React, { useEffect, useState } from "react";
import { getAllFilms } from "../../services/FilmService";
import FilmList from "./FilmList";

export default function FilmListPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await getAllFilms();
        setMovies(data);
      } catch (err) {
        console.error("Lỗi khi tải phim:", err);
      }
    };

    fetchFilms();
  }, []);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Phim nổi bật</h2>
      
      {/* Sử dụng FilmList ở đây */}
      <FilmList
        movies={movies}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
