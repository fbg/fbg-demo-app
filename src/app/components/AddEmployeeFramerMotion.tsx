// components/AddEmployeeFramerMotion.tsx

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import useStore from '@/store/store';
import { v4 as uuidv4 } from 'uuid';
import FullScreenDialog from './FullScreenDialog';
import AddEmployeeFramerStepOne from './AddEmployeeFramerStepOne';
import AddEmployeeFramerStepTwo from './AddEmployeeFramerStepTwo';
import AddEmployeeFramerStepThree from './AddEmployeeFramerStepThree';
import EmployeeFormTransition from './EmployeeFormTransition';


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
  const closeDialog = () => setDialogOpen(false);
  const stepTitles = [
    "Trin 1: Angiv navn",
    "Trin 2: Angiv titel",
    "Trin 3: Angiv status for deltagelse",
  ];

  interface Employee {
    name: string;
    position: string;
    attendanceState: boolean;
    GUID: string;
  }

  const changeStep = (newStep: React.SetStateAction<number>) => {
    setAnimationCompleted(false); // Reset animation completion before changing steps
    setCurrentStep(newStep);
  };

  const onSubmit = async () => {
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
        attendanceState: formData.attendanceState,
    };
          await addEmployee(newEmployee); // make sure addEmployee function accepts an Employee type
      resetFormAndClose();
    } else {
      console.log('step definition is missing');
    }
  };

  const resetFormAndClose = () => {
    reset();
    setUserHasInteracted(false);
    setCurrentStep(1);
    closeDialog();
  };

  const goToNextStep = () => {
    if ((currentStep === 1 && name.length >= 3) || (currentStep === 2 && position.length >= 3)) {
      changeStep(currentStep + 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AddEmployeeFramerStepOne goToNextStep={goToNextStep} />;
      case 2:
        return <AddEmployeeFramerStepTwo goToNextStep={goToNextStep} animationCompleted={animationCompleted} />;
      case 3:
        return <AddEmployeeFramerStepThree setUserHasInteracted={setUserHasInteracted} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <button onClick={openDialog} className="transition duration-200 text-black bg-white border-2 border-black px-5 py-2.5 rounded-full hover:text-white hover:bg-black">
        Tilføj deltager
      </button>
      <FullScreenDialog isOpen={dialogOpen} onClose={resetFormAndClose}>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-1 flex-col py-[50px]"
          >
            <div className="text-4xl font-bold mb-[25px] text-center">
              Tilføj deltager
            </div>
            <div className="flex items-center justify-center h-full overflow-auto overflow-x-hidden py-[50px] relative">
            <EmployeeFormTransition currentStep={currentStep} setAnimationCompleted={setAnimationCompleted}>
              {renderStep()}
            </EmployeeFormTransition>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={resetFormAndClose}
                className="min-w-[130px] transition duration-200 text-black bg-white border-2 border-black px-5 py-2.5 rounded-full hover:text-white hover:bg-black"
              >
                Fortryd
              </button>
              {currentStep < 3 && (
                <button
                  type="button"
                  onClick={() => changeStep(currentStep + 1)}
                  disabled={currentStep === 1 ? name.length < 3 : position.length < 3} // Disable if conditions are not met
                  className={`min-w-[130px] transition duration-200 text-white border-2 px-5 py-2.5 rounded-full ${currentStep === 1 && name.length < 3 || currentStep === 2 && position.length < 3 ? 'bg-gray-300 border-gray-300' : 'bg-blue-700 border-blue-700 hover:bg-black hover:border-black'}`}
                >
                  Næste trin
                </button>
              )}
              {currentStep === 3 && (
                <button
                  type="submit"
                  disabled={getValues("attendanceState") === null || !userHasInteracted} // Disable if attendanceState is not set or user hasn't interacted
                  className={`min-w-[130px] transition duration-200 text-white border-2 px-5 py-2.5 rounded-full ${getValues("attendanceState") === null || !userHasInteracted ? 'bg-gray-300 border-gray-300' : 'bg-blue-700 border-blue-700 hover:bg-black hover:border-black'}`}
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
