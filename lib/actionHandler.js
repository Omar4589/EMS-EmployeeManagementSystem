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
      const { roleName, salary, roleDepartment } = await inquirer.prompt([
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
          name: "roleDepartment",
          message: "Enter the department name for the role:",
        },
      ]);

      /// Get the department ID based on the department name
      const departmentId = await db.getDepartmentIdByName(roleDepartment);

      if (departmentId) {
        // Call the appropriate method from the Database class and display the result
        await db.addRole(roleName, salary, departmentId);
        console.log(`Added role: ${roleName}`);
      } else {
        console.log(`Department not found: ${roleDepartment}`);
      }
      break;
    case "Add an employee":
      // Prompt the user for the employee information
      const { firstName, lastName, newEmployeeRole, newEmployeeManagerName } =
        await inquirer.prompt([
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
            name: "newEmployeeRole",
            message: "Enter the role for the employee:",
          },
          {
            type: "input",
            name: "newEmployeeManagerName",
            message:
              "Enter the manager for the employee (leave blank if not applicable):",
          },
        ]);

      // Get the role ID based on the role name and manager ID based on the manager name
      const roleId = await db.getRoleIdByName(newEmployeeRole);
      const managerId = await db.getManagerIdByName(newEmployeeManagerName);

      if (roleId) {
        // Call the appropriate method from the Database class and display the result
        await db.addEmployee(firstName, lastName, roleId, managerId);
        console.log(`Added employee: ${firstName} ${lastName}`);
      } else {
        console.log("role not found");
      }
      break;
    case "Update an employee role":
      // Prompt the user for the employee ID and new role ID
      const { employeeName, role, manager } = await inquirer.prompt([
        {
          type: "input",
          name: "employeeName",
          message:
            "Enter the full name (first and last) of the employee you want to update:",
          validate: (input) => {
            const nameParts = input.trim().split(" ");
            return nameParts.length === 2 && nameParts[0] && nameParts[1]
              ? true
              : "Please enter both the first and last name, separated by a space.";
          },
        },
        {
          type: "input",
          name: "role",
          message: "Enter the new role for the employee:",
        },
        {
          type: "input",
          name: "manager",
          message: "Enter the employee's new manager:",
        },
      ]);

      // Get the employee ID based on the employee name and role ID based on the role name
      const employeeId = await db.getEmployeeIdByName(employeeName);
      const newRoleId = await db.getRoleIdByName(role);
      const newManagerId = await db.getManagerIdByName(manager);

      if (employeeId && newRoleId && newManagerId) {
        // Call the appropriate method from the Database class and display the result
        await db.updateEmployeeRole(employeeId, newRoleId, newManagerId);
        console.log(`Updated role to: ${role}, for employee: ${employeeName}`);
      } else {
        console.log("Employee or role not found");
      }
      break;
    case "Exit":
      // Exit the application
      process.exit(0);
  }
}

module.exports = handleAction;
