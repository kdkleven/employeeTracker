const inquirer = require('inquirer');
const c = require('./lib/create');
const r = require('./lib/read');
const u = require('./lib/update');
const d = require('./lib/delete');
const connection = require('./connection/connection');

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
                'Update Employee Manager',
                'Exit'
            ],
        })
        .then((res) => {
            switch (res.menu) {
                case ('View All Employees'):
                    r.viewAllEmployees();
                    break;
                case ('View All Employees By Department'):
                    r.viewAllEmployeesByDepartment();
                    break;
                case ('View All Employees By Manager'):
                    r.viewAllEmployeesByManager();
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
                    connection.end();
                    break;
                default:
                    console.log(`Something went wrong: ${res.menu}`);
                    break;
            }
        }
        );
};



const addEmployee = () => {
    const query1 = 'SELECT id, title FROM role';
    const query2 = 'SELECT id, first_name, last_name FROM employee WHERE manager_id != role_id';
    var roleChoices = [];
    var managerChoices = [];

    connection.query(query1, (err, res) => {
        if (err) throw err;
        roleChoices = res.map(({ id, title }) => ({
            name: title,
            value: id,
        }));
        connection.query(query2, (err, res) => {
            if (err) throw err;
            managerChoices = res.map(({ id, first_name, last_name }) => ({
                name: [first_name + ' ' + last_name],
                value: id,
            }));
            addEmployeeHelper(roleChoices, managerChoices);
        });
    });
};

const addEmployeeHelper = (roleChoices, managerChoices) => {
    inquirer.prompt(
        [
            {
                name: 'first_name',
                type: 'input',
                message: "What is the employee's first name?",
            },
            {
                name: 'last_name',
                type: 'input',
                message: "What is the employee's last name?",
            },
            {
                name: 'role',
                type: 'list',
                message: "What is the employee's role?",
                choices: roleChoices
            },
            {
                name: 'manager',
                type: 'list',
                message: "Who is the employee's manager?",
                choices: managerChoices
            }

        ]
    )
    .then((res) => {
        //console.log('Inserting new employee...\n');
        connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: res.first_name,
                last_name: res.last_name,
                role_id: res.role,
                manager_id: res.manager
            },
            function (err, res) {
                if (err) throw err;
                const promise1 = new Promise((resolve, reject) => {
                    console.log(res.affectedRows + " employee added!\n");
                    resolve('Success!');
                });
                promise1.then(() => {
                    init();
                });
            }
        );
    });
};

module.exports = init;