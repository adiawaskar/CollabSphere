import React from 'react';
import Card from '../components/Card';

const Home = () => {
  // Sample data for "My Projects" and "Collaborative Projects"
  const myProjects = [
    { name: 'Project A', desc: 'This is the description of Project A' },
    { name: 'Project B', desc: 'This is the description of Project B' },
    { name: 'Project C', desc: 'This is the description of Project C' },
    { name: 'Project D', desc: 'This is the description of Project D' },
    { name: 'Project E', desc: 'This is the description of Project E' },
    { name: 'Project F', desc: 'This is the description of Project F' }
  ];

  const collaborativeProjects = [
    { name: 'Collab Project X', desc: 'Description of Collaborative Project X' },
    { name: 'Collab Project Y', desc: 'Description of Collaborative Project Y' },
    { name: 'Collab Project Z', desc: 'Description of Collaborative Project Z' },
    { name: 'Collab Project W', desc: 'Description of Collaborative Project W' },
    { name: 'Collab Project V', desc: 'Description of Collaborative Project V' },
    { name: 'Collab Project U', desc: 'Description of Collaborative Project U' }
  ];

  return (
    <div 
      className="w-screen min-h-screen overflow-x-hidden" 
      style={{
        backgroundImage: 'url(/home_bg.avif)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed', // Keep the background fixed
        backgroundRepeat: 'no-repeat', // Ensure the background doesn't repeat
      }}
    >
      {/* Hero Section */}
      <div className="relative w-full h-screen flex justify-center items-center text-purple-900 text-center z-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to CollabSphere</h1>
          <p className="text-lg md:text-2xl">Collaborate, Manage, and Succeed Together</p>
        </div>
      </div>

      {/* My Projects Section */}
      <section className="py-16 px-4 text-center relative z-20">
        <h2 className="text-6xl text-purple-900 font-extrabold mb-8 leading-tight">My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myProjects.map((project, index) => (
            <Card key={index} project={project} />
          ))}
        </div>
      </section>

      {/* Collaborative Projects Section */}
      <section className="py-16 px-4  text-center relative z-20">
        <h2 className="text-6xl text-purple-900 font-extrabold mb-8 leading-tight">Collaborative Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {collaborativeProjects.map((project, index) => (
            <Card key={index} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
