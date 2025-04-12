const express = require("express");
const router = express.Router();
const Film = require("../models/Film");

// Thêm phim mới
router.post("/", async (req, res) => {
  try {
    const newFilm = new Film(req.body);
    await newFilm.save();
    res.status(201).json({ message: "Thêm phim thành công!", film: newFilm });
  } catch (error) {
    console.error("Lỗi khi thêm phim:", error);
    res.status(500).json({ message: "Lỗi khi thêm phim!" });
  }
});

// Lấy danh sách tất cả phim hoặc tìm kiếm phim theo từ khóa
router.get("/", async (req, res) => {
  try {
    const searchQuery = req.query.search?.toLowerCase().trim();

    console.log(`Từ khóa tìm kiếm: "${searchQuery}"`);

    let films;
    if (searchQuery) {
      // Tìm kiếm trên title, genre, và description
      let searchConditions = [
        { title: { $regex: searchQuery, $options: 'i' } },
        { genre: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ];

      // Nếu từ khóa là "demon", tìm thêm từ "quỷ"
      if (searchQuery === "demon") {
        searchConditions.push({ description: { $regex: "quỷ", $options: 'i' } });
      }

      films = await Film.find({
        $or: searchConditions,
      });

      console.log("Kết quả tìm kiếm:", films.map(f => f.title));
    } else {
      // Nếu không có từ khóa tìm kiếm, trả về tất cả phim
      films = await Film.find();
      console.log("Trả về tất cả phim:", films.map(f => f.title));
    }

    res.status(200).json(films);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phim:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách phim!" });
  }
});

// Lấy 1 phim theo id
router.get("/:id", async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ message: "Không tìm thấy phim!" });
    res.status(200).json(film);
  } catch (error) {
    console.error(`Lỗi khi lấy phim với ID ${req.params.id}:`, error);
    res.status(500).json({ message: "Lỗi khi lấy phim!" });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ message: 'Film not found' });

    film.title = req.body.title || film.title;
    film.description = req.body.description || film.description;
    film.image = req.body.image || film.image;
    film.year = req.body.year || film.year;
    film.genre = req.body.genre || film.genre;
    film.episodes = req.body.episodes || film.episodes;

    const updatedFilm = await film.save();
    res.json(updatedFilm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa phim
router.delete('/:id', async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ message: 'Film not found' });

    await film.deleteOne();
    res.json({ message: 'Film deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cập nhật phim theo ID
router.put('/:id', async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ message: 'Không tìm thấy phim!' });

    // Cập nhật các trường dữ liệu
    film.title = req.body.title || film.title;
    film.description = req.body.description || film.description;
    film.image = req.body.image || film.image;
    film.year = req.body.year || film.year;
    film.genre = req.body.genre || film.genre;
    film.episodes = req.body.episodes || film.episodes;

    // Lưu phim sau khi cập nhật
    const updatedFilm = await film.save();

    // Trả về phim đã được cập nhật
    res.status(200).json(updatedFilm);
  } catch (err) {
    console.error(`Lỗi khi cập nhật phim với ID ${req.params.id}:`, err);
    res.status(400).json({ message: 'Lỗi khi cập nhật phim!', error: err.message });
  }
});


module.exports = router;