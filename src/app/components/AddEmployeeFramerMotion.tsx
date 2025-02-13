// components/AddEmployeeFramerMotion.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import useStore from '@/store/store';
import { v4 as uuidv4 } from 'uuid';
import FullScreenDialog from './FullScreenDialog';
import AddEmployeeFramerStepOne from './AddEmployeeFramerStepOne';
import AddEmployeeFramerStepTwo from './AddEmployeeFramerStepTwo';
import AddEmployeeFramerStepThree from './AddEmployeeFramerStepThree';
import EmployeeFormTransition from './EmployeeFormTransition';
import AddEmployeeProgressBar from './AddEmployeeProgressBar';
import "@/app/css/progressbar.css";


const generateNewGuid = () => uuidv4();

const AddEmployeeFramerMotion: React.FC = () => {
  const formMethods = useForm();
  const { handleSubmit, reset, getValues, watch } = formMethods;
  const { addEmployee } = useStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const name = watch("name", "");
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const position = watch("position", "");
  const openDialog = () => setDialogOpen(true);
  const closeDialog = useCallback(() => {
    setDialogOpen(false);
  }, []); // `closeDialog` has no dependencies, so the dependency array is empty
 
  const [isNavigatingForward, setIsNavigatingForward] = useState(true);


  interface Employee {
    name: string;
    position: string;
    attendanceState: boolean;
    GUID: string;
  }

  const changeStep = useCallback((newStep: number) => {
    setIsNavigatingForward(newStep >= currentStep);
    setAnimationCompleted(false); // Reset animation completion before changing steps
    setCurrentStep(newStep);
  }, [currentStep]); // Include all state variables used inside `changeStep` as dependencies
  
  const resetFormAndClose = useCallback(() => {
    reset();
    setUserHasInteracted(false);
    setCurrentStep(1);
    closeDialog();
    setIsNavigatingForward(true);
  }, [reset, closeDialog]); // Add dependencies used inside `resetFormAndClose`
  
  const goToNextStep = useCallback(() => {
    if ((currentStep === 1 && name.length >= 3) || (currentStep === 2 && position.length >= 3)) {
      changeStep(currentStep + 1);
    }
  }, [currentStep, name.length, position.length, changeStep]); // Add all dependencies used inside goToNextStep

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      // Explicitly set navigating forward to false when going to a previous step
      setIsNavigatingForward(false);
      setCurrentStep(currentStep - 1);
    }
  };

  
  const onSubmit = useCallback(async () => {
    if (currentStep === 1) {
      changeStep(2);
    } else if (currentStep === 2) {
      changeStep(3);
    } else if (currentStep === 3) {
      const formData = getValues(); // assuming formData has all the fields required by Employee

      const newEmployee: Employee = {
        GUID: generateNewGuid(),
        name: formData.name,
        position: formData.position,
        attendanceState: formData.attendanceState ?? false, //fallback value, because the radix UI switch does not send a value unless it's been toggled at least 1 time
    };
    await addEmployee(newEmployee); // make sure addEmployee function accepts an Employee type
      resetFormAndClose();
    } else {
      console.log('step definition is missing');
    }
  }, [currentStep, getValues, addEmployee, resetFormAndClose, changeStep]); // Include `changeStep` if used within `onSubmit`
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AddEmployeeFramerStepOne />;
      case 2:
        return <AddEmployeeFramerStepTwo animationCompleted={animationCompleted} />;
      case 3:
        return <AddEmployeeFramerStepThree />;
      default:
        return null;
    }
  };

  // Check for keydown on enter and tab. 
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault(); // Prevent the default tabbing behavior
        if (currentStep === 1 || (currentStep === 2 && animationCompleted)) {
          goToNextStep();
        } 
        else if (e.key === 'Enter' && currentStep === 3 && animationCompleted) {
          handleSubmit(onSubmit)(); // Programmatically trigger form submission
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit, onSubmit, currentStep, animationCompleted, goToNextStep]); // Dependencies for useEffect


  return (
    <div>
      <button onClick={openDialog} className="transition duration-200 text-black bg-white border-2 border-black px-5 py-2.5 drop-shadow-lg rounded-full hover:text-white hover:bg-black">
        Tilføj deltager
      </button>
      <FullScreenDialog isOpen={dialogOpen} onClose={resetFormAndClose}>
        <button
          type="button"
          onClick={resetFormAndClose}
          className="transition duration-200 text-black bg-white border-2 border-black p-2.5 rounded-full  drop-shadow-lg absolute top-[20px] right-[20px] md:top-[50px] md:right-[50px] lg:top-[150px] lg:right-[150px] hover:text-white hover:bg-black"
        >
          <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path></svg>
        </button>
        <FormProvider {...formMethods}>
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-1 flex-col py-[50px] md:py-[100px] lg:py-[150px]"
          >
            <div className="text-4xl font-bold mb-[25px] text-center">
              Tilføj deltager
            </div>
            <AddEmployeeProgressBar step={currentStep} />
            <div className="flex items-center justify-center h-full overflow-auto overflow-x-hidden py-[50px] relative">
              <EmployeeFormTransition currentStep={currentStep} setAnimationCompleted={setAnimationCompleted} isNavigatingForward={isNavigatingForward}>
                {renderStep()}
              </EmployeeFormTransition>
            </div>
            <div className="flex justify-between px-[20px] md:px-[100px] lg:px-[150px]">
              <button
                type="button"
                onClick={goToPreviousStep}
                disabled={currentStep === 1} // Disable in step 1
                className={`min-w-[130px] transition duration-200 text-black bg-white border-2 border-black px-5 py-2.5 rounded-full drop-shadow-lg hover:text-white hover:bg-black mr-2
                ${currentStep === 1 ? 'opacity-0' : 'opacity-100'} `}
              >
                Tilbage
              </button>
              {currentStep < 3 && (
                <button
                  type="button"
                  onClick={() => changeStep(currentStep + 1)}
                  disabled={currentStep === 1 ? name.length < 3 : position.length < 3} // Disable if conditions are not met
                  className={`justify-self-end min-w-[130px] transition duration-200 text-white border-2 px-5 py-2.5 rounded-full ${currentStep === 1 && name.length < 3 || currentStep === 2 && position.length < 3 ? 'bg-gray-300 border-gray-300' : 'drop-shadow-lg bg-portalcolor border-portalcolor hover:bg-black hover:border-black'}`}
                >
                  Næste trin
                </button>
              )}
              {currentStep === 3 && (
                <button
                  type="submit"
                  className="min-w-[130px] transition duration-200 text-white border-2 px-5 py-2.5 rounded-full drop-shadow-lg bg-portalcolor border-portalcolor hover:bg-black hover:border-black"
                >
                  Gem og luk
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </FullScreenDialog>
    </div>
  );
};

export default AddEmployeeFramerMotion;
