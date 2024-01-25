interface Employee {
  GUID: string;
  name: string;
  position: string;
  attendanceState: boolean;
}

export const fetchEmployeeData = async (): Promise<Employee[]> => {
  const response = await fetch('/api/employeeData');
  return response.json();
};

export const insertEmployee = async (newEmployee: Employee): Promise<boolean> => {
  try {
    const response = await fetch('/api/employeeData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    });

    if (!response.ok) {
      throw new Error('Error inserting employee');
    }
    return true;
  } catch (error) {
    console.error('Error inserting employee:', error);
    return false; // return null in case of an error
  }
};


export const deleteEmployeeByGUID = async (GUID: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/employeeData?GUID=${GUID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting employee');
    }

    return true;
  } catch (error) {
    console.error('Error deleting employee:', error);
    return false;
  }
};

export const updateEmployeeByGUID = async (GUID: string, updatedData: Partial<Employee>): Promise<boolean> => {
  try {
    // Fetch the existing employee data using GUID
    const response = await fetch(`/api/employeeData?GUID=${GUID}`);
    if (!response.ok) {
      throw new Error('Error fetching employee data for update');
    }

    // Parse the existing employee data
    const existingEmployees: Employee[] = await response.json();
    const existingEmployee = existingEmployees.find(emp => emp.GUID === GUID);
    if (!existingEmployee) {
      throw new Error('Employee not found for the provided GUID');
    }
    
    const updatedEmployee: Employee = {
      ...existingEmployee,
      ...updatedData,
      GUID, // Ensure the GUID is not changed
    };
    
    // Send the updated employee data to the server
    const updateResponse = await fetch('/api/employeeData', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEmployee),
    });

    if (!updateResponse.ok) {
      throw new Error('Error updating employee');
    }

    return true;
  } catch (error) {
    console.error('Error updating employee:', error);
    return false;
  }
};

