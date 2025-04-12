import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFilmById } from '../../services/FilmService';
import Header from '../../component/shared/header.jsx';
import Footer from '../../component/shared/footer.jsx';
import ReactPlayer from 'react-player'; // Import ReactPlayer

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null); // State để lưu tập phim đang được xem

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await getFilmById(id);
        setMovie(data);
      } catch (err) {
        console.error("Lỗi khi tải thông tin phim:", err);
      }
    };

    fetchMovieDetail();
  }, [id]);

  // Hàm xử lý khi bấm nút "Xem tập"
  const handlePlayEpisode = (episode) => {
    setSelectedEpisode(episode);
  };

  if (!movie) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="fixed top-0 left-0 w-full z-50">
        <Header />
      </header>

      <main className="flex-grow pt-20 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Tiêu đề phim */}
          <h1 className="text-3xl font-bold text-center mb-4">{movie.title}</h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Poster phim */}
            <div className="md:w-1/3">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Thông tin phim */}
            <div className="md:w-2/3 flex flex-col gap-2">
              <p>
                <span className="font-semibold">Thể loại:</span> {movie.genre}
              </p>
              <p>
                <span className="font-semibold">Trạng thái:</span> {movie.episodes && movie.episodes.length > 0 ? 'Đang tiến hành' : 'Hoàn thành'}
              </p>
              <p>
                <span className="font-semibold">Điểm:</span> N/A
              </p>
              <p>
                <span className="font-semibold">Phát hành:</span> {movie.year}
              </p>
              <p>
                <span className="font-semibold">Thời lượng:</span> {movie.episodes && movie.episodes.length > 0 ? `${movie.episodes.length} tập` : 'N/A'}
              </p>
            </div>
          </div>

          {/* Trình phát video */}
          {selectedEpisode && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Đang xem: {selectedEpisode.title}</h2>
              <div className="relative pt-[56.25%]"> {/* Tỷ lệ 16:9 */}
                <ReactPlayer
                  url={selectedEpisode.url}
                  width="100%"
                  height="100%"
                  controls={true}
                  className="absolute top-0 left-0"
                  playing={true}
                />
              </div>
            </div>
          )}

          {/* Danh sách tập phim */}
          {movie.episodes && movie.episodes.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Danh sách tập</h2>
              <ul className="space-y-2">
                {movie.episodes.map((episode, index) => (
                  <li
                    key={index}
                    className="p-3 bg-gray-800 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <span className="font-semibold">{episode.title}</span>
                      <p className="text-gray-400 text-sm">{episode.description}</p>
                    </div>
                    <button
                      onClick={() => handlePlayEpisode(episode)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Xem tập
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-8 text-center">
              <p className="text-gray-400">Đây là phim lẻ, không có tập phim.</p>
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-4">Xem phim: {movie.title}</h2>
                <div className="relative pt-[56.25%]">
                  <ReactPlayer
                    url={`/movies/${id}.mp4`} // Giả định URL cho phim lẻ
                    width="100%"
                    height="100%"
                    controls={true}
                    className="absolute top-0 left-0"
                    playing={true}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}