import React, { useState } from 'react';
import './Footer.css'; // Make sure to create and import the CSS file

function Footer({ darkMode }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Insert the Correct Email Address !!!!
    const mailtoLink = `mailto:EMAIL@EXAMPLE.COM?subject=Message from Multi-Convert&body=${encodeURIComponent(message)}`; 
    window.location.href = mailtoLink;
  };

  return (
    <footer className={`footer p-4 border-t-2 ${darkMode ? '' : 'bg-white border-orange-500'}`}>
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <h4 className={`${darkMode ? 'text-gray-300' : 'text-orange-500'}`}>Send us a message</h4>
          <textarea
            className={`w-full p-2 mt-2 border rounded ${darkMode ? 'bg-gray-800 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-300'}`}
            rows="2"
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
        <div className="w-full md:w-2/3 text-center md:text-right">
          <p className={`${darkMode ? 'text-gray-300' : 'text-orange-500'}`}>&copy; 2024 Multi-Convert. All rights reserved.</p>
          <div className="flex justify-center md:justify-end mt-4">
            <a href="/privacy-policy" className={`mx-2 ${darkMode ? 'text-gray-300 hover:underline' : 'text-orange-500 hover:underline'}`}>Privacy Policy</a>
            <a href="/terms-of-service" className={`mx-2 ${darkMode ? 'text-gray-300 hover:underline' : 'text-orange-500 hover:underline'}`}>Terms of Service</a>
            <a href="/contact" className={`mx-2 ${darkMode ? 'text-gray-300 hover:underline' : 'text-orange-500 hover:underline'}`}>Contact Us</a>
          </div>
          <div className="mt-4">
            <p className={`${darkMode ? 'text-gray-300' : 'text-orange-500'}`}>Created by AdRohal</p>
            <a href="https://www.linkedin.com/in/adrohal" className={`${darkMode ? 'text-gray-300 hover:underline' : 'text-orange-500 hover:underline'}`}>LinkedIn</a>
          </div>
          <div className="mt-4">
            <a href="https://github.com/AdRohal" className={`${darkMode ? 'text-gray-300 hover:underline' : 'text-orange-500 hover:underline'}`}>
              <i className="fa-brands fa-github"></i> GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;