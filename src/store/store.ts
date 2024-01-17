import { create } from 'zustand'
import employeeData from "@/app/components/employeeData";

interface Employee {
    id: number;
    name: string;
    position: string;
    attendanceState: boolean;
}

interface State {
    employees: Map<number, Employee>;
    toggleAttendance: (id: number) => void;
    isGrouped: boolean;
    toggleGrouping: () => void;
}

const useStore = create<State>((set) => ({
    // Initialize the employees state as a Map for efficient access by id
    employees: new Map(employeeData.map(employee => [employee.id, employee])),
    toggleAttendance: (id) => set((state) => {
        const employee = state.employees.get(id);
        if (employee) {
            const updatedEmployee = { ...employee, attendanceState: !employee.attendanceState };
            const updatedEmployees = new Map(state.employees);
            updatedEmployees.set(id, updatedEmployee);
            return { ...state, employees: updatedEmployees };
        }
        return state; // Return the current state if the id is not found
    }),
    isGrouped: true,
    toggleGrouping: () => set((state) => ({
        ...state,
        isGrouped: !state.isGrouped
    })),
}));

export default useStore;
