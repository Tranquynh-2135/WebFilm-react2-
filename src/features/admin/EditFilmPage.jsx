// src/pages/EditFilmPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFilmById, updateFilm } from '../../services/FilmService';  // API lấy và cập nhật phim

const EditFilmPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [episodes, setEpisodes] = useState([]);
  const navigate = useNavigate();

  // Fetch film details
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const data = await getFilmById(id); // Gọi API để lấy phim
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setYear(data.year);
        setGenre(data.genre);
        setEpisodes(data.episodes); // Lấy danh sách các tập phim
      } catch (err) {
        console.error('Lỗi khi tải phim:', err);
      }
    };

    fetchFilm();
  }, [id]);

  // Handle changes in episode fields
  const handleEpisodeChange = (index, e) => {
    const newEpisodes = [...episodes];
    newEpisodes[index][e.target.name] = e.target.value;
    setEpisodes(newEpisodes);
  };

  // Add new episode
  const addEpisode = () => {
    setEpisodes([...episodes, { title: '', description: '', url: '', episodeNumber: episodes.length + 1, releaseDate: '' }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!title || !description || !image || !year || !genre) {
      console.error('Tất cả các trường phải được điền đầy đủ.');
      return;
    }

    try {
      const updatedFilm = {
        title,
        description,
        image,
        year,
        genre,
        episodes,
      };
      await updateFilm(id, updatedFilm);  // Cập nhật phim
      navigate('/admin');  // Chuyển hướng đến trang admin
    } catch (err) {
      console.error('Lỗi khi cập nhật phim:', err);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Chỉnh sửa phim</h2>
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

        <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded">Cập nhật phim</button>
      </form>
    </section>
  );
};

export default EditFilmPage;
