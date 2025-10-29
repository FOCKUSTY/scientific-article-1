import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
      >
        <span>Dropdown</span>
        <FaChevronDown />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100">Option 1</li>
            <li className="px-4 py-2 hover:bg-gray-100">Option 2</li>
            <li className="px-4 py-2 hover:bg-gray-100">Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
