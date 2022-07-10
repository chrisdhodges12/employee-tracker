INSERT INTO department (department_name)
VALUES
('Sales'),
('Engineering'),
('Legal'),
('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Manager', 90000, 1),
('Sales representative', 70000, 1),
('Lead Engineer', 140000, 2),
('Software Engineer', 120000, 2),
('Legal Manager', 150000, 3),
('Lawyer', 120000, 3),
('Accountant Manager', 110000, 4),
('Accountant', 900000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL),
('Jim', 'Jimson', 2, 1),
('Jane', 'Janerson', 3, NULL),
('Chris', 'Hodges', 4, 3),
('Don', 'Lawman', 5, NULL),
('Sal', 'Goodman', 6, 5),
('Lisa', 'Lemons', 7, NULL),
('Josh', 'Johnson', 8, 7);