import React from 'react';

const Card = ({ project }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full h-64 sm:h-72 md:h-80 flex justify-center items-center text-center p-6">
        <div>
          <h3 className="text-3xl text-purple-900 font-bold mb-2">{project.name}</h3>
          <p className="text-sm text-purple-900">{project.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
