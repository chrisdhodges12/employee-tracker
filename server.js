const consoleTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./db/connection');

function init() {
  console.log("============================");
  console.log("===== EMPLOYEE TRACKER =====");
  console.log("============================");
  prompt1();
}


function prompt1() {
  inquirer.prompt({
    type: "list",
    name: "prompt1",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Quit",
    ],
  })
  .then ((answers) => {
      if (answers === "View all departments") {
          viewDepartments();
      }
      if (answers === "View all roles") {
          viewRoles();
      }
      if (answers === "View all employees") {
          viewEmployees();
      }
      if (answers === "Add a department") {
          addDepartment();
      }
      if (answers === "Add a role") {
          addRole();
      }
      if (answers === "Add an employee") {
          addEmployee();
      }
      if (answers === "Update an employee role") {
          updateEmployeeRole();
      }
  })
};

init();
