import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const EmployeeFormTransition: React.FC<{ 
  currentStep: number, 
  setAnimationCompleted: (completed: boolean) => void, 
  children: React.ReactNode, 
  isNavigatingForward: boolean 
}> = ({ currentStep, setAnimationCompleted, children, isNavigatingForward }) => {
  // Use the `isNavigatingForward` flag to determine the direction of the animation
  const variants = {
    initial: (isForward: boolean) => ({ x: isForward ? '100%' : '-100%' }),
    animate: { x: '0%' },
    exit: (isForward: boolean) => ({ x: isForward ? '-100%' : '100%' }),
  };

  return (
    <AnimatePresence custom={isNavigatingForward} initial={false}>
      <motion.div
        key={currentStep}
        custom={isNavigatingForward}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: "tween", duration: 0.5 }}
        onAnimationComplete={() => setAnimationCompleted(true)}
        className="absolute inset-0 w-screen flex"
      >
        <div className="w-full flex flex-1 flex-col justify-center items-center relative">
          <div className="my-auto w-full px-[20px] md:px-[50px] lg:px-[150px] max-w-[1200px]">
            {children}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmployeeFormTransition;
