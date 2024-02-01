// components/EmployeeFormTransition.tsx

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const EmployeeFormTransition: React.FC<{ currentStep: number, setAnimationCompleted: (completed: boolean) => void, children: React.ReactNode }> = ({ currentStep, setAnimationCompleted, children }) => {
  return (
    <AnimatePresence custom={currentStep}>
      <motion.div
        key={currentStep}
        initial={currentStep === 1 ? { x: '0%' } : { x: '100%' }}
        animate={{ x: '0%' }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={() => setAnimationCompleted(true)}
        className="absolute inset-0 w-screen flex"
      >
        <div className="w-full flex flex-1 flex-col justify-center items-center relative">
          <div className="my-auto w-full px-[20px]">
            {children}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmployeeFormTransition;
