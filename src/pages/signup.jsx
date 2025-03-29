import React, { useState } from 'react';
import Input from '../component/input'; // Giả sử bạn đã có component Input
import Button from '../component/button'; // Giả sử bạn đã có component Button
import { useNavigate } from 'react-router-dom'; // Để điều hướng sau khi đăng ký

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic xử lý đăng ký (giả lập)
    if (!email || !password || !confirmPassword) {
      alert('Vui lòng nhập đầy đủ thông tin!');
    } else if (password !== confirmPassword) {
      alert('Mật khẩu và xác nhận mật khẩu không khớp!');
    } else {
      console.log('Đăng ký với:', { email, password });
      // Sau khi đăng ký thành công, điều hướng về trang đăng nhập
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>
        
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
          <div className="mb-4">
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

          {/* Trường Xác nhận mật khẩu */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
              Xác nhận mật khẩu
            </label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Nút Đăng ký */}
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Đăng ký
          </Button>
        </form>

        {/* Liên kết quay lại đăng nhập */}
        <p className="mt-4 text-center text-gray-600">
          Đã có tài khoản?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}