import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // Set initial keyword from URL param or empty string
  const [keyword, setKeyword] = useState(urlKeyword || '');

  // Handle search submission
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex items-center space-x-2 ml-4"
    >
      {/* Search Input */}
      <input
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="px-3 py-2 rounded-md text-sm text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-transparent border border-white text-white px-3 py-2 rounded-md hover:bg-white hover:text-black transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
