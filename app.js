const express = require('express');
const mysql2 = require('mysql2');
const inquirer = require('inquirer');

require('dotenv').config();

const connection = mysql2.createConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: 'localhost',
        port: 3306
    });

connection.connect((err) => {
    if (err) throw err;
    init();
});

// Initialize the application
const init = () => {
    // Prompt user for input response
    inquirer
        .prompt({
            name: 'menu',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees By Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager'
            ],
        })
        .then((res) => {
            switch (res.menu) {
                case ('View All Employees'):
                    viewAllEmployees();
                    break;
                case ('View All Employees By Department'):
                    viewAllEmployeesByDepartment();
                    break;
                case ('View All Employees By Manager'):
                    viewAllEmployeesByManager();
                    break;
                case ('Add Employee'):
                    addEmployee();
                    break;
                case ('Remove Employee'):
                    removeEmployee();
                    break;
                case ('Update Employee Role'):
                    updateEmployeeRole();
                    break;
                case ('Update Employee Manager'):
                    updateEmployeeManager();
                    break;
                case 'Exit':
                    //connection.end();
                    break;
                default:
                    console.log(`Something went wrong: ${res.menu}`);
                    break;
            };
        }
    );
}

// MOVE TO READ.js
const viewAllEmployees = () => {
    const query =
        'SELECT first_name, last_name FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// MOVE TO READ.js
const viewAllEmployeesByDepartment = () => {
    inquirer
        .prompt({
            name: 'menu',
            type: 'list',
            message: 'Which department would you like to view?',
            choices: [
                'Production',
                'Research and Development',
                'Operations',
                'Marketing',
                'Finance'
            ],
        })
        .then((res) => {
            switch (res.menu) {
                case ('Production'):
                    viewEmployeesInProduction();
                    break;
                case ('Research and Development'):
                    viewEmployeesInResearchAndDevelopment();
                    break;
                case ('Operations'):
                    viewEmployeesInOperations();
                    break;
                case ('Marketing'):
                    viewEmployeesInMarketing();
                    break;
                case ('Finance'):
                    viewEmployeesInFinance();
                    break;
                case 'Exit':
                    //connection.end();
                    break;
                default:
                    console.log(`Something went wrong: ${res.menu}`);
                    break;
            };
        }
    );
};
// MOVE TO READ.js
const viewEmployeesInProduction = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Production" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });  
};
// MOVE TO READ.js
const viewEmployeesInResearchAndDevelopment = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Research and Development" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });    
};
// MOVE TO READ.js
const viewEmployeesInOperations = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Operations" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });    
};
// MOVE TO READ.js
const viewEmployeesInMarketing = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Marketing" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });    
};
// MOVE TO READ.js
const viewEmployeesInFinance = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Finance" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });    
};


