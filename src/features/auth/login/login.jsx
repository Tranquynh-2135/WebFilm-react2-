import React, { useState } from 'react';
import Input from '../../../component/input';
import Button from '../../../component/button';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitAPI = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
      if (response.status === 200) {
        // Lưu token và thông tin người dùng vào localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        login(result.token, result.user);
  
        toast.success('Đăng nhập thành công!', { autoClose: 2000 });
  
        // Điều hướng người dùng nếu là admin
        if (result.user.role === 'admin') {
          setTimeout(() => navigate('/admin'), 2000); // Chuyển hướng tới /admin nếu là admin
        } else {
          setTimeout(() => navigate('/'), 2000); // Chuyển hướng tới trang chủ nếu là user
        }
      } else {
        toast.error(result.message || 'Đăng nhập thất bại!', { autoClose: 3000 });
      }
    } catch (error) {
      toast.error('Lỗi kết nối đến server!', { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

        <form onSubmit={handleSubmitAPI}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <Input 
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mật khẩu</label>
            <Input 
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button Đăng nhập */}
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </form>

        {/* Liên kết quay lại đăng ký */}
        <p className="mt-4 text-center text-gray-600">
          Chưa có tài khoản?{' '}
          <button onClick={() => navigate('/signup')} className="text-blue-500 hover:underline">
            Đăng ký
          </button>
        </p>
      </div>

      {/* ToastContainer */}
      <ToastContainer position="top-right" />
    </div>
  );
}
