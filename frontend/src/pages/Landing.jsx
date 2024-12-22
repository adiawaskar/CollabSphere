import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaChartLine, FaVideo, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Landing = () => {
  const features = [
    {
      icon: <FaUsers className="text-4xl mb-4 text-purple-600" />,
      title: "Team Collaboration",
      description: "Real-time collaboration with team members across different time zones"
    },
    {
      icon: <FaChartLine className="text-4xl mb-4 text-purple-600" />,
      title: "Project Analytics",
      description: "Track project progress with intuitive charts and metrics"
    },
    {
      icon: <FaVideo className="text-4xl mb-4 text-purple-600" />,
      title: "Video Conferencing",
      description: "Built-in video calls and screen sharing capabilities"
    },
    {
      icon: <FaFileAlt className="text-4xl mb-4 text-purple-600" />,
      title: "Document Management",
      description: "Centralized document storage with version control"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
              Collaborate. Create. Succeed.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              CollabSphere brings your team together with powerful collaboration tools, 
              real-time communication, and intuitive project management features.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/signup" className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition duration-300">
                Get Started Free
              </Link>
              <Link to="/login" className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold border-2 border-purple-600 hover:bg-purple-50 transition duration-300">
                Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-16">
            Everything You Need for Seamless Collaboration
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition duration-300"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-8">
            Trusted by Teams Worldwide
          </h2>
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-70">
            {/* Add company logos here */}
            <img src="/company1.png" alt="Company 1" className="h-12" />
            <img src="/company2.png" alt="Company 2" className="h-12" />
            <img src="/company3.png" alt="Company 3" className="h-12" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-purple-900 mb-6">
            Ready to Transform Your Team's Collaboration?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of teams already using CollabSphere to achieve their goals.
          </p>
          <Link to="/signup" className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-700 transition duration-300">
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
