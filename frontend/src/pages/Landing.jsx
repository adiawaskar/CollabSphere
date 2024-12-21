import React, { useEffect } from 'react';

const Landing = () => {
  useEffect(() => {
    document.title = 'CollabSphere';
    return () => {
      document.title = 'Vite + React';
    }
  }, []);

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url('/landing_bg.jpg')` }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full h-full px-6 md:px-12">
        {/* Left Side - Text Section */}
        <div className="w-full md:w-1/2 text-purple-900 text-center md:text-left p-6 md:p-12 bg-white/50 backdrop-blur-lg rounded-lg shadow-lg">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Collaborate Seamlessly
          </h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed">
            Welcome to <span className="font-semibold">CollabSphere</span> — the ultimate platform for remote work collaboration. 
            Empower your distributed teams to connect, share ideas, and boost productivity effortlessly.
          </p>
          <button className="bg-purple-800 hover:bg-purple-500 text-purple-100 font-semibold py-3 px-6 rounded shadow-lg">
            Get Started
          </button>
        </div>

        {/* Right Side - Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-12">
          <img
            src="/collaboration2.png"
            alt="Collaboration"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
