import { create } from 'zustand'
import employeeData from "@/app/components/employeeData";

interface Employee {
    id: number;
    name: string;
    position: string;
    attendanceState: boolean;
}

type AttendanceState = { [key: number]: boolean };

interface State{
    employees: Employee[],
    attendance: AttendanceState,
    toggleAttendance: (id: number) => void,
}

const AttendanceDefault = () => {
    const useStateDefault: {[key: number]: boolean} = {};
    employeeData.map((employee) => {
        useStateDefault[employee.id] = employee.attendanceState;
    });
    return useStateDefault;
}

const useStore = create<State>((set) => ({
    employees: employeeData,
    attendance: AttendanceDefault(),
    toggleAttendance: (id) => set((state) => {
        return {...state, attendance:{
            ...state.attendance,
            [id]: !state.attendance[id]
        }} 
    })
}))

export default useStore;