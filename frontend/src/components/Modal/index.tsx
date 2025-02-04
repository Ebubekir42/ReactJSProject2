import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const Modal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Handle click outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white p-5 rounded-2xl shadow-xl relative"
      >
        {children}
        <button
          className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full"
          onClick={onClose}
        >
          &#10006;
        </button>
      </motion.div>
    </div>
  );
};



export default Modal;
