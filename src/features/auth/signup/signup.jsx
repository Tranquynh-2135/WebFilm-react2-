import React, { useState } from 'react';
import Input from '../../../component/input';
import Button from '../../../component/button';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../../../models/user';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      retypePassword: '',
      age: '',
      phoneNumber: '',
      address: '',
    },
    resolver: yupResolver(signupSchema),
  });

  // Điều hướng quay lại trang trước
  const backPage = () => {
    navigate(-1);
  };

  // Gửi dữ liệu đăng ký
  const handleSubmitAPI = async (data) => {
    setLoading(true); // Bật trạng thái loading
    try {
      // Gọi API đăng ký với URL backend
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password,
          age: Number(data.age), // Chuyển age thành số
          phoneNumber: data.phoneNumber,
          address: data.address,
        }),
      });

      const result = await response.json();
      if (response.status === 201) {
        toast.success(result.message || 'Đăng ký thành công!', { autoClose: 2000 });
        setTimeout(() => navigate('/login'), 2000); // Chuyển hướng sau 2 giây
      } else {
        toast.error(result.message || 'Đăng ký thất bại!', { autoClose: 3000 });
      }
    } catch (error) {
      toast.error('Lỗi kết nối đến server!', { autoClose: 3000 });
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>

        <form onSubmit={handleSubmit(handleSubmitAPI)}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <Input placeholder="Nhập email" {...register('email')} />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Họ và tên</label>
            <Input placeholder="Nhập họ và tên" {...register('username')} />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mật khẩu</label>
            <Input type="password" placeholder="Nhập mật khẩu" {...register('password')} />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Retype Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Xác nhận mật khẩu</label>
            <Input type="password" placeholder="Xác nhận mật khẩu" {...register('retypePassword')} />
            {errors.retypePassword && (
              <p className="text-red-500 text-sm mt-1">{errors.retypePassword.message}</p>
            )}
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tuổi</label>
            <Input type="number" placeholder="Nhập tuổi" {...register('age')} />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Số điện thoại</label>
            <Input placeholder="Nhập số điện thoại" {...register('phoneNumber')} />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Địa chỉ</label>
            <Input placeholder="Nhập địa chỉ" {...register('address')} />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Nút Đăng ký */}
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Đang đăng ký...
              </>
            ) : (
              'Đăng ký'
            )}
          </Button>
        </form>

        {/* Liên kết quay lại đăng nhập */}
        <p className="mt-4 text-center text-gray-600">
          Đã có tài khoản?{' '}
          <button onClick={backPage} className="text-blue-500 hover:underline">
            Đăng nhập
          </button>
        </p>
      </div>

      {/* ToastContainer cho react-toastify */}
      <ToastContainer position="top-right" />
    </div>
  );
}