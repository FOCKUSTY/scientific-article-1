**dropdown.tsx**
```tsx
import { useState, useRef, useEffect } from 'react';
import { IoChevronDown } from 'react-icons/io5';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export const Dropdown = ({ trigger, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
      >
        {trigger}
        <IoChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50">
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className="px-4 py-2 hover:bg-gray-100 cursor-pointer first:rounded-t-lg last:rounded-b-lg"
  >
    {children}
  </div>
);
```

**modal.tsx**
```tsx
import { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl m-4 max-w-md w-full">
        <div className="flex justify-end p-2">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
};
```