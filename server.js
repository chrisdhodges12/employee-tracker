const consoleTable = require("console.table");
const inquirer = require("inquirer");
const db = require("./db/connection");

function init() {
  console.log("");
  console.log("========================================");
  console.log("=========== EMPLOYEE TRACKER ===========");
  console.log("========================================");
  console.log("");
  initialPrompt();
}

function initialPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "main",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role"
        ],
      },
    ])
    .then((answers) => {
      var { main } = answers;

      if (main === "View all departments") {
        viewDepartments();
      }
      if (main === "View all roles") {
        viewRoles();
      }
      if ((main = "View all employees")) {
        viewEmployees();
      }
      if ((main = "Add a department")) {
        addDepartment();
      }
      if ((main = "Add a role")) {
        addRole();
      }
      if ((main = "Add an employee")) {
        addEmployee();
      }
      if ((main = "Update an employee role")) {
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
    console.log("");
    console.table(rows);
    initialPrompt();
  });
};

viewRoles = () => {
  const sql = `SELECT role.id, role.title, role.salary, department.department_name 
                AS department FROM role
                LEFT JOIN department ON role.department_id = department.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      return;
    }
    console.log("");
    console.table(rows);
    initialPrompt();
  });
};

viewEmployees = () => {};

addDepartment = () => {};

addRole = () => {};

addEmployee = () => {};

updateEmployeeRole = () => {};

init();
