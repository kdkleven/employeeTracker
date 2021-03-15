const inquirer = require('inquirer');
const connection = require('../connection/connection');
const app = require('../app');

//////// Update employee roles via UPDATE
//////// update employee managers via UPDATE

function updateEmployeeRole() {
    const query1 = 'SELECT id, first_name, last_name FROM employee';
    const query2 = 'SELECT id, title FROM role';
    var empList = [];
    var empRoles = [];
    
    connection.query(query1, (err, res) => {
        if (err) throw err;
        empList = res.map(({ id, first_name, last_name }) => ({
            emp_id: id,
            name: first_name + ' ' + last_name,
        }));
    
        connection.query(query2, (err, res) => {
            if(err) throw err;
            empRoles = res.map(({ id, title }) => ({
                role_id: id,
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
                name: 'title',
                type: 'list',
                message: 'Select their new role:',
                choices: empRoles
            }
        ]
    )
    .then((res) => {
        console.log(res.employee, res.title);
        connection.query(res);
            ('UPDATE employee SET ? WHERE '),
            [   
                {
                    role_id: res.role_id
                }
            ],
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee updated!\n");
                app.init();
        }
    });
}

module.exports = {
    updateEmployeeRole
}