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
      if ((main === "View all employees")) {
        viewEmployees();
      }
      if ((main === "Add a department")) {
        addDepartment();
      }
      if ((main === "Add a role")) {
        addRole();
      }
      if ((main === "Add an employee")) {
        addEmployee();
      }
      if ((main === "Update an employee role")) {
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

viewEmployees = () => {
  const sql = `SELECT employee.id,
                employee.first_name,
                employee.last_name,
                department.department_name AS department,
                role.title,
                role.salary,
                CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      return;
    }
    console.log("");
    console.table(rows);
    initialPrompt();
  });
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newDep',
        message: 'What is the name of the department you would like to add?',
      },
    ])
    .then(answer => {
      const sql = `INSERT INTO department (department_name) VALUES (?)`;
      db.query(sql, answer.newDep, (err, result) => {
        if (err) {
          return;
        }
        console.log(""),
        console.log("A new department was added");
        viewDepartments();
      });
    });
};

addRole = () => {};

addEmployee = () => {};

updateEmployeeRole = () => {};

init();
