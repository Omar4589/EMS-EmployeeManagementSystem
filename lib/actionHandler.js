const inquirer = require("inquirer");
const Database = require("../config/db.js");

async function handleAction(action) {
  // Initialize a new instance of the Database class
  const db = new Database();

  switch (action) {
    case "View all departments":
      // Call the appropriate method from the Database class and display the result
      const departments = await db.viewAllDepartments();
      console.table(departments);
      break;
    case "View all roles":
      // Call the appropriate method from the Database class and display the result
      const roles = await db.viewAllRoles();
      console.table(roles);
      break;
    case "View all employees":
      // Call the appropriate method from the Database class and display the result
      const employees = await db.viewAllEmployees();
      console.table(employees);
      break;
    case "Add a department":
      // Prompt the user for the department name
      const { departmentName } = await inquirer.prompt([
        {
          type: "input",
          name: "departmentName",
          message: "Enter the department name:",
        },
      ]);

      // Call the appropriate method from the Database class and display the result
      await db.addDepartment(departmentName);
      console.log(`Added department: ${departmentName}`);
      break;
    case "Add a role": // Prompt the user for the role information
      const { roleName, salary, departmentId } = await inquirer.prompt([
        {
          type: "input",
          name: "roleName",
          message: "Enter the role name:",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the salary for the role:",
        },
        {
          type: "input",
          name: "departmentId",
          message: "Enter the department ID for the role:",
        },
      ]);

      // Call the appropriate method from the Database class and display the result
      await db.addRole(roleName, salary, departmentId);
      console.log(`Added role: ${roleName}`);
      break;
    case "Add an employee":
      // Prompt the user for the employee information
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter the employee's first name:",
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter the employee's last name:",
        },
        {
          type: "input",
          name: "roleId",
          message: "Enter the role ID for the employee:",
        },
        {
          type: "input",
          name: "managerId",
          message:
            "Enter the manager ID for the employee (leave blank if not applicable):",
        },
      ]);

      // Call the appropriate method from the Database class and display the result
      await db.addEmployee(firstName, lastName, roleId, managerId);
      console.log(`Added employee: ${firstName} ${lastName}`);
      break;
    case "Update an employee role":
      // Prompt the user for the employee ID and new role ID
      const { employeeId, newRoleId } = await inquirer.prompt([
        {
          type: "input",
          name: "employeeId",
          message: "Enter the employee ID you want to update:",
        },
        {
          type: "input",
          name: "newRoleId",
          message: "Enter the new role ID for the employee:",
        },
      ]);

      // Call the appropriate method from the Database class and display the result
      await db.updateEmployeeRole(employeeId, newRoleId);
      console.log(`Updated role for employee with ID: ${employeeId}`);
      break;
    case "Exit":
      // Exit the application
      process.exit(0);
  }
}

module.exports = handleAction;
