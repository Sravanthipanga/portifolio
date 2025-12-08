import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: '', // 'success' or 'error'
    title: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showToast = (type, title, message) => {
    setToast({ show: true, type, title, message });

    setTimeout(() => {
      setToast({ ...toast, show: false });
    }, 5000);
  };

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Netlify form submission
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...formData })
    })
      .then(() => {
        showToast(
          'success',
          'Message Sent Successfully!',
          "Your message has been delivered. I'll get back to you within 24 hours."
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
        console.error('Form Submission Error:', error);
        showToast(
          'error',
          'Message Failed to Send',
          'There was an error sending your message. Please try again or email me directly.'
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <section id="contact" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div
            className={`rounded-xl shadow-2xl border-l-4 overflow-hidden animate-slideDown ${
              toast.type === 'success'
                ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-500'
                : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-500'
            }`}
          >
            <div className="p-4 flex items-start">
              <div className="flex-shrink-0">
                {toast.type === 'success' ? (
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <FiAlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                )}
              </div>

              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <h3
                    className={`text-sm font-semibold ${
                      toast.type === 'success' ? 'text-emerald-800' : 'text-red-800'
                    }`}
                  >
                    {toast.title}
                  </h3>
                  <button
                    onClick={() => setToast({ ...toast, show: false })}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
                <p
                  className={`mt-1 text-sm ${
                    toast.type === 'success' ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {toast.message}
                </p>

                {/* Progress bar */}
                <div className="mt-2">
                  <div
                    className={`h-1 w-full ${
                      toast.type === 'success' ? 'bg-emerald-100' : 'bg-red-100'
                    } rounded-full overflow-hidden`}
                  >
                    <div
                      className={`h-full ${
                        toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                      } animate-progress`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 2px, transparent 2px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full mb-6">
            <FiMail className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Get In{' '}
            <span className="text-transparent bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text">
              Touch
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Let's create something amazing together. Drop me a message! ✨
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10">
              <h3 className="text-2xl font-bold text-white mb-6">
                Let's build the future together! 🚀
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Whether you have a groundbreaking project idea, need technical expertise,
                or just want to connect over tech - I'm always excited to explore new possibilities.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-4 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-all duration-300 group-hover:scale-110">
                    <FiMail className="text-2xl text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:tharushiparanagama1@gmail.com"
                      className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
                    >
                      tharushiparanagama1@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-4 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-all duration-300 group-hover:scale-110">
                    <FiPhone className="text-2xl text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">Phone</h4>
                    <a
                      href="tel:+94743572773"
                      className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
                    >
                      +94 74 357 2773
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-4 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-all duration-300 group-hover:scale-110">
                    <FiMapPin className="text-2xl text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">Location</h4>
                    <p className="text-gray-400">Malabe, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/5 hover:shadow-emerald-500/10 transition-all duration-300">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Send me a message 💌</h3>
              <p className="text-gray-400">I typically respond within 24 hours</p>
            </div>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-white mb-2 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                    placeholder="Nimali Perera"
                  />
                </div>

                <div className="group">
                  <label className="block text-white mb-2 font-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                    placeholder="nimali@gmail.com"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-white mb-2 font-medium">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  placeholder="Let's work together!"
                />
              </div>

              <div className="group">
                <label className="block text-white mb-2 font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none"
                  placeholder="Hello! I'd like to discuss a potential project with you..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={20} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-center text-gray-400 text-sm mt-4">
                Your information is secure and will never be shared
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Add these CSS animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translate(-50%, -100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }

        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        .animate-progress {
          animation: progress 5s linear forwards;
        }
      `}</style>
    </section>
  );
};

export default Contact;
