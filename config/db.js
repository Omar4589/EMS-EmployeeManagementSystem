const mysql = require("mysql2");
require("dotenv").config();

class Database {
  constructor() {
    this.connection = mysql
      .createConnection({
        host: "localhost",
        user: process.env.DB_US,
        password: process.env.DB_PW,
        database: process.env.DB,
      })
      .promise();
  }

  // Method to view all departments
  async viewAllDepartments() {
    const query = "SELECT * FROM department";
    const [rows] = await this.connection.query(query);
    return rows;
  }

  // Method to view all roles
  async viewAllRoles() {
    const query = `
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      INNER JOIN department ON role.department_id = department.id
    `;
    const [rows] = await this.connection.query(query);
    return rows;
  }

  // Method to view all employees
  async viewAllEmployees() {
    const query = `
      SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager
      FROM employee e1
      LEFT JOIN employee e2 ON e1.manager_id = e2.id
      INNER JOIN role ON e1.role_id = role.id
      INNER JOIN department ON role.department_id = department.id
    `;
    const [rows] = await this.connection.query(query);
    return rows;
  }

  // Method to add a department
  async addDepartment(name) {
    const query = "INSERT INTO department (name) VALUES (?)";
    const [result] = await this.connection.query(query, [name]);
    return result;
  }

  // Method to add a role
  async addRole(title, salary, departmentId) {
    const query =
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
    const [result] = await this.connection.query(query, [
      title,
      salary,
      departmentId,
    ]);
    return result;
  }

  // Method to add an employee
  async addEmployee(firstName, lastName, roleId, managerId) {
    const query =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    const [result] = await this.connection.query(query, [
      firstName,
      lastName,
      roleId,
      managerId,
    ]);
    return result;
  }

  // Method to update an employee's role
  async updateEmployeeRole(employeeId, newRoleId) {
    const query = "UPDATE employee SET role_id = ? WHERE id = ?";
    const [result] = await this.connection.query(query, [
      newRoleId,
      employeeId,
    ]);
    return result;
  }
}

module.exports = Database;
