const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

var db = mysql.createConnection({
    host: '34.121.53.55',
    user: 'root',
    password: 'teamteam',
    database: 'TeamTeam'
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/',(require, response) => {
//   const sqlInsert = "INSERT INTO 'subscribed' ('Name', 'User_id') VALUES ('Testing', '0.0');";
//   db.query(sqlInsert, (err, result) => {
//     response.send("Hello world!!!");
//   })
// })

app.post('/api/insert', (require, response) => {
  const Name = require.body.Name;
  const User_id = require.body.User_id;
  console.log("before insert attempt");
  var sqlInsert = "INSERT INTO 'subscribed' ('Name', 'User_id') VALUES (?,?);";
  db.query(sqlInsert, [Name, User_id], function(err, result) {
    if (err) throw err;
    console.log(err);
    respond.send("insert a row");
    console.log("reached inside");
  })

});
console.log("after insert attempt");
app.listen(3002, () => {
  console.log("running on port 3002");
})
