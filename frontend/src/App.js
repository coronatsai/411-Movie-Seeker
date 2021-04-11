import './App.css';
import React, {Component, useState, useEffect} from 'react';
import Axios from 'axios';

function App() {
  // const [serviceName, setServiceName] = useState('');
  // const [userID, setUserID] = useState('');


  /* Watch Movie*/
  const [movieIDWatchedMovie, setMovieIDWatchedMovie] = useState('');
  const [userIDWatchedMovie, setUserIDWatchedMovie] = useState('');
  const [dateWatchedMovie, setDateWatchedMovie] = useState('');
  const [timeWatchedMovie, setTimeWatchedMovie] = useState('');
  const [ratingWatchedMovie, setRatingWatchedMovie] = useState('');

  /* Get Movies watched by User*/
  const [returnMovieWatchList, setReturnMovieWatchList] = useState([]);

  /* Search Movies watched by User containing substring*/
  const [movieSearchNameKeyword, setMovieSearchNameKeyword] = useState('');
  const [returnMovieSearchNameKeyword, setReturnMovieSearchNameKeyword] = useState([]);

  /* Update a user's movie rating */
  const [newMovieRating, setNewMovieRating] = useState('');

  /* Adv query to get number of movies per genre */
  const [returnNumMoviesPerGenre, setReturnNumMoviesPerGenre] = useState([]);


  const getNumberOfMoviesPerGenre = () => {
      Axios.get('http://localhost:3002/api/getNumberOfMoviesPerGenre'
    ).then((response) => {
      setReturnNumMoviesPerGenre(response.data)
    })
  };

  const getMovieSearcNameKeyword = () => {
    Axios.get('http://localhost:3002/api/searchMovieTitles', {
      params: {
        movieSearchNameKeyword:movieSearchNameKeyword
      }
    }).then((response) => {
      setReturnMovieSearchNameKeyword(response.data)
    })
  };

  const getMoviesWatchedByUser = () => {
    Axios.get('http://localhost:3002/api/searchMoviesWatched', {
      params: {
        userIDWatchedMovie:userIDWatchedMovie
      }
    }).then((response) => {
      setReturnMovieWatchList(response.data)
    })
  };

  const updateMovieWatch = () => {
    Axios.put(`http://localhost:3002/api/updateReview`, {
      movieIDWatchedMovie: movieIDWatchedMovie,
      userIDWatchedMovie: userIDWatchedMovie,
      newMovieRating: newMovieRating
    });
    setNewMovieRating("")
  };

  const submitNewWatchMovie = () => {
    Axios.post(`http://localhost:3002/api/insertNewWatchMovie`, {
      movieIDWatchedMovie: movieIDWatchedMovie,
      userIDWatchedMovie: userIDWatchedMovie,
      dateWatchedMovie: dateWatchedMovie,
      timeWatchedMovie: timeWatchedMovie,
      ratingWatchedMovie: ratingWatchedMovie,
    }).then(() => {
      alert('success insert')
    });

  };

  const deleteWatchMovie = () => {
    Axios.delete(`https://localhost:3002/api/delete/${movieIDWatchedMovie}/${userIDWatchedMovie}`,
      {data: {
      movieIDWatchedMovie:movieIDWatchedMovie,
      userIDWatchedMovie:userIDWatchedMovie
    }})
  };



  return (
   <div className="App">
     <h1> MOVIE SEEKER CRUD</h1>
     <div className = "form">

     <h2> Display Movies Watched by User </h2>
     <label> User ID: </label>
       <input type= "text" name = "userIDWatchedMovie" onChange={(e) => {
         setUserIDWatchedMovie(e.target.value)
       }}/>

     <button onClick = {getMoviesWatchedByUser}> Show Me! </button>

     {returnMovieWatchList.map((val) => {
       return(
         <div className = "card">
         <p> Movie Name: {val.title} </p>
         <p> User's Rating: {val.rating} </p>
         </div>
       );
     })}

     <h2> Update a Movie Rating </h2>
     <label>Movie ID: </label>
     <input type= "text" name = "movieIDWatchedMovie" onChange={(e) => {
       setMovieIDWatchedMovie(e.target.value)
       }}/>
      <p></p>
     <label>User ID: </label>
       <input type= "text" name = "userIDWatchedMovie" onChange={(e) => {
       setUserIDWatchedMovie(e.target.value)
       }}/><p></p>
     <label>UPDATED Rating (0-10): </label>
       <input type= "text" name = "newMovieRating" onChange={(e) => {
       setNewMovieRating(e.target.value)
       }}/><p></p>

    <button onClick = {updateMovieWatch}> Update </button>


     <h2> Rate A Movie That You Watched:</h2>
     <label>Movie ID: </label>
     <input type= "text" name = "movieIDWatchedMovie" onChange={(e) => {
       setMovieIDWatchedMovie(e.target.value)
       }}/>
      <p></p>
     <label>User ID: </label>
       <input type= "text" name = "userIDWatchedMovie" onChange={(e) => {
       setUserIDWatchedMovie(e.target.value)
       }}/><p></p>
     <label>Date Watched (YYYY-M-D): </label>
       <input type= "text" name = "dateWatchedMovie" onChange={(e) => {
       setDateWatchedMovie(e.target.value)
       }}/><p></p>
     <label>Time Watched (0-24H:M): </label>
       <input type= "text" name = "timeWatchedMovie" onChange={(e) => {
       setTimeWatchedMovie(e.target.value)
       }}/><p></p>
     <label>Rating (0-10): </label>
       <input type= "text" name = "ratingWatchedMovie" onChange={(e) => {
       setRatingWatchedMovie(e.target.value)
       }}/><p></p>

    <button onClick = {submitNewWatchMovie}> submit </button>

    <h2> Remove a Movie Rating:</h2>
    <label>Movie ID: </label>
    <input type= "text" name = "movieIDWatchedMovie" onChange={(e) => {
      setMovieIDWatchedMovie(e.target.value)
      }}/>
     <p></p>
    <label>User ID: </label>
      <input type= "text" name = "userIDWatchedMovie" onChange={(e) => {
      setUserIDWatchedMovie(e.target.value)
      }}/><p></p>

    <button onClick = {deleteWatchMovie}> DELETE </button>

    <h2> Search Movie Titles </h2>
    <label> Keyword: </label>
      <input type= "text" name = "movieSearchNameKeyword" onChange={(e) => {
        setMovieSearchNameKeyword(e.target.value)
      }}/>

    <button onClick = {getMovieSearcNameKeyword}> Search </button>

    <p></p>

    {returnMovieSearchNameKeyword.map((val) => {
      return(
        <div className = "card">
        <p> Movie Name: {val.title} </p>
        <p> Movie Rating: {val.rating} </p>
        </div>
      );
    })}

    <h2> Show Number of Movies per Genre </h2>
    <button onClick = {getNumberOfMoviesPerGenre}> Show Me! </button>

    <p></p>

    {returnNumMoviesPerGenre.map((val) => {
      return(
        <div className = "card">
        <p> Movie Genre: {val.name} Number of Titles: {val.num} </p>
        </div>
      );
    })}

   </div>
   </div>
 );
}
export default App;
