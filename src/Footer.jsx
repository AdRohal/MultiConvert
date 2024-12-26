import React from 'react';

function Footer({ darkMode }) {
  return (
    <footer className={`footer p-4 border-t-2 ${darkMode ? '' : 'bg-white border-orange-500'}`}>
      <div className="container mx-auto text-center">
        <p className={`${darkMode ? 'text-gray-300' : 'text-orange-500'}`}>&copy; 2024 Multi-Convert. All rights reserved.</p>
        <div className="flex justify-center mt-4">
          <a href="/privacy-policy" className={`mx-2 ${darkMode ? 'text-gray-300 hover:underline' : 'text-orange-500 hover:underline'}`}>Privacy Policy</a>
          <a href="/terms-of-service" className={`mx-2 ${darkMode ? 'text-gray-300 hover:underline' : 'text-orange-500 hover:underline'}`}>Terms of Service</a>
          <a href="/contact" className={`mx-2 ${darkMode ? 'text-gray-300 hover:underline' : 'text-orange-500 hover:underline'}`}>Contact Us</a>
        </div>
        <div className="mt-4">
          <p className={`${darkMode ? 'text-gray-300' : 'text-orange-500'}`}>Created by AdRohal</p>
          <a href="https://www.linkedin.com/in/adrohal" className={`${darkMode ? 'text-gray-300 hover:underline' : 'text-orange-500 hover:underline'}`}>LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;