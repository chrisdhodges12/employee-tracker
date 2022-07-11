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
          "Update an employee's role",
          "View department budget",
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
      if (main === "View all employees") {
        viewEmployees();
      }
      if (main === "Add a department") {
        addDepartment();
      }
      if (main === "Add a role") {
        addRole();
      }
      if (main === "Add an employee") {
        addEmployee();
      }
      if (main === "Update an employee's role") {
        updateEmployeeRole();
      }
      if (main === "View department budget") {
        viewBudget();
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
        type: "input",
        name: "newDep",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (department_name) VALUES (?)`;
      db.query(sql, answer.newDep, (err, result) => {
        if (err) {
          return;
        }
        console.log(""), console.log("A new department was added!");
        viewDepartments();
      });
    });
};

addRoleQuestions = (currentDepartments) => {
  return [
    {
      type: "input",
      name: "roleTitle",
      message: "What is the name of the role you would like to add?",
    },
    {
      type: "list",
      name: "roleDepartment",
      message: "Which department is the role for?",
      choices: currentDepartments,
    },
    {
      type: "input",
      name: "roleSalary",
      message: "What is the salary for this role?",
    },
  ];
};

addRole = () => {
  db.query(`SELECT id, department_name FROM department`, (err, rows) => {
    const currentDepartments = rows.map((row) => {
      return { value: row.id, name: row.department_name };
    });
    const askNewRole = addRoleQuestions(currentDepartments);
    inquirer
      .prompt(askNewRole)
      .then(({ roleTitle, roleDepartment, roleSalary }) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        db.query(sql, [roleTitle, roleSalary, roleDepartment], (err, rows) => {
          if (err) {
            return;
          }
          console.log("");
          console.log("A new role was added!");
          viewRoles();
        });
      });
  });
};

addEmployeeQuestions = (currentRoles, currentManagers) => {
  return [
    {
      type: "input",
      name: "firstName",
      message: "What is employee's first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?",
    },
    {
      type: "list",
      name: "employeeRole",
      message: "What is the employee's role?",
      choices: currentRoles,
    },
    {
      type: "list",
      name: "employeeManager",
      message: "Who is their manager?",
      choices: currentManagers,
    },
  ];
};

addEmployee = () => {
  db.query(`SELECT id, title FROM role`, (err, rows) => {
    const currentRoles = rows.map((row) => {
      return { value: row.id, name: row.title };
    });

    db.query(
      `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee WHERE employee.manager_id IS NULL`,
      (err, rows) => {
        const currentManagers = rows.map((row) => {
          return { value: row.id, name: row.name };
        });

        const askNewEmployee = addEmployeeQuestions(
          currentRoles,
          currentManagers
        );
        inquirer
          .prompt(askNewEmployee)
          .then(({ firstName, lastName, employeeRole, employeeManager }) => {
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            db.query(
              sql,
              [firstName, lastName, employeeRole, employeeManager],
              (err, rows) => {
                if (err) {
                  return;
                }
                console.log("");
                console.log("A new employee has been added!");
                viewEmployees();
              }
            );
          });
      }
    );
  });
};

updateEmployeeQuestions = (currentEmployees, currentRoles, currentManagers) => {
  return [
    {
      type: "list",
      name: "employeeName",
      message: "Which employee whould you like to update?",
      choices: currentEmployees,
    },
    {
      type: "list",
      name: "employeeRole",
      message: "What is the employee's new role?",
      choices: currentRoles,
    },
    {
      type: "list",
      name: "employeeManager",
      message: "Who is the manager?",
      choices: currentManagers,
    },
  ];
};

updateEmployeeRole = () => {
  db.query(`SELECT id, title FROM role`, (err, rows) => {
    const currentRoles = rows.map((row) => {
      return { value: row.id, name: row.title };
    });

    db.query(
      `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee WHERE employee.manager_id IS NULL`,
      (err, rows) => {
        const currentManagers = rows.map((row) => {
          return { value: row.id, name: row.name };
        });

        db.query(
          `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`,
          (err, rows) => {
            const currentEmployees = rows.map((row) => {
              return { value: row.id, name: row.name };
            });

            const askUpdateEmployee = updateEmployeeQuestions(
              currentEmployees,
              currentRoles,
              currentManagers
            );
            inquirer
              .prompt(askUpdateEmployee)
              .then(({ employeeName, employeeRole, employeeManager }) => {
                const sql = `UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?`;
                db.query(
                  sql,
                  [employeeRole, employeeManager, employeeName],
                  (err, rows) => {
                    if (err) {
                      return;
                    }
                    console.log("");
                    console.log("The employee's role has been updated!");
                    viewEmployees();
                  }
                );
              });
          }
        );
      }
    );
  });
};

viewBudget = () => {
  db.query(`SELECT id, department_name FROM department`, (err, rows) => {
    const departments = rows.map((row) => {
      return { value: row.id, name: row.department_name };
    });
    inquirer
      .prompt({
        type: "list",
        name: "departmentBudget",
        message: "Select a department to view their budget",
        choices: departments,
      })
      .then(({ departmentBudget }) => {
        const sql = `SELECT SUM(role.salary) AS budget FROM role WHERE  role.department_id = ?`;
        db.query(sql, departmentBudget, (err, rows) => {
          if (err) {
            return;
          }
          console.log("");
          console.table(rows);
          initialPrompt();
        });
      });
  });
};

init();
