Вот два компонента — Dropdown и Modal, реализованные с использованием React, Tailwind CSS и TypeScript. Я разделил логику на разные файлы, как ты и просил.

**1. `dropdown.tsx`**

```tsx
// src/components/Dropdown.tsx
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
```

**2. `modal.tsx`**

```tsx
// src/components/Modal.tsx
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl mb-4">Modal Title</h2>
        <p>This is a modal window. Press ESC to close it.</p>
      </div>
    </div>
  );
};

export default Modal;
```

**3. `useOutsideClick.ts` (custom hook)**

```tsx
// src/hooks/useOutsideClick.ts
import { useEffect } from "react";

export const useOutsideClick = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
```

**4. Пример использования в приложении**

```tsx
// src/App.tsx
import React, { useState } from "react";
import Dropdown from "./components/Dropdown";
import Modal from "./components/Modal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6">
      <Dropdown />
      <button
        onClick={openModal}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Open Modal
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;
```

### Объяснение:

1. **Dropdown**:

   * При клике по кнопке выпадает список. Закрытие происходит при клике вне компонента, используя хук `useOutsideClick`.
   * Кнопка с иконкой `FaChevronDown` открывает/закрывает меню.

2. **Modal**:

   * Открытие и закрытие модального окна контролируется через пропс `isOpen`.
   * При открытии окна добавляется обработчик клавиши `Escape`, который вызывает функцию закрытия.
   * Иконка закрытия `FaTimes` в правом верхнем углу модального окна.

3. **useOutsideClick**:

   * Хук для отслеживания кликов вне компонента, чтобы закрывать выпадающий список или меню.

### Установка зависимостей:

1. **React, Tailwind, React Icons**:

   ```
   npm install react react-dom tailwindcss react-icons
   ```

   Для настройки Tailwind нужно выполнить команду:

   ```
   npx tailwindcss init
   ```

### Итог:

Все компоненты организованы в отдельные файлы, используются хуки для управления состоянием и обработки событий, компоненты удобны для использования в более крупных приложениях.
