const mysql = require('mysql');
const inquirer = require('inquirer');

require('dotenv').config();

const connection = mysql.createConnection (
    {
        user: 'root', 
        password: '',
        database: 'company_db',
        host: 'localhost',
        port: 3306
    }
);

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

const viewAllEmployees = () => {
    const query =
        'SELECT first_name, last_name FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(query);
        init();
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

const viewEmployeesInProduction = () => {
    const query =
        'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });  
};
const viewEmployeesInResearchAndDevelopment = () => {
    const query =
        'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });  
};
const viewEmployeesInOperations = () => {
    const query =
        'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });  
};
const viewEmployeesInMarketing = () => {
    const query =
        'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });  
};
const viewEmployeesInFinance = () => {
    const query =
        'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });  
};


