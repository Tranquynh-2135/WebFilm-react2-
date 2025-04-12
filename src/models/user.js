// src/models/signup.model.js
import * as Yup from 'yup';

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Email là thông tin bắt buộc')
    .email('Vui lòng nhập đúng định dạng email')
    .matches(/^\S+$/, 'Email không được chỉ chứa khoảng trắng'),

  username: Yup.string()
    .trim()
    .required('Họ và tên là thông tin bắt buộc')
    .min(5, 'Họ và tên phải có ít nhất 5 ký tự')
    .max(40, 'Họ và tên không được dài quá 40 ký tự')
    .matches(/^\S+$/, 'Họ và tên không được chỉ chứa khoảng trắng'),

  password: Yup.string()
    .trim()
    .required('Mật khẩu là thông tin bắt buộc')
    .min(5, 'Mật khẩu phải có ít nhất 5 ký tự')
    .max(50, 'Mật khẩu không được dài quá 50 ký tự')
    .matches(/^\S+$/, 'Mật khẩu không được chỉ chứa khoảng trắng')
    // Tùy chọn: Thêm kiểm tra độ phức tạp của mật khẩu
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Mật khẩu phải chứa ít nhất một chữ cái in hoa, một chữ cái thường và một số'
    ),

  retypePassword: Yup.string()
    .trim()
    .required('Xác nhận mật khẩu là thông tin bắt buộc')
    .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không trùng khớp')
    .matches(/^\S+$/, 'Xác nhận mật khẩu không được chỉ chứa khoảng trắng'),

  age: Yup.number()
    .typeError('Tuổi phải là một số')
    .integer('Tuổi phải là số nguyên')
    .min(11, 'Tuổi phải từ 11 đến 100')
    .max(100, 'Tuổi phải từ 11 đến 100')
    .required('Tuổi là thông tin bắt buộc'),

  phoneNumber: Yup.string()
    .trim()
    .required('Số điện thoại là thông tin bắt buộc')
    .matches(
      /^(84|0[3|5|7|8|9])[0-9]{8}$/,
      'Số điện thoại không đúng định dạng (ví dụ: 0935123456)'
    )
    .matches(/^\S+$/, 'Số điện thoại không được chỉ chứa khoảng trắng'),

  address: Yup.string()
    .required('Địa chỉ là thông tin bắt buộc')
    .min(5, 'Địa chỉ phải có ít nhất 5 ký tự')
    .max(100, 'Địa chỉ không được dài quá 100 ký tự')
    
});