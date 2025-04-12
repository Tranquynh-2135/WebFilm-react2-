    import React, { useState, useEffect } from 'react';
    import { useAuth } from '../../contexts/AuthContext';
    import { useNavigate } from 'react-router-dom';
    import Header from '../../component/shared/header';
    import Footer from '../../component/shared/footer';
    import Input from '../../component/input';
    import Button from '../../component/button';

    const EditUser = () => {
    const { currentUser, login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        if (currentUser) {
        setUsername(currentUser.username || '');
        setAge(currentUser.age || '');
        setAddress(currentUser.address || '');
        setPhoneNumber(currentUser.phoneNumber || '');
        }
    }, [currentUser]);

    const handleSave = async (e) => {
        e.preventDefault();

        try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users/update-user', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ username, age, address, password }),
        });

        const result = await response.json();

        if (response.status === 200) {
            login(token, result.updatedUser);
            alert('Cập nhật thành công!');
            navigate('/user');
        } else {
            alert(result.message || 'Cập nhật thất bại!');
        }
        } catch (err) {
        alert('Lỗi khi cập nhật!');
        }
    };

    return (
        <>
        <Header />

        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Chỉnh sửa thông tin</h2>

            <form onSubmit={handleSave}>
                <div className="mb-4">
                <label className="block mb-1 font-medium">Tên</label>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="mb-4">
                <label className="block mb-1 font-medium">Tuổi</label>
                <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>

                <div className="mb-4">
                <label className="block mb-1 font-medium">Địa chỉ</label>
                <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className="mb-4">
                <label className="block mb-1 font-medium">Mật khẩu mới (để trống nếu không đổi)</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-4">
                <label className="block mb-1 font-medium">Số điện thoại</label>
                <Input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>

                <div className="flex justify-between mt-6">
                <Button type="button" onClick={() => navigate('/user')} className="bg-gray-500 hover:bg-gray-600">
                    Quay lại
                </Button>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                    Lưu thay đổi
                </Button>
                </div>
            </form>
            </div>
        </div>

        <Footer />
        </>
    );
    };

    export default EditUser;
