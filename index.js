const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "production");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/render");
const { prompt } = require("inquirer");

const team = [];
let employee = [];

const validateId = (input) => {
  if (isNaN(input) || input === "" || input === "0") {
    return "Please enter a valid number above Zero!";
  } else {
    return true;
  }
};

const validateEmail = (input) => {
  if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(input) || input === "") {
    return true;
  } else {
    return "Please enter a valid email address!";
  }
};

validateBlankEntry = (input) => {
  if (input === "") {
    return "Must provide valid information!";
  } else {
    return true;
  }
};

const questions = {
  message: "Please select one of the following?",
  type: "list",
  name: "role",
  choices: ["Add Manager", "Add Engineer", "Add Intern", "Exit"],
};

const manager = {
  message: "Please provide the manager's office number?",
  type: "input",
  name: "office",
  validate: validateBlankEntry,
};

const engineer = {
  message: "Please enter the engineer's GitHub username?",
  type: "input",
  name: "github",
  validate: validateBlankEntry,
};

const intern = {
  message: "Please enter the intern's school name?",
  type: "input",
  name: "school",
  validate: validateBlankEntry,
};

function start() {
  employee = [
    {
      message: "Enter the employee's first & last name?",
      type: "input",
      name: "name",
      validate: validateBlankEntry,
    },
    {
      message: "Provide an ID number for the employee?",
      type: "input",
      name: "id",
      validate: validateId,
    },
    {
      message: "What is the employee's email address?",
      type: "input",
      name: "email",
      validate: validateEmail,
    },
  ];

  inquirer.prompt(questions).then((response) => {
    switch (response.role) {
      case "Add Manager":
        getManager();
        break;
      case "Add Engineer":
        getEngineer();
        break;
      case "Add Intern":
        getIntern();
        break;
      case "Exit":
        generateTeam();
        break;
    }
  });
}

function generateTeam() {
  const html = render(team);
  fs.writeFile(outputPath, html, (err) => {
    if (err) throw err;
    console.log("Employee summary successfully completed!");
  });
}

function getManager() {
  employee.push(manager);
  prompt(employee).then((response) => {
    const manager = new Manager(response.name, response.id, response.email, response.office);
    team.push(manager);
    start();
  });
}

function getEngineer() {
  employee.push(engineer);
  prompt(employee).then((response) => {
    const engineer = new Engineer(response.name, response.id, response.email, response.github);
    team.push(engineer);
    start();
  });
}

function getIntern() {
  employee.push(intern);
  prompt(employee).then((response) => {
    const intern = new Intern(response.name, response.id, response.email, response.school);
    team.push(intern);
    start();
  });
}

start();