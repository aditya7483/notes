import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Notes from './components/Notes'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stats from './components/Stats';


export default function App() {
  
  const getData= async ()=>{
    let response = await fetch('/api/notes');
    let parsedData = await response.json();
    let arr = [];
    let results = [];

    for (let i = 0; i < parsedData.length; i++) {
      let d = new Date (parsedData[i].date)
      arr.push(d.getDay())
    }

    for (let i = 0; i < 7; i++) {
      let count = 0;
      for (let j = 0; j < arr.length; j++) {
        if(i===arr[j])
        count++;
      }
      results.push(count)
    }
    return results;
  } 
  let dataArray=getData()
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" key="notes" element={<Notes />} />
          <Route exact path="/stats" key="stats" element={<Stats statsData={dataArray}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
