import React, { useState } from "react";

const NavBarItem = ({ title, classprops, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li
      className={`mx-4 cursor-pointer ${classprops} relative`}
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      {title}
      {children && isOpen && (
        <ul className="absolute left-0 mt-2 w-40 bg-gray-800 rounded-md p-2 shadow-lg z-50">
          {children}
        </ul>
      )}
    </li>
  );
};

export default NavBarItem;
