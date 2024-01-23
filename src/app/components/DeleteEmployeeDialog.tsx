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
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
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
                    <DialogTitle>
                        <h2 className="text-4xl font-bold mb-[50px] text-center">Slet deltager</h2>
                    </DialogTitle>
                    <DialogDescription>
                        Er du sikker på, at du vil slette {employeeName}? Handlingen kan ikke fotrydes.
                    </DialogDescription>
                    <div className="flex justify-end space-x-2 mt-4">
                    <DialogClose asChild>
                        <button 
                        ref={closeButtonRef} 
                        className="px-4 py-2 rounded text-gray-700 bg-gray-200 hover:bg-gray-300">
                            Fortryd
                        </button>
                    </DialogClose>
                        <button
                        onClick={handleDelete}
                        className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-700"
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
