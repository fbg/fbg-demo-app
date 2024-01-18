import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const dataFilePath = 'src/app/lars/JSON/employeeData.json';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const rawData = fs.readFileSync(dataFilePath, 'utf-8');
      const employees = JSON.parse(rawData);
      res.status(200).json(employees);
    } catch (error) {
      console.error('Error reading employee data:', error);
      res.status(500).json({ error: 'Error reading employee data' });
    }
  } else if (req.method === 'POST') {
    try {
      const rawData = fs.readFileSync(dataFilePath, 'utf-8');
      const employees = JSON.parse(rawData);
      const newEmployee = JSON.parse(req.body);

      // Generate a new GUID for the employee
      const GUID = generateGUID();

      // Add the GUID to the new employee data
      newEmployee.GUID = GUID;

      // Add the new employee to the existing employees
      employees.push(newEmployee);

      // Write the updated data back to the file
      fs.writeFileSync(dataFilePath, JSON.stringify(employees, null, 2), 'utf-8');

      res.status(201).json({ success: true, message: 'Employee inserted successfully' });
    } catch (error) {
      console.error('Error inserting employee:', error);
      res.status(500).json({ error: 'Error inserting employee' });
    }
  } else if (req.method === 'PUT') {
    try {
      const rawData = fs.readFileSync(dataFilePath, 'utf-8');
      const employees = JSON.parse(rawData);
      const updatedEmployee = JSON.parse(req.body);

      // Find the index of the employee with the matching GUID
      const index = employees.findIndex((employee) => employee.GUID === updatedEmployee.GUID);

      if (index !== -1) {
        // Merge the updated data with the existing employee data
        employees[index] = { ...employees[index], ...updatedEmployee };

        // Write the updated data back to the file
        fs.writeFileSync(dataFilePath, JSON.stringify(employees, null, 2), 'utf-8');

        res.status(200).json({ success: true, message: 'Employee updated successfully' });
      } else {
        res.status(404).json({ error: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ error: 'Error updating employee' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const rawData = fs.readFileSync(dataFilePath, 'utf-8');
      const employees = JSON.parse(rawData);
      const GUID = req.query.GUID as string;

      // Find the index of the employee with the matching GUID
      const index = employees.findIndex((employee) => employee.GUID === GUID);

      if (index !== -1) {
        // Remove the employee from the array
        employees.splice(index, 1);

        // Write the updated data back to the file
        fs.writeFileSync(dataFilePath, JSON.stringify(employees, null, 2), 'utf-8');

        res.status(200).json({ success: true, message: 'Employee deleted successfully' });
      } else {
        res.status(404).json({ error: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ error: 'Error deleting employee' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

// Function to generate a GUID
function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
