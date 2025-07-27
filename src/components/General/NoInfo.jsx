import React from 'react';

export default function NoInfo({ title, description }) {
  return (
    <div className="w-[90%] mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-500 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}