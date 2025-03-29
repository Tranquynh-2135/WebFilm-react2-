import React, { useState } from 'react';
import Input from '../component/input'; // Giả sử bạn đã có component Input
import Button from '../component/button'; // Giả sử bạn đã có component Button
import { useNavigate,Link } from 'react-router-dom'; // Để điều hướng sau khi đăng nhập

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic xử lý đăng nhập (giả lập)
    if (email && password) {
      console.log('Đăng nhập với:', { email, password });
      // Sau khi đăng nhập thành công, điều hướng về trang chính
      navigate('/');
    } else {
      alert('Vui lòng nhập đầy đủ email và mật khẩu!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Trường Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Trường Mật khẩu */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Mật khẩu
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Nút Đăng nhập */}
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Đăng nhập
          </Button>
        </form>

        {/* Liên kết quay lại hoặc đăng ký */}
        <p className="mt-4 text-center text-gray-600">
          Chưa có tài khoản?{' '}
          {/* <a href="/register" className="text-blue-500 hover:underline">
            Đăng ký
          </a> */}
            <Link to="/signup"> {/* Thêm Link để điều hướng */}
                <Button variant="outline" className="text-blue-500 hover:underline">
                Đăng Ký
                </Button>
            </Link>
        </p>
      </div>
    </div>
  );
}