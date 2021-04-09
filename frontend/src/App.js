import './App.css';
import React, {Component, useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [serviceName, setServiceName] = useState('');
  const [userID, setUserID] = useState('');

  const submitNewStreaming = () => {
    Axios.post('https://localhost:3002/api/insert', {
      Name: serviceName,
      User_id: userID,
    }).then(() => {
      alert('successful insert')
    })
  };

  return (
    <div className="App">
      <h1> Movie Seeker CRUD:</h1>


      <div className= "form">
        <label>Streaming Platform Name:</label>
        <input type="text" name="serviceName" onChange={(e) =>{
          setServiceName(e.target.value)
        }} />
        <label>User ID:</label>
        <input type="text" name="userID" onChange={(e) => {
          setUserID(e.target.value)
        }}/>

        <button onClick = {submitNewStreaming}> Submit </button>

      </div>

    </div>
  );
}

export default App;
