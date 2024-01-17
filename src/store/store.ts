import { create } from 'zustand'
import employeeData from "@/app/components/employeeData";

interface Employee {
    id: number;
    name: string;
    position: string;
    attendanceState: boolean;
}

interface State {
    employees: Employee[],
    toggleAttendance: (id: number) => void,
    isGrouped: boolean,
    toggleGrouping: () => void;
}

const useStore = create<State>((set) => ({
    employees: employeeData,
    toggleAttendance: (id) => set((state) => {
        const employees = state.employees.map(employee => 
            employee.id === id ? {...employee, attendanceState: !employee.attendanceState} : employee
        );
        return { ...state, employees };
    }),
    isGrouped: true,
    toggleGrouping: () => set((state) => ({
        ...state, 
        isGrouped: !state.isGrouped
    })),  
}));

export default useStore;
