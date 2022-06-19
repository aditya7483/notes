import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Notes from './components/Notes'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stats from './components/Stats';


export default function App() {

  const [authToken, setAuthToken] = useState('');

  const changeAuthToken=(newToken)=>{
    setAuthToken(newToken)
  }

  const getData = async () => {
    if (authToken.length !== 0) {
      // let response = await fetch('https://notes74.herokuapp.com/api/notes/getnotes');
      let response = await fetch('http://localhost:3001/api/notes/getNotes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':`${authToken}`
        },
      });
      let parsedData = await response.json();
      let arr = [];
      let results = [];

      for (let i = 0; i < parsedData.length; i++) {
        let d = new Date(parsedData[i].date)
        arr.push(d.getDay())
      }

      for (let i = 0; i < 7; i++) {
        let count = 0;
        for (let j = 0; j < arr.length; j++) {
          if (i === arr[j])
            count++;
        }
        results.push(count)
      }
      return results;
    }
  }
  let dataArray = getData()
  return (
    <div>
      <BrowserRouter>
        <Navbar setAuthToken={changeAuthToken}/>
        <Routes>
          <Route exact path="/" key="notes" element={<Notes authToken={authToken} />} />
          <Route exact path="/stats" key="stats" element={<Stats statsData={dataArray} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
