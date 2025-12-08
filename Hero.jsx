// src/components/Hero.jsx
import React from 'react';
import myPhoto from '../assets/myPhoto.jpeg';
import {FiGithub, FiLinkedin, FiMail, FiClock } from 'react-icons/fi';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 overflow-hidden pt-16">
      {/* Background Elements with more dynamic effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-emerald-600/20 to-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-left">
            {/* Animated Welcome Text */}
            <div className="mb-6">
              <span className="text-lg text-emerald-400 font-medium tracking-wider">HELLO, WELCOME</span>
              <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mt-2"></div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              I'm <span className="text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-green-500 bg-clip-text">Tharushi</span>
            </h1>
            
            <div className="relative inline-block mb-6">
              <h2 className="text-2xl md:text-3xl text-emerald-400 font-semibold relative z-10">
                <span className="relative">
                  3rd Year IT Undergraduate
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-transparent"></span>
                </span>
              </h2>
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 blur-xl -z-10"></div>
            </div>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Passionate Full-Stack Developer crafting innovative digital experiences through modern web technologies and creative problem-solving.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Coming Soon Button with disabled state */}
              <div className="relative group">
                <button
                  disabled
                  className="relative bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg border border-gray-700 cursor-not-allowed"
                >
                  <div className="flex items-center gap-2">
                    <FiClock className="text-lg" />
                    <span>CV is Coming Soon</span>
                  </div>
                </button>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-gray-300 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-700">
                  <div className="relative">
                    CV is being updated
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-gray-700"></div>
                  </div>
                </div>
              </div>
              
              {/* Get In Touch Button */}
              <a
                href="#contact"
                className="group relative bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <div className="relative z-10 flex items-center gap-2">
                  <FiMail className="text-lg group-hover:scale-110 transition-transform" />
                  <span>Get In Touch</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { 
                  icon: FiGithub, 
                  href: "https://github.com/Tharushi111", 
                  label: "GitHub",
                  gradient: "from-gray-800 to-gray-900",
                  hoverGradient: "from-emerald-500 to-green-600"
                },
                { 
                  icon: FiLinkedin, 
                  href: "https://www.linkedin.com/in/tharushi-paranagama-a0b657355", 
                  label: "LinkedIn",
                  gradient: "from-gray-800 to-gray-900",
                  hoverGradient: "from-blue-600 to-blue-700"
                },
                { 
                  icon: FiMail, 
                  href: "mailto:tharushiparanagama1@gmail.com", 
                  label: "Email",
                  gradient: "from-gray-800 to-gray-900",
                  hoverGradient: "from-red-500 to-pink-600"
                }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg bg-gradient-to-br ${social.gradient} hover:bg-gradient-to-br ${social.hoverGradient}`}
                  aria-label={social.label}
                >
                  <div className="relative z-10">
                    <social.icon className="text-2xl text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.label}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Glowing Background Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-green-500 rounded-[50%] opacity-20 blur-3xl group-hover:opacity-30 transition-all duration-700"></div>
              
              {/* Main Image Container */}
              <div className="relative w-96 h-96 md:w-[28rem] md:h-[28rem]">
                {/* Animated Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-green-400 rounded-full animate-spin-slow opacity-70">
                  <div className="absolute inset-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-full"></div>
                </div>

                {/* Main Image */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-emerald-500/20 shadow-2xl transition-all duration-500 group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/20">
                  <img 
                    src={myPhoto} 
                    alt="Tharushi Paranagama" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-8 right-8 w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 animate-bounce"></div>
                  <div className="absolute bottom-8 left-8 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 animate-bounce"></div>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add custom animations to tailwind.config.js if needed */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(5px); opacity: 0.5; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;