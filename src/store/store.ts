import { create } from 'zustand'
import employeeData from "@/app/components/employeeData";

interface State{
    employees: Employee[],
    attendance: AttendanceState,
    toggleAttendance: (id: number) => void,
}

interface Employee {
    id: number;
    name: string;
    position: string;
    attendanceState: boolean;
}

type AttendanceState = { [key: number]: boolean };

const useStore = create<State>((set) => ({
    employees: employeeData,
    attendance: {},
    toggleAttendance: (id) => set((state) => {
        return {...state, attendance:{
            ...state.attendance,
            [id]: !state.attendance[id]
        }} 
    })
}))

export default useStore;