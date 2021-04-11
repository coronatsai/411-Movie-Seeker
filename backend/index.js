const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
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


app.delete(`/api/delete/:movieIDWatchedMovie/:userIDWatchedMovie`, (require, response) => {
  const movieIDWatchedMovie = require.body.movieIDWatchedMovie;
  const userIDWatchedMovie = require.body.userIDWatchedMovie;

  const sqlDelete = "DELETE FROM watched_movie WHERE ID = ? AND User_id = ?;";
  db.query(sqlDelete, [movieIDWatchedMovie, userIDWatchedMovie], (err, result) => {
    console.log(result);
    response.send("deleted a row from watched_movie");
  })
});

app.post(`/api/insertNewWatchMovie`, (require, response) => {
    const movieIDWatchedMovie = require.body.movieIDWatchedMovie;
    const userIDWatchedMovie = require.body.userIDWatchedMovie;
    const dateWatchedMovie = require.body.dateWatchedMovie;
    const timeWatchedMovie = require.body.timeWatchedMovie;
    const ratingWatchedMovie = require.body.ratingWatchedMovie;
    var sql = "INSERT INTO watched_movie (ID,User_id,date,time,rating) VALUES (?, ?,?,?,?);";
    db.query(sql, [movieIDWatchedMovie, userIDWatchedMovie,dateWatchedMovie,timeWatchedMovie,ratingWatchedMovie], function (err, result) {
        if (err) throw err;
        console.log(result);
        response.send("pls work... :(");
        console.log("test 1 completed");
      });
})

app.get(`/api/searchMovieTitles`, (request, result) => {
  const movieSearchNameKeyword = request.query.movieSearchNameKeyword;
  const sqlRead = "SELECT title, rating FROM Movies WHERE title LIKE CONCAT('%',?,'%');";
  db.query(sqlRead, [movieSearchNameKeyword], (err, results, fields) => {
    if (err) throw err;
    result.send(results);
  });
})

app.get(`/api/searchMoviesWatched`, (request, result) => {
  const userIDWatchedMovie = request.query.userIDWatchedMovie;
  const sqlRead = "SELECT m.title, w.rating FROM Movies m JOIN watched_movie w on m.ID = w.ID WHERE w.User_id = ?;";
  db.query(sqlRead, [userIDWatchedMovie], (err, results, fields) => {
    if (err) throw err;
    result.send(results);
  });
})

app.get("/api/getNumberOfMoviesPerGenre", (request, result) => {
  const sqlRead = "SELECT g.genre_name as name, count(w.time) as num FROM watched_movie w JOIN belongs_to_Movie g ON (w.ID = g.ID) GROUP BY g.genre_name;";
  db.query(sqlRead,[],(err,results, fields) => {
    if (err) throw err;
    result.send(results);
  })
})

app.put("/api/updateReview", (require, response) => {
  const movieIDWatchedMovie = require.body.movieIDWatchedMovie;
  const userIDWatchedMovie = require.body.userIDWatchedMovie;
  const newMovieRating = require.body.newMovieRating;
  const sqlUpdate = "UPDATE watched_movie SET rating = ? WHERE ID = ? AND User_id = ?;";
  db.query(sqlUpdate, [newMovieRating, movieIDWatchedMovie, userIDWatchedMovie], (err, result) => {
    if (err) throw err;
    response.send("Update successful");
    console.log(err);
  });
})


app.listen(3002, () => {
  console.log("running on port 3002");
})
