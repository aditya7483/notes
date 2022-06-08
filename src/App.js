import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Notes from './components/Notes'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stats from './components/Stats';


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" key="notes" element={<Notes />} />
          <Route exact path="/stats" key="stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
