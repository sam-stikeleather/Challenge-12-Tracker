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


  // Function to handle user choices from the main menu
function handleUserChoice(response) {
  switch (response.userChoice) {
    case "View all departments":
      viewDepartments();
      break;

    case "View all roles":
      viewRoles();
      break;

    case "View all employees":
      viewEmployees();
      break;

    case "Add department":
      addDepartment();
      break;

    case "Add role":
      addRole();
      break;

    case "Add employee":
      addEmployee();
      break;

    case "Update employee role":
      updateRole();
      break;

    case "Exit":
      db.end();
      break;
  }
}

function viewDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    mainMenu();
  });
}

function viewRoles() {
  const sql = `SELECT role.id, role.title, role.salary, department.name 
  FROM role LEFT JOIN department 
  ON role.department_id = department.id`;
db.query(sql, function (err, results) {
console.table(results);
mainMenu();
});
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the new department?",
      },
    ])
    .then(response => {
      db.query("INSERT INTO department (name) VALUES (?)", [response.department], function (err, results) {
        console.log("New department added!");
        mainMenu();
      });
    });
}