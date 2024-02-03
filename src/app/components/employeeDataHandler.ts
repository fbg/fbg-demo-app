// let handler;
// console.log('handlerPath error');

// // Use an environment variable to determine the correct handler
// const handlerPath = process.env.NEXT_PUBLIC_EMPLOYEE_DATA_HANDLER_PATH;

// // Dynamically require the handler based on the environment variable
// try {
//     if (handlerPath) {
//         handler = require(handlerPath);
//     } else {
//         throw new Error('Handler path is not defined in environment variables.');
//     }
// } catch (error) {
//     console.error('Failed to load the employee data handler:', error);
//     throw error;
// }

// export const { fetchEmployeeData, insertEmployee, deleteEmployeeByGUID, updateEmployeeByGUID } = handler;


import * as HandlerAPI from './employeeDataHandlerForAPI';
import * as HandlerLocalStorage from './employeeDataHandlerForLocalstorage';

const handler = process.env.NEXT_PUBLIC_EMPLOYEE_DATA_HANDLER_PATH === './employeeDataHandlerForLocalstorage'
  ? HandlerLocalStorage
  : HandlerAPI;

export const {
  fetchEmployeeData,
  insertEmployee,
  deleteEmployeeByGUID,
  updateEmployeeByGUID,
} = handler;
