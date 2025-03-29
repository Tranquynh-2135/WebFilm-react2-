// src/components/ui/input.jsx
import React from 'react';

const Input = (props) => {
  return (
    <input
      className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
};

export default Input;