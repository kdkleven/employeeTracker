const inquirer = require('inquirer');
const connection = require('../connection/connection');
const app = require('../app');

//////// Update employee roles via UPDATE
//////// update employee managers via UPDATE

function updateEmployeeRole() {
    const query1 = 'SELECT first_name, last_name, role.title FROM employee INNER JOIN role ON employee.role_id = role.id';
    const query2 = 'SELECT title FROM role';
    var empList = [];
    var empRoles = [];
    
    connection.query(query1, (err, res) => {
        if (err) throw err;
        empList = res.map(({ first_name, last_name, title }) => ({
            name: first_name + ' ' + last_name,
            value: title,
        }));
    
        connection.query(query2, (err, res) => {
            if(err) throw err;
            empRoles = res.map(({ id, title }) => ({
                name: id,
                value: title
            }));
        
            updateEmployeeRoleHelper(empList, empRoles);
        });
    });
};

const updateEmployeeRoleHelper = (empList, empRoles) => {
    inquirer
    .prompt(
        [
            {
                name: 'employee',
                type: 'list',
                message: 'Select an employee:',
                choices: empList
            },
            {
                name: 'newRole',
                type: 'list',
                message: 'Select their new role:',
                choices: empRoles
            }
        ]
    )
    .then((res) => {
        console.log(res);
        connection.query(
            ('UPDATE employee SET ? WHERE ' + first_name + " " + last_name',)
            [
                {
                    role_id: res.newRole
                }
            ],
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee updated!\n");
                app.init();
            }
        )
    })
}

module.exports = {
    updateEmployeeRole
}