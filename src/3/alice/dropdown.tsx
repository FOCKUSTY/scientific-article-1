import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';

interface DropdownProps {
  options: string[];
  placeholder?: string;
}

export const Dropdown = ({ options, placeholder = 'Выберите...' }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleDocumentClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const selectOption = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64" ref={ref}>
      <button
        type="button"
        className="w-full px-4 py-2 text-left border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(true)}
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-500'}>
          {selected || placeholder}
        </span>
        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2" />
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
              onClick={() => selectOption(option)}
            >
              {option}
              {selected === option && <FiX className="text-gray-400" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
