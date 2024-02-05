import { 
    Dialog, 
    DialogTrigger, 
    DialogOverlay, 
    DialogContent, 
    DialogTitle, 
    DialogDescription, 
    DialogClose 
} from '@radix-ui/react-dialog';

import { Portal } from '@radix-ui/react-portal';
import React, { useRef } from 'react';

interface DeleteEmployeeDialogProps {
    employeeName: string,
    employeeGUID: string;
    onConfirm: (guid: string) => void;
}
  
const DeleteEmployeeDialog: React.FC<DeleteEmployeeDialogProps> = ({ employeeGUID, employeeName, onConfirm }) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const handleDelete = () => {
        onConfirm(employeeGUID);
        // Close the dialog after calling the onConfirm function
        closeButtonRef.current?.click();
    };
  
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200 ml-[20px]"
                aria-label="Delete"
                >
                    <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M6 18L18 6M6 6l12 12"
                        >
                        </path>
                    </svg>
                </button>
            </DialogTrigger>
            <Portal>
                <DialogOverlay className="fixed inset-0 bg-black/60 z-[1]" />
                <DialogContent className="fixed bg-white p-4 rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] p-[50px]">
                    <DialogTitle
                    className="text-4xl font-bold mb-[50px] text-center"
                    >
                        Slet deltager
                    </DialogTitle>
                    <DialogDescription
                    className="text-center"
                    >
                        Er du sikker på, at du vil slette {employeeName}?<br />Handlingen kan ikke fotrydes.
                    </DialogDescription>
                    <div className="flex justify-center space-x-[20px] mt-[50px]">
                    <DialogClose asChild>
                        <button 
                        ref={closeButtonRef} 
                        className="transition duration-200 text-black bg-white border-2 border-black px-5 py-2.5 rounded-full hover:text-white hover:bg-black">
                            Fortryd
                        </button>
                    </DialogClose>
                        <button
                        onClick={handleDelete}
                        className="transition duration-200 text-white border-2 px-5 py-2.5 rounded-full bg-red-500 border-red-500 hover:bg-black hover:border-black"
                        >
                            Slet
                        </button>
                    </div>
                </DialogContent>
            </Portal>
        </Dialog>
    );
  };
    
export default DeleteEmployeeDialog;
