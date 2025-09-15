import logo from './logo.svg';
import './App.css';
import axios from "axios";

import { useEffect, useState } from 'react';


function App() {
  
  const [users, setUsers] = useState([])

  useEffect(()=> {
    loadUsers();
  },[])

  const loadUsers = async()=> {
    const result = await axios.get("https://localhost:8000/users");
    console.log(result);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
