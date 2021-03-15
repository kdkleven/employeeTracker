const connection = require('./connection/connection');
const inquirer = require('inquirer');
const c = require('./lib/create');
const r = require('./lib/read');
const u = require('./lib/update');
// const d = require('./lib/delete');

connection.connect((err) => {
    if (err) throw err;
    console.log(`
    ________                          __                                         
   /        |                        /  |                                        
   $$$$$$$$/  _____  ____    ______  $$ |  ______   __    __   ______    ______  
   $$ |__    /     \/    \  /      \ $$ | /      \ /  |  /  | /      \  /      \ 
   $$    |   $$$$$$ $$$$  |/$$$$$$  |$$ |/$$$$$$  |$$ |  $$ |/$$$$$$  |/$$$$$$  |
   $$$$$/    $$ | $$ | $$ |$$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$    $$ |$$    $$ |
   $$ |_____ $$ | $$ | $$ |$$ |__$$ |$$ |$$ \__$$ |$$ \__$$ |$$$$$$$$/ $$$$$$$$/ 
   $$       |$$ | $$ | $$ |$$    $$/ $$ |$$    $$/ $$    $$ |$$       |$$       |
   $$$$$$$$/ $$/  $$/  $$/ $$$$$$$/  $$/  $$$$$$/   $$$$$$$ | $$$$$$$/  $$$$$$$/ 
                           $$ |                    /  \__$$ |                    
                           $$ |                    $$    $$/                     
                           $$/                      $$$$$$/                      
    ________                            __                                       
   /        |                          /  |                                      
   $$$$$$$$/______   ______    _______ $$ |   __   ______    ______              
      $$ | /      \ /      \  /       |$$ |  /  | /      \  /      \             
      $$ |/$$$$$$  |$$$$$$  |/$$$$$$$/ $$ |_/$$/ /$$$$$$  |/$$$$$$  |            
      $$ |$$ |  $$/ /    $$ |$$ |      $$   $$<  $$    $$ |$$ |  $$/             
      $$ |$$ |     /$$$$$$$ |$$ \_____ $$$$$$  \ $$$$$$$$/ $$ |                  
      $$ |$$ |     $$    $$ |$$       |$$ | $$  |$$       |$$ |                  
      $$/ $$/       $$$$$$$/  $$$$$$$/ $$/   $$/  $$$$$$$/ $$/                   
                                                                                 
                                                                                 
                                                                                 
   `)
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
                'Add Department', 
                'Add Employee',
                'Add Role',
                'View All Departments',
                'View All Employees',
                'View All Roles',
                'View All Employees By Department',
                'Update Employee Role',
                'Exit' //Done
            ],
        })
        .then((res) => {
            switch (res.menu) {
                case ('Add Department'):
                    c.addDepartment();
                    break;
                case ('Add Employee'):
                    c.addEmployee();
                    break;
                case ('Add Role'):
                    c.addRole();
                    break;
                case ('View All Departments'):
                    r.viewAllDepartments();
                    break;
                case ('View All Employees'):
                    r.viewAllEmployees();
                    break;
                case ('View All Roles'):
                    r.viewAllRoles();
                    break;
                case ('View All Employees By Department'):
                    r.viewAllEmployeesByDepartment();
                    break;
                case ('View All Employees By Role'):
                    r.viewAllEmployeesByManager();
                    break;
                // case ('View All Employees By Manager'):
                //     r.viewAllEmployeesByManager();
                //     break;
                // case ('View Utilized Department Budgets'):
                //     r.viewAllDepartments();
                //     break;
                case ('Update Employee Role'):
                    u.updateEmployeeRole();
                    break;
                // case ('Update Employee Manager'):
                //     u.updateEmployeeManager();
                //     break;
                // case ('Remove Employee'):
                //     d.removeEmployee();
                //     break;
                case 'Exit':
                    connection.end();
                    break;
                default:
                    console.log(`Something went wrong: ${res.menu}`);
                    break;
            }
        });
};

exports.init = init;