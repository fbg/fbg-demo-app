import { create } from 'zustand';
import {
  fetchEmployeeData,
  insertEmployee,
  deleteEmployeeByGUID,
  updateEmployeeByGUID
} from 'EmployeeDataHandler';

interface Employee {
  GUID: string;
  name: string;
  position: string;
  attendanceState: boolean;
}

interface State {
  employees: Map<string, Employee>;
  toggleAttendance: (GUID: string) => void;
  isGrouped: boolean;
  toggleGrouping: () => void;
  addEmployee: (employee: Employee) => Promise<void>;
  removeEmployee: (GUID: string) => Promise<void>;
  fetchEmployeeData: () => Promise<void>;
}

const useStore = create<State>((set, get) => ({
  employees: new Map(),
  toggleAttendance: async (GUID: string) => {
    const employee = get().employees.get(GUID);
    if (employee) {
      const updatedEmployee = { ...employee, attendanceState: !employee.attendanceState };
      const success = await updateEmployeeByGUID(GUID, updatedEmployee);
      if (success) {
        set((state) => {
          const employees = new Map(state.employees);
          employees.set(GUID, updatedEmployee);
          return { ...state, employees };
        });
      }
    }
  },
  isGrouped: true,
  toggleGrouping: () => set((state) => ({
    ...state,
    isGrouped: !state.isGrouped,
  })),
  fetchEmployeeData: async () => {
    try {
      const employees = await fetchEmployeeData();
      set((state) => ({
        ...state,
        employees: new Map(employees.map((employee) => [employee.GUID, employee]))
      }));
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  },
  addEmployee: async (employee) => {
    const success = await insertEmployee(employee);
    if (success) {
      console.log(`Employee added: ${employee.GUID}`);
      set((state) => {
        const employees = new Map(state.employees);
        employees.set(employee.GUID, employee);
        return { ...state, employees };
      });
    } else {
      console.error('Failed to add employee');
    }
  },
  removeEmployee: async (GUID) => {
    const success = await deleteEmployeeByGUID(GUID);
    if (success) {
      console.log(`Employee with GUID: ${GUID} removed`);
      set((state) => {
        const employees = new Map(state.employees);
        employees.delete(GUID);
        return { ...state, employees };
      });
    } else {
      console.error('Failed to delete employee');
    }
  }
}));

export default useStore;
