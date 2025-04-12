export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white text-center p-4 mt-8">
        <p>&copy; {new Date().getFullYear()} MovieHub. All rights reserved.</p>
      </footer>
    );
  }