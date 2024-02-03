// src/app/components/employeeDataHandlerForLocalstorage.ts
interface Employee {
  GUID: string;
  name: string;
  position: string;
  attendanceState: boolean;
}

const localStorageKey = 'employees';

const getLocalStorageEmployees = (): Employee[] => {
  const employeesJson = localStorage.getItem(localStorageKey);
  return employeesJson ? JSON.parse(employeesJson) : [];
};

const setLocalStorageEmployees = (employees: Employee[]): void => {
  localStorage.setItem(localStorageKey, JSON.stringify(employees));
};

export const fetchEmployeeData = async (): Promise<Employee[]> => {
  return getLocalStorageEmployees();
};

export const insertEmployee = async (newEmployee: Employee): Promise<boolean> => {
  try {
    const employees = getLocalStorageEmployees();
    employees.push(newEmployee);
    setLocalStorageEmployees(employees);
    return true;
  } catch (error) {
    console.error('Error inserting employee:', error);
    return false;
  }
};

export const deleteEmployeeByGUID = async (GUID: string): Promise<boolean> => {
  try {
    const employees = getLocalStorageEmployees();
    const filteredEmployees = employees.filter(employee => employee.GUID !== GUID);
    setLocalStorageEmployees(filteredEmployees);
    return true;
  } catch (error) {
    console.error('Error deleting employee:', error);
    return false;
  }
};

export const updateEmployeeByGUID = async (GUID: string, updatedData: Partial<Employee>): Promise<boolean> => {
  try {
    const employees = getLocalStorageEmployees();
    const employeeIndex = employees.findIndex(emp => emp.GUID === GUID);
    if (employeeIndex === -1) {
      throw new Error('Employee not found for the provided GUID');
    }

    const updatedEmployee = { ...employees[employeeIndex], ...updatedData };
    employees[employeeIndex] = updatedEmployee;
    setLocalStorageEmployees(employees);
    return true;
  } catch (error) {
    console.error('Error updating employee:', error);
    return false;
  }
};
