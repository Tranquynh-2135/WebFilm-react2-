import Header from '../../component/shared/header.jsx';
import Footer from "../../component/shared/footer.jsx";
import React from "react";
import FilmListPage from "../film/FilmListPage"; 


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50">
        <Header />
      </header>

      <main className="flex-grow pt-20 p-6 bg-gray-50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Chào mừng đến với MovieHub</h1>
          <p className="text-gray-600 mt-2">Khám phá hàng ngàn bộ phim hấp dẫn!</p>
        </div>

        <FilmListPage />
      </main>

      <Footer />
    </div>
  );
}
