

//////// view departments, roles, employees via READ (SELECT)
//////// view employees by manager via READ (SELECT)
//////// view the total utilized budget of a department -- i.e., the combined salaries of all employees in that department

// function readSongs() {
//   console.log("Selecting all songs...\n");
//   connection.query(
//     "SELECT * FROM songs WHERE ?",
//     {
//       genre: "Old School"
//     },
//     function(err, res) {
//       if (err) throw err;
//       // Log all results of the SELECT statement
//       console.log(res);
//       connection.end();
//     }
//   );
// }