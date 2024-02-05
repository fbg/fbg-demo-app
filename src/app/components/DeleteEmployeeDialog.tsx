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
                    className="bg-red-500 text-white p-[3px] rounded-full hover:bg-red-700 transition duration-200 ml-[10px]"
                    aria-label="Delete"
                >
                    <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path></svg>
                </button>
            </DialogTrigger>
            <Portal>
                <DialogOverlay className="fixed inset-0 bg-black/60 z-[1]" />
                <DialogContent className="fixed bg-white p-4 rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] p-[50px]">
                    <DialogTitle className="text-4xl font-bold mb-[50px] text-center">
                        Slet deltager
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Er du sikker på, at du vil slette {employeeName}?<br />Handlingen kan ikke fotrydes.
                    </DialogDescription>
                    <div className="flex justify-center space-x-[20px] mt-[50px]">
                    <DialogClose asChild>
                        <button 
                        ref={closeButtonRef} 
                        className="transition duration-200 text-black bg-white border-2 border-black px-5 py-2.5 rounded-full drop-shadow-lg hover:text-white hover:bg-black">
                            Fortryd
                        </button>
                    </DialogClose>
                        <button
                            onClick={handleDelete}
                            className="transition duration-200 text-white border-2 px-5 py-2.5 rounded-full bg-red-500 border-red-500 drop-shadow-lg hover:bg-black hover:border-black"
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
