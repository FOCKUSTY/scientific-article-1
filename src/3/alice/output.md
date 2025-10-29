**dropdown.tsx**
```tsx
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
```

**modal.tsx**
```tsx
import { useState, useRef, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        ref={ref}
        className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={onClose}
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="p-4 overflow-auto max-h-[calc(90vh-8rem)]">{children}</div>
      </div>
    </div>
  );
};
```