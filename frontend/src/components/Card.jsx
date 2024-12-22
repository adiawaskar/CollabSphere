import React from 'react';

const Card = ({ project }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-gradient-to-br from-purple-900 to-purple-900 shadow-lg rounded-3xl w-80 h-96 flex flex-col justify-between items-center p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
        {/* White box with purple border around the name and description */}
        <div className="bg-purple-100 border-4 border-purple-700 rounded-lg w-full flex flex-col justify-center items-center p-6 mb-6 flex-grow">
          <h3 className="text-3xl font-bold text-purple-900 mb-4">{project.name}</h3>
          <p className="text-base text-gray-700 leading-relaxed text-center">{project.description}</p>
        </div>

        {/* Learn More Button at the bottom */}
        <button className="bg-white text-purple-900 px-6 py-2 rounded-full shadow-md hover:bg-purple-100">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Card;

