import React, { useState } from "react";
import Dropdown from "./components/dropdown";
import Modal from "./components/modal";

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
