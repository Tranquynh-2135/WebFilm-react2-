import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../component/shared/header';
import Footer from '../../component/shared/footer';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return <p className="text-center mt-10 text-red-500">Vui lòng đăng nhập để xem thông tin.</p>;
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Thông tin người dùng</h2>

          <table className="table-auto w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Trường</th>
                <th className="px-4 py-2 text-left">Giá trị</th>
                <th className="px-4 py-2 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Tên</td>
                <td className="px-4 py-2">{currentUser.username}</td>
                <td rowSpan={4} className="px-4 py-2 text-center align-middle">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => navigate('/user/edit')}
                  >
                    Sửa
                  </button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Email</td>
                <td className="px-4 py-2">{currentUser.email}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Tuổi</td>
                <td className="px-4 py-2">{currentUser.age}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Địa chỉ</td>
                <td className="px-4 py-2">{currentUser.address}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Số điện thoại</td>
                <td className="px-4 py-2">{currentUser.phoneNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserPage;
