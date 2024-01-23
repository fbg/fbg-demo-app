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
      const newEmployee = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

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
      console.log('PUT request received with body:', req.body); // Log incoming data
      const rawData = fs.readFileSync(dataFilePath, 'utf-8');
      const employees = JSON.parse(rawData);
      const updatedEmployee = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  
      // Find the index of the employee with the matching GUID
      const index = employees.findIndex((employee: { GUID: any; }) => employee.GUID === updatedEmployee.GUID);
  
      if (index !== -1) {
        console.log('Existing employee found:', employees[index]); // Log existing employee data
  
        // Merge the updated data with the existing employee data
        employees[index] = { ...employees[index], ...updatedEmployee };
  
        console.log('Updated employee data:', employees[index]); // Log updated employee data
  
        // Write the updated data back to the file
        fs.writeFileSync(dataFilePath, JSON.stringify(employees, null, 2), 'utf-8');
  
        res.status(200).json({ success: true, message: 'Employee updated successfully' });
      } else {
        console.log('Employee not found for GUID:', updatedEmployee.GUID); // Log if employee not found
        res.status(404).json({ error: 'Employee not found' });
      }
    } catch (error) {
      // Perform a runtime check to see if 'error' has a 'message' property
      if (error instanceof Error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Error updating employee', details: error.message });
      } else {
        // If it's not an instance of Error, handle it appropriately
        console.error('An unexpected error occurred:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
      } else if (req.method === 'DELETE') {
    try {
      const rawData = fs.readFileSync(dataFilePath, 'utf-8');
      const employees = JSON.parse(rawData);
      const GUID = req.query.GUID as string;

      // Find the index of the employee with the matching GUID
      const index = employees.findIndex((employee: { GUID: string; }) => employee.GUID === GUID);

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