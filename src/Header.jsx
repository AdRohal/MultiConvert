import React, { useState, useEffect, useRef } from 'react';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between bg-white p-4 border-b-2 border-orange-500" style={{ paddingBottom: '0px', paddingTop: '0px' }}>
      <img src="/favicon.png" alt="Logo" className="h-12" />
      <div className="flex items-center">
        <nav className="flex items-center">
          <a href="/" className="text-orange-500">Home</a>
          <div className="h-6 border-l border-orange-500 mx-2"></div>
          <div className="relative" ref={dropdownRef}>
            <button className="text-orange-500" onClick={toggleDropdown}>
              Convert <i className="fas fa-chevron-down ml-1"></i>
            </button>
            <div className={`absolute bg-white shadow-md mt-4 border border-orange-500 ${dropdownOpen ? 'block' : 'hidden'}`} style={{ marginLeft: '-90px', width: '21rem' }}>
              <div className="flex flex-wrap">
                <a href="/convert-pdf" className="block w-1/2 px-4 py-2 text-orange-500 hover:bg-gray-100 border-r border-orange-500">Convert Document</a>
                <a href="/convert-images" className="block w-1/2 px-4 py-2 text-orange-500 hover:bg-gray-100">Convert Images</a>
                <a href="/convert-music" className="block w-1/2 px-4 py-2 text-orange-500 hover:bg-gray-100 border-r border-orange-500">Convert Music</a>
                <a href="/convert-videos" className="block w-1/2 px-4 py-2 text-orange-500 hover:bg-gray-100">Convert Videos</a>
              </div>
            </div>
          </div>
          <div className="h-6 border-l border-orange-500 mx-4"></div>
        </nav>
        <button className="bg-orange-500 text-white px-4 py-2 ml-4 flex items-center justify-center rounded-full" style={{ marginLeft: '0px', paddingTop: '3px', paddingBottom: '3px', paddingRight: '9px', paddingLeft: '9px' }} onClick={toggleDarkMode}>
          {darkMode ? (
            <>
              <i className="fas fa-sun mr-2"></i> Light Mode
            </>
          ) : (
            <>
              <i className="fas fa-moon mr-2"></i> Dark Mode
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;