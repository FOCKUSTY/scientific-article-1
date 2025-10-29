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
