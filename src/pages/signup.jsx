import React, { useState } from 'react';
import Input from '../component/input';
import Button from '../component/button';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Schema validation với Yup
  const signupSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required('Thông tin bắt buộc')
      .email('Nhập đúng email'),
    username: Yup.string()
      .min(5, 'Vui lòng điền đầy đủ họ và tên')
      .max(40, 'Họ và tên quá dài'),
    password: Yup.string()
      .trim()
      .min(5, 'Mật khẩu quá ngắn')
      .max(50, 'Mật khẩu quá dài')
      .required('Thông tin này là bắt buộc'),
    retypePassword: Yup.string()
      .trim()
      .oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp')
      .required('Đây là thông tin bắt buộc'),
    age: Yup.number()
      .typeError("Tuổi phải là một số")
      .integer("Tuổi phải là số nguyên")
      .min(11, "Tuổi phải từ 11 đến 100")
      .max(100, "Tuổi phải từ 11 đến 100")
      .required('Đây là thông tin bắt buộc'),
    phoneNumber: Yup.string()
      .trim()
      .required('Thông tin bắt buộc')
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Không đúng số điện thoại'),
    address: Yup.string()
      .required('Đây là thông tin bắt buộc')
      .min(5, 'Nhập đầy đủ địa chỉ')
      .max(100, 'Địa chỉ quá dài'),
  });

  // useForm hook
  const signupForm = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      retypePassword: '',
      age: '',
      phoneNumber: '',
      address: '',
    },
    resolver: yupResolver(signupSchema)
  });

  // Điều hướng quay lại trang trước
  const backPage = () => {
    navigate(-1);
  };

  // Gửi dữ liệu đăng ký
  const handleSubmitAPI = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Đăng ký thành công!");
        navigate('/login');
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Lỗi kết nối đến server!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>

        <form onSubmit={signupForm.handleSubmit(handleSubmitAPI)}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <Input placeholder="Nhập email" {...signupForm.register('email')} />
            <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.email?.message}</p>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Họ và tên</label>
            <Input placeholder="Nhập họ và tên" {...signupForm.register('username')} />
            <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.username?.message}</p>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mật khẩu</label>
            <Input type="password" placeholder="Nhập mật khẩu" {...signupForm.register('password')} />
            <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.password?.message}</p>
          </div>

          {/* Retype Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Xác nhận mật khẩu</label>
            <Input type="password" placeholder="Xác nhận mật khẩu" {...signupForm.register('retypePassword')} />
            <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.retypePassword?.message}</p>
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tuổi</label>
            <Input placeholder="Nhập tuổi" {...signupForm.register('age')} />
            <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.age?.message}</p>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Số điện thoại</label>
            <Input placeholder="Nhập số điện thoại" {...signupForm.register('phoneNumber')} />
            <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.phoneNumber?.message}</p>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Địa chỉ</label>
            <Input placeholder="Nhập địa chỉ" {...signupForm.register('address')} />
            <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.address?.message}</p>
          </div>

          {/* Nút Đăng ký */}
          <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
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
    </div>
  );
}
