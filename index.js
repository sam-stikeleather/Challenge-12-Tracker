const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Agent0624Fox',
  database: 'management_db',
});

// Function to display the main menu and handle user choices
function mainMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          message: 'What would you like to do?',
          choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add department",
            "Add role",
            "Add employee",
            "Update employee role",
            "Exit",
          ],
          name: 'userChoice',
        },
      ])
      .then(handleUserChoice);
  }


  