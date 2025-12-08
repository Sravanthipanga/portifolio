// src/components/About.jsx

import React from 'react';
import {
  FiCode,
  FiTrendingUp ,
} from 'react-icons/fi';

import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiMysql,
  SiGit,
  SiTailwindcss,
  SiTypescript
} from 'react-icons/si';

import { FaJava } from 'react-icons/fa';

import aboutImage from '../assets/aboutImage.jpeg';

const About = () => {

  const programmingLanguages = [
    { icon: SiHtml5, name: 'HTML5', color: 'text-orange-500', level: 'Advanced' },
    { icon: SiCss3, name: 'CSS3', color: 'text-blue-500', level: 'Advanced' },
    { icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-500', level: 'Advanced' },
    { icon: SiReact, name: 'React', color: 'text-cyan-500', level: 'Advanced' },
    { icon: SiNodedotjs, name: 'Node.js', color: 'text-green-500', level: 'Intermediate' },
    { icon: FaJava, name: 'Java', color: 'text-red-500', level: 'Intermediate' },
    { icon: SiPython, name: 'Python', color: 'text-blue-400', level: 'Intermediate' },
    { icon: SiTypescript, name: 'TypeScript', color: 'text-blue-600', level: 'Beginner' },
    { icon: SiMongodb, name: 'MongoDB', color: 'text-green-400', level: 'Intermediate' },
    { icon: SiMysql, name: 'MySQL', color: 'text-blue-300', level: 'Intermediate' },
    { icon: SiTailwindcss, name: 'Tailwind', color: 'text-teal-400', level: 'Advanced' },
    { icon: SiGit, name: 'Git', color: 'text-orange-600', level: 'Intermediate' }
  ];

  const achievements = [
    { number: '5+', label: 'Projects Completed', icon: FiTrendingUp },
    { number: '7+', label: 'Technologies Mastered', icon: FiCode }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-5xl font-bold text-center mb-10">
          About <span className="text-emerald-400">Me</span>
        </h2>

        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-3 gap-10 items-center">

          {/* TEXT */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-3xl font-bold">
              Hi, I'm <span className="text-cyan-400">Tharushi Paranagama</span>
            </h3>

            <p className="text-gray-300">
              I’m a 3rd year undergraduate at Sri Lanka Institute of Information Technology (SLIIT),
              pursuing a BSc in Information Technology.
              I love creating web apps and beautiful user interfaces.
            </p>

            <p className="text-gray-300">
              My interests include full-stack development, UI/UX design and learning new
              technologies like MERN Stack, React and Flutter.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6 max-w-md">
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-xl text-center"
                >
                  <item.icon className="mx-auto mb-2 w-6 h-6 text-emerald-400" />
                  <h4 className="text-lg font-bold">{item.number}</h4>
                  <p className="text-sm text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <img
              src={aboutImage}
              alt="About"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* SKILLS */}
        <h3 className="text-3xl font-bold text-center mt-20 mb-10">
          Languages & Technologies
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 text-center">
          {programmingLanguages.map((lang, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-xl hover:scale-110 duration-300"
            >
              <lang.icon className={`mx-auto text-3xl ${lang.color}`} />
              <p className="mt-2 text-sm">{lang.name}</p>
              <p className="text-xs text-gray-400">{lang.level}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
