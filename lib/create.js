
//////// add departments, roles, and employees via CREATE 

// function createSong() {
//   console.log("Inserting a new song...\n");
//   var query = connection.query(
//     "INSERT INTO song SET ?",
//     {
//       title: "Fifths",
//       artist: "DeadMau5",
//       genre: "House"
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " song inserted!\n");
//       // Call updateProduct AFTER the INSERT completes
//       updateSong();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }