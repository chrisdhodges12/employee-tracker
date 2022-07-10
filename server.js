const consoleTable = require("console.table");
const inquirer = require("inquirer");
const db = require("./db/connection");

function init() {
  console.log('');
  console.log("========================================");
  console.log("=========== EMPLOYEE TRACKER ===========");
  console.log("========================================");
  console.log('');
  initialPrompt();
}

function initialPrompt() {
  inquirer
    .prompt([
      {
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
        ],
      },
    ])
    .then((answers) => {
      if ((answers = "View all departments")) {
        viewDepartments();
      }
      if ((answers = "View all roles")) {
        viewRoles();
      }
      if ((answers = "View all employees")) {
        viewEmployees();
      }
      if ((answers = "Add a department")) {
        addDepartment();
      }
      if ((answers = "Add a role")) {
        addRole();
      }
      if ((answers = "Add an employee")) {
        addEmployee();
      }
      if ((answers = "Update an employee role")) {
        updateEmployeeRole();
      }
    });
}

const viewDepartments = () => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
      return;
    }
    console.log('');
    console.table(rows);
    initialPrompt();
  });
};

viewRoles = () => {
  
};

viewEmployees = () => {

};

addDepartment = () => {

};

addRole = () => {

};

addEmployee = () => {
  
};

updateEmployeeRole = () => {

};

init();
