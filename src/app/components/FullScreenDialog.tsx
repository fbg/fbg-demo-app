// components/FullScreenDialog.tsx

import React, { ReactNode, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface FullScreenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const FullScreenDialog: React.FC<FullScreenDialogProps> = ({ isOpen, onClose, children }) => {
  // Update the body's overflow style based on isOpen
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    // Cleanup function to set overflow to 'visible' when component unmounts
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]); // Only re-run the effect if isOpen changes

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/60"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="w-full flex flex-col h-screen overflow-auto bg-white"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the dialog
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenDialog;
