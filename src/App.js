import React, { useState,useEffect} from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Notes from './components/Notes'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stats from './components/Stats';


export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  let authToken = localStorage.getItem('auth-token')

  const fetchUserData= async()=>{
    if(authToken)
    {try {
      let myauth = localStorage.getItem('auth-token')
      let res = await fetch('https://notes74.herokuapp.com/api/auth/getuser', {
      // let res = await fetch('http://localhost:3001/api/auth/getuser', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'auth-token':myauth
              }
          })
          let data = await res.json();
          setLoggedIn(true)
    } catch (err) {
      setLoggedIn(false)
    }}
    else{
      setLoggedIn(false)
    }
         
  }

  useEffect(()=>{
    if(!loggedIn)
    {
      fetchUserData()
    }
  })

  const getData = async () => {
    if (authToken) {
      let response = await fetch('https://notes74.herokuapp.com/api/notes/getnotes',{
      // let response = await fetch('http://localhost:3001/api/notes/getNotes', {
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
        <Navbar loggedIn={loggedIn}/>
        <Routes>
          <Route exact path="/" key="notes" element={<Notes loggedIn={loggedIn}/>} />
          <Route exact path="/stats" key="stats" element={<Stats statsData={dataArray} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
