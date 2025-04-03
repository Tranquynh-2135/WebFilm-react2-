import React from 'react';
import Input from '../component/input';
import Button from '../component/button';
import { Search } from "lucide-react";
import { Link } from 'react-router-dom'; // Import Link

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold">
            <Link to="/"> {/* Thêm Link để điều hướng */}
                MovieHub
            </Link>
      </div>
      
      {/* Thanh tìm kiếm */}
      <div className="flex items-center w-1/3 space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input 
            type="text" 
            placeholder="Tìm kiếm phim..." 
            className="pl-8 pr-4 py-2 w-full rounded-md text-black" 
          />
        </div>
        <Button 
          variant="outline" 
          className="text-white border-white hover:bg-gray-700"
        >
          Search
        </Button>
      </div>
      
      {/* Đăng nhập với Link */}
      <Link to="/login"> {/* Thêm Link để điều hướng */}
        <Button variant="outline" className="text-white border-white hover:bg-gray-700">
          Đăng nhập
        </Button>
      </Link>
    </header>
  );
}