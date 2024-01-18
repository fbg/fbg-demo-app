import { create } from 'zustand';
import { fetchEmployeeData,insertEmployee,deleteEmployeeByGUID,updateEmployeeByGUID } from '@/app/components/employeeDataHandler';

interface Employee {
  GUID: string;
  name: string;
  position: string;
  attendanceState: boolean;
}

interface State {
  employees: Map<string, Employee>; // Change employees to a Map
  toggleAttendance: (GUID: string) => void;
  isGrouped: boolean;
  toggleGrouping: () => void;
  addEmployee: (employee: Employee) => Promise<void>;
  removeEmployee: (GUID: string) => Promise<void>;
  fetchEmployeeData: () => Promise<void>;
}

const useStore = create<State>((set) => ({
  employees: new Map(), // Initialize as an empty Map
  toggleAttendance: (GUID) => set(async (state) => {
    const employee = state.employees.get(GUID);
    if (employee) {
      // Toggle attendance state
      const updatedEmployee = { ...employee, attendanceState: !employee.attendanceState };

      

      const myObject = {
        GUID: '83693646-7eab-4092-b7ec-26b5e7cc1dc6',
        name: 'Anders Christian Jensen',
        position: 'Senior Systems Developer',
        attendanceState: true
      };
      
      console.log('src/store/store.ts:');
      console.log(myObject);

      

      // Update the employee data on the server
      const success = await updateEmployeeByGUID(GUID, myObject);

      if (success) {
        // If the update was successful, update the local state
        const updatedEmployees = new Map(state.employees);
        updatedEmployees.set(GUID, updatedEmployee);
        return { ...state, employees: updatedEmployees };
      }
    }
    return state;
  }),
    isGrouped: true,
  toggleGrouping: () => set((state) => ({
    ...state,
    isGrouped: !state.isGrouped,
  })),
  fetchEmployeeData: async () => {
    try {
      const employees = await fetchEmployeeData();
      set((state) => ({ ...state, employees: new Map(employees.map((employee) => [employee.GUID, employee])) }));
    } catch (error) {
      console.error('Error fetching employee data:', error);
      // Handle the error here or return an empty Map if needed
    }
  },
  addEmployee: async (employee) => {
    const success = await insertEmployee(employee);
    if (success) {
      set((state) => ({
        ...state,
        employees: new Map([...state.employees, [employee.GUID, employee]]),
      }));
    }
  },
  removeEmployee: async (GUID) => {
    const success = await deleteEmployeeByGUID(GUID);
    if (success) {
      const updatedEmployees = new Map(state.employees);
      updatedEmployees.delete(GUID);
      set((state) => ({
        ...state,
        employees: updatedEmployees,
      }));
    }
  },
}));

export default useStore;
