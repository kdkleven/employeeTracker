const inquirer = require('inquirer');
const connection = require('../connection/connection');
const app = require('../app');

const viewAllEmployees = () => {
    const query =
        'SELECT first_name, last_name FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app(init());
    });
};

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
                default:
                    console.log(`Something went wrong: ${res.menu}`);
                    break;
            }
        });
};

const viewEmployeesInProduction = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Production" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app(init());
    });
};

const viewEmployeesInResearchAndDevelopment = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Research and Development" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app(init());
    });
};

const viewEmployeesInOperations = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Operations" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app(init());
    });
};

const viewEmployeesInMarketing = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Marketing" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};

const viewEmployeesInFinance = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Finance" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};


//View all employees by manager





module.exports = {
    viewAllEmployees,
    viewAllEmployeesByDepartment,
    viewEmployeesInProduction,
    viewEmployeesInResearchAndDevelopment,
    viewEmployeesInOperations,
    viewEmployeesInMarketing,
    viewEmployeesInFinance
};