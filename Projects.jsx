// src/components/Projects.jsx
import React, { useState } from 'react';
import { 
  FiGithub, 
  FiExternalLink, 
  FiStar, 
  FiCode,
  FiSmartphone,
  FiGlobe
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import rebuyImg from '../assets/rebuy.png';
import WellnessBuddyImg from '../assets/wellness.png';
import ToDoApp from '../assets/ToDoApp.png';
import dashboard from '../assets/admindashboard.png';
import petbuddy from '../assets/petbuddy.png';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      title: 'ReBuy.lk',
      subtitle: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with user authentication, inventory management, and payment integration.',
      image: rebuyImg,
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      githubLink: 'https://github.com/Tharushi111/Second-Hand-Goods-Marketplace.git',
      liveLink: null,
      featured: true,
      type: 'web',
      status: 'Completed'
    },
    {
      title: 'WellnessBuddy',
      subtitle: 'Habit Tracking Mobile App',
      description: 'Android application for building healthy habits, mood tracking, and hydration reminders with a beautiful, calm interface.',
      image: WellnessBuddyImg,
      technologies: ['Kotlin', 'Android Studio', 'Room DB', 'Material Design'],
      githubLink: 'https://github.com/Tharushi111/WellnessBuddy.git',
      liveLink: null,
      featured: true,
      type: 'mobile',
      status: 'Completed'
    },
    {
      title: 'PetBuddy',
      subtitle: 'Pet Care Mobile App',
      description: 'Mobile application designed to help pet owners love, care, and track their pets daily needs and activities.',
      image: petbuddy,
      technologies: ['Kotlin', 'Android Studio', 'SQLite', 'Firebase'],
      githubLink: 'https://github.com/Tharushi111/PetBuddyApp.git',
      liveLink: null,
      featured: true,
      type: 'mobile',
      status: 'In Progress'
    },
    {
      title: 'TodoMaster',
      subtitle: 'Productivity Web App',
      description: 'A simple, clean, and user-friendly To-Do web application with task management and priority features.',
      image: ToDoApp,
      technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'LocalStorage'],
      githubLink: 'https://github.com/Tharushi111/To-Do-App.git',
      liveLink: 'https://www.youtube.com/watch?v=dSmouA9yPVU',
      featured: false,
      type: 'web',
      status: 'Completed'
    },
    {
      title: 'ShopSphere',
      subtitle: 'E-Commerce Dashboard',
      description: 'Complete e-commerce web application using Java servlet MVC architecture with all CRUD operations and JWT authentication.',
      image: dashboard,
      technologies: ['Java', 'Servlet', 'Tailwind CSS', 'JWT', 'MySQL'],
      githubLink: 'https://github.com/Tharushi111/Online-E-Shopping-Store.git',
      liveLink: null,
      featured: true,
      type: 'web',
      status: 'Completed'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects', icon: FiCode },
    { id: 'web', label: 'Web Apps', icon: FiGlobe },
    { id: 'mobile', label: 'Mobile Apps', icon: FiSmartphone },
    { id: 'featured', label: 'Featured', icon: FiStar }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    return project.type === activeFilter;
  });

  const getTypeIcon = (type) => {
    return type === 'web' ? <FiGlobe className="w-4 h-4" /> : <FiSmartphone className="w-4 h-4" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-500/10 to-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-l from-purple-500/10 to-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl mb-6 shadow-lg shadow-emerald-500/10">
            <FiCode className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Featured <span className="text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-green-500 bg-clip-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work, from full-stack web applications to innovative mobile solutions
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700'
              }`}
            >
              <filter.icon className="w-5 h-5" />
              <span className="font-medium">{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`group relative ${
                project.featured && activeFilter !== 'mobile' ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="relative h-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700 hover:border-emerald-500/50 transition-all duration-500 shadow-2xl shadow-black/20">
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 ${
                    project.status === 'Completed' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      project.status === 'Completed' ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}></div>
                    {project.status}
                  </div>
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-300 border border-gray-600">
                    {getTypeIcon(project.type)}
                    <span>{project.type === 'web' ? 'Web App' : 'Mobile App'}</span>
                  </div>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-20 z-20">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full text-xs font-bold text-emerald-400 border border-emerald-500/30">
                      <FiStar className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  </div>
                )}

                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center gap-6">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100"
                    >
                      <div className="p-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full text-white shadow-2xl shadow-emerald-500/50 hover:scale-110 transition-transform duration-300">
                        <FiGithub size={24} />
                      </div>
                    </a>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 delay-100"
                      >
                        <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white shadow-2xl shadow-blue-500/50 hover:scale-110 transition-transform duration-300">
                          <FiExternalLink size={24} />
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-emerald-400/80 font-medium">{project.subtitle}</p>
                  </div>

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1.5 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 rounded-lg text-sm font-medium border border-gray-700 hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                    <div className="flex items-center gap-4">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors group/link"
                      >
                        <div className="p-2 bg-gray-800 rounded-lg group-hover/link:bg-emerald-500/20 transition-colors">
                          <FiGithub size={18} />
                        </div>
                        <span className="text-sm font-medium">View Code</span>
                      </a>
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group/link"
                        >
                          <div className="p-2 bg-gray-800 rounded-lg group-hover/link:bg-cyan-500/20 transition-colors">
                            <FiExternalLink size={18} />
                          </div>
                          <span className="text-sm font-medium">Live Demo</span>
                        </a>
                      )}
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      project.status === 'Completed' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}></div>
                  </div>
                </div>

                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-emerald-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-emerald-500/10 group-hover:via-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-700 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 max-w-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Want to see more of my work?
            </h3>
            <p className="text-gray-400 mb-8 text-lg">
              Check out my GitHub profile for more projects and contributions
            </p>
            <a
              href="https://github.com/Tharushi111"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-emerald-500/30"
            >
              <FiGithub size={24} />
              <span>Explore My GitHub</span>
              <div className="group-hover:translate-x-2 transition-transform duration-300">
                <FiExternalLink size={20} />
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;