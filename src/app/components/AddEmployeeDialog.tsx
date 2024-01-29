import { 
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogClose,
  Portal 
} from '@radix-ui/react-dialog';
import React, { 
  useRef, 
  useState,
  useEffect 
} from 'react';
import { useForm } from 'react-hook-form';
import useStore from '@/store/store';
// import generateNewGuid from './newGUID';
import { v4 as uuidv4 } from 'uuid';

const generateNewGuid = () => uuidv4();

const AddEmployeeDialog: React.FC = () => {
  const [step, setStep] = useState(1); // Step state
  const [formData, setFormData] = useState({ name: '', position: '', attendanceState: null}); // Form data state
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog open state
  const { register, handleSubmit, reset, setValue } = useForm();
  const { addEmployee } = useStore();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const positionInputRef = useRef<HTMLInputElement>(null);

  const openDialog = () => setDialogOpen(true); // Function to open the dialog
  const closeDialog = () => setDialogOpen(false); // Function to close the dialog

  const onSubmit = async () => {
    if (step === 1) {
      setStep(2); // Move to step 2
    } else if (step === 2) {
      setStep(3); // Move to step 3
    } else {
      const newEmployee = { 
        ...formData, 
        GUID: generateNewGuid() 
      };

      await addEmployee(newEmployee);
      resetFormAndClose(); // Reset the form fields and close dialog after submission
    }
  };

  const resetFormAndClose = () => {
    reset(); // Reset the form fields using react-hook-form's reset
    setFormData({ name: '', position: '' }); // Clear the local formData state
    setStep(1); // Reset to step 1
    closeDialog(); // Close the dialog
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValue(e.target.name, e.target.value); // Update react-hook-form's value
  };

  useEffect(() => {
    // When step is 1, focus on name input field
    if (step === 1 && nameInputRef.current) {
      nameInputRef.current.focus();
    }
    // When step is 2, focus on position input field
    else if (step === 2 && positionInputRef.current) {
      positionInputRef.current.focus();
    }
  }, [step]); // Only re-run the effect if step changes

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button onClick={openDialog} className="transition duration-200 text-black bg-white border-2 border-black px-5 py-2.5 rounded-full hover:text-white hover:bg-black">
          Tilføj deltager
        </button>
      </DialogTrigger>
      <Portal>
        <DialogOverlay className="fixed inset-0 bg-black/60 z-[1]" />
        <DialogContent className="fixed bg-white rounded-md top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 z-[2] p-[50px] w-[80%] max-w-[600px]">
          <DialogTitle
            className="text-4xl font-bold mb-[50px] text-center"
          >
            Tilføj deltager
          </DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white">
            <div className="flex flex-col">
              {step === 1 && (
                <input
                  {...register('name')}
                  ref={nameInputRef}
                  placeholder="Navn"
                  className="border-2 border-gray-300 px-5 py-2.5 rounded-full"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              )}
              {step === 2 && (
                <input
                  {...register('position')}
                  ref={positionInputRef}
                  placeholder="Titel"
                  className="border-2 border-gray-300 px-5 py-2.5 rounded-full"
                  value={formData.position}
                  onChange={handleInputChange}
                />
              )}
              {step === 3 && (
                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendanceState: true })}
                    className={`px-5 py-2.5 rounded-full ${formData.attendanceState === true ? 'bg-blue-700 text-white' : 'bg-gray-300 text-gray-700'}`}
                  >
                    Attending
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendanceState: false })}
                    className={`px-5 py-2.5 rounded-full ${formData.attendanceState === false ? 'bg-blue-700 text-white' : 'bg-gray-300 text-gray-700'}`}
                  >
                    Not Attending
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-center space-x-[20px] mt-[50px]">
              <DialogClose asChild>
                <button
                  type="button"
                  onClick={resetFormAndClose}
                  className="transition duration-200 text-black bg-white border-2 border-black px-5 py-2.5 rounded-full hover:text-white hover:bg-black"
                >
                  Fortryd
                </button>
              </DialogClose>
              <button
                type="submit"
                disabled={(step === 1 && formData.name.length < 3) || (step === 2 && formData.position.length < 3) || (step === 3 && formData.attendanceState === null)}
                className={`transition duration-200 text-white border-2 px-5 py-2.5 rounded-full ${((step === 1 && formData.name.length < 3) || (step === 2 && formData.position.length < 3) || (step === 3 && formData.attendanceState === null)) ? 'bg-gray-300 border-gray-300' : 'bg-blue-700 border-blue-700 hover:bg-black hover:border-black'}`}
              >
                {step === 1 ? 'Næste trin' : step === 2 ? 'Næste trin' : 'Gem og luk'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Portal>
    </Dialog>
  );
};

export default AddEmployeeDialog;
