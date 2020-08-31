const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function roleQuestion() {
    return inquirer.prompt([
        {
            type: "list",
            message: "Do you want to add an Engineer, a Manager or an Intern?",
            name: "role",
            choices: ["Engineer", "Manager", "Intern", "I don't want to add anymore"],
        }
    ]).then( function (answers) {
        switch (answers.role) {
            case "Engineer": engineerQuestion();
            break;
            
            case "Manager": managerQuestion();
            break;

            case "Intern": internQuestion();
            break;

            case "I don't want to add anymore": console.log("You are all set!");
            fs.writeFile(outputPath, render(employees), "utf-8", (err) => {
                if (err) throw err;
                console.log(err);
        });
    }
    }
)}

function engineerQuestion() {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the Engineer?",
            },
            {
                type: "input",
                name: "id",
                message: "What is the Engineer's id?",
            },
            {
                type: "input",
                name: "email",
                message: "What is the Engineer's email address?",
            },
            {
                type: "input",
                name: "github",
                message: "What is the Engineer's github username?",
            }
        ])
        .then(function (answers) {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            employees.push(engineer);
        })
        .then(function anotherEntry() {
            console.log("Would you like to add another employee?");
            roleQuestion();
        });
}

function internQuestion() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the Intern?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the Intern's id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the Intern's email address?",
        },
        {
            type: "input",
            name: "school",
            message: "What is the name of the intern's school?",
        }
    ]).then((answers) => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        employees.push(intern);

    }).then(function anotherEntry() {
        console.log("Would you like to add another employee?");
        roleQuestion();
    });
}

function managerQuestion() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the Manager?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the Manager's id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the Manager's email address?",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the Manager's office number?",
        }
    ]).then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        employees.push(manager);

    }).then(function anotherEntry() {
        console.log("Would you like to add another employee?");
        roleQuestion();
    });
}

roleQuestion();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
