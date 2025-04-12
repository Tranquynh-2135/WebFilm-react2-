// src/pages/AddFilmPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFilm } from '../../services/FilmService';  // API thêm phim

const AddFilmPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [episodes, setEpisodes] = useState([{ title: '', description: '', url: '', episodeNumber: 1, releaseDate: '' }]);
  const navigate = useNavigate();

  const handleEpisodeChange = (index, e) => {
    const newEpisodes = [...episodes];
    newEpisodes[index][e.target.name] = e.target.value;
    setEpisodes(newEpisodes);
  };

  const addEpisode = () => {
    setEpisodes([...episodes, { title: '', description: '', url: '', episodeNumber: episodes.length + 1, releaseDate: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filmData = {
        title,
        description,
        image,
        year,
        genre,
        episodes,
      };
      await addFilm(filmData);
      navigate('/admin');
    } catch (err) {
      console.error('Lỗi khi thêm phim:', err);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Thêm phim mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Tiêu đề phim</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Mô tả phim</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Link ảnh</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Năm phát hành</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Thể loại</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700">Danh sách tập phim</h3>
          {episodes.map((episode, index) => (
            <div key={index} className="space-y-2 mb-4">
              <div>
                <label className="block text-gray-700">Tiêu đề tập {episode.episodeNumber}</label>
                <input
                  type="text"
                  name="title"
                  value={episode.title}
                  onChange={(e) => handleEpisodeChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Mô tả tập</label>
                <textarea
                  name="description"
                  value={episode.description}
                  onChange={(e) => handleEpisodeChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Link tập</label>
                <input
                  type="text"
                  name="url"
                  value={episode.url}
                  onChange={(e) => handleEpisodeChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Ngày phát hành</label>
                <input
                  type="date"
                  name="releaseDate"
                  value={episode.releaseDate}
                  onChange={(e) => handleEpisodeChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addEpisode}
            className="text-blue-500 underline"
          >
            Thêm tập phim
          </button>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Thêm phim</button>
      </form>
    </section>
  );
};

export default AddFilmPage;
