const inquirer = require("inquirer");
const Database = require("../config/db.js");
const fs = require("fs");
const actionHandler = require("./actionHandler.js")

async function mainCLI() {
    // Display the logo
    const logo = fs.readFileSync("./assets/logo.txt", "utf8");
    console.log(logo);
  
    // Initialize a new instance of the Database class
    const db = new Database();
  
    // Main loop for user interaction
    while (true) {
      // Prompt the user with options
      const { action } = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "What would you like to do?",
          choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Exit",
          ],
        },
      ]);
  
      // Handle the user's choice
      await actionHandler(action);
    }
  };

  module.exports = mainCLI;