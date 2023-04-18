-- Insert initial data into the department table
INSERT INTO department (name)
VALUES ('Leadership'),
       ('Sales');

-- Insert initial data into the role table
INSERT INTO role (title, salary, department_id)
VALUES ('General Manager', 100000, 1),
       ('Sales Manager', 60000, 1),
       ('Operations Manager', 80000, 1),
       ('Supervisor', 40000, 1),
       ('Sr. Consultant', 90000, 2),
       ('Consultant', 65000, 2),
       ('Certified Advisor', 35000, 2),
       ('Advisor', 30000, 2);

-- Insert initial data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tom', 'Ran', 1, NULL),
       ('Karlos', 'Sol', 2, 1),
       ('Aldo', 'Ram', 3, 1),
       ('Luis', 'Mad', 4, 2),
       ('Javi', 'Dav', 5, 2),
       ('Omar', 'Zum', 6, 2),
       ('Luis', 'Gar', 7, 2),
       ('Dan', 'Ram', 8, 2);
