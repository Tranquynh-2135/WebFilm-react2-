import React, { useState, useCallback } from 'react';
import Input from '../../component/input';
import { Search } from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import debounce from 'lodash/debounce';
import axios from 'axios';

export default function Header() {
  const { userName, isLoggedIn, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const fetchSearchResults = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        setNoResults(false);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setNoResults(false);
        setSearchResults([]); // Reset searchResults trước khi tìm kiếm mới

        const res = await axios.get('http://localhost:5000/api/films', {
          params: { search: query },
        });

        console.log(`Kết quả tìm kiếm cho "${query}":`, res.data.map(f => f.title));

        // Lọc lại dữ liệu để đảm bảo chỉ hiển thị các phim khớp (dự phòng)
        const filteredResults = res.data.filter(film =>
          film.title.toLowerCase().includes(query.toLowerCase()) ||
          film.genre.toLowerCase().includes(query.toLowerCase()) ||
          film.description.toLowerCase().includes(query.toLowerCase())
        );

        console.log(`Kết quả sau khi lọc:`, filteredResults.map(f => f.title));

        setSearchResults(filteredResults);
        setNoResults(filteredResults.length === 0);
      } catch (err) {
        console.error("Lỗi khi tìm kiếm phim:", err.message);
        setSearchResults([]);
        setNoResults(true);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSearchResults(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchSearchResults(searchQuery);
    }
  };



  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/">MovieHub</Link>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="flex items-center w-1/3 space-x-2 relative">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Tìm kiếm phim..."
            className="pl-8 pr-4 py-2 w-full rounded-md text-black"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>


        {/* Hiển thị kết quả tìm kiếm hoặc thông báo không tìm thấy */}
        {(searchResults.length > 0 || noResults) && (
          <div className="absolute top-14 left-0 w-full bg-gray-800 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
            {searchResults.length > 0 ? (
              <ul className="divide-y divide-gray-700">
                {searchResults.map((film) => (
                  <li key={film._id} className="p-3 hover:bg-gray-700">
                    <Link
                      to={`/movie/${film._id}`}
                      className="flex items-center space-x-3"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchResults([]);
                        setNoResults(false);
                      }}
                    >
                      <img
                        src={film.image || '/images/placeholder.jpg'}
                        alt={film.title || 'Phim không có tiêu đề'}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-semibold">{film.title || 'Không có tiêu đề'}</p>
                        <p className="text-sm text-gray-400">{film.genre || 'N/A'} • {film.year || 'N/A'}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-3 text-gray-400 text-center">
                Không tìm thấy phim với từ khóa "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Đăng nhập / Đăng xuất */}
      <nav className="space-x-4 flex items-center">
        {isLoggedIn ? (
          <>
            <Link to="/user" className="text-white font-semibold hover:underline">
              Xin chào, {userName}
            </Link>
            <button onClick={logout} className="text-red-400 hover:underline">Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-gray-300">Đăng nhập</Link>
            <Link to="/signup" className="text-white hover:text-gray-300">Đăng ký</Link>
          </>
        )}
      </nav>
    </header>
  );
}