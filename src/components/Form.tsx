import React from 'react';

const Form = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex justify-center items-start font-medium text-xl">
      <input
        type="text"
        value={value}
        placeholder='City here'
        onChange={onChange}
        className="border rounded-l-md py-2 px-4 w-60 focus:outline-none focus:ring focus:border-blue-300 text-black"
      />
      <button
        type="submit"
        className="bg-red-500 text-white rounded-r-md py-2 px-4 hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 cursor-pointer"
      >
        Search
      </button>
    </form>
  );
};

export default Form;
