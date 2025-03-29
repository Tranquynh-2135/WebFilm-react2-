import Header from "./header.jsx";
import Footer from "./footer.jsx";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header cố định */}
      <header className="fixed top-0 left-0 w-full z-50">
        <Header />
      </header>
      
      {/* Nội dung trang */}
      <main className="flex-grow pt-16 p-4">
        <h1 className="text-2xl font-bold text-center">Chào mừng đến với MovieHub</h1>
        <p className="text-center text-gray-600 mt-2">Khám phá hàng ngàn bộ phim hấp dẫn!</p>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}