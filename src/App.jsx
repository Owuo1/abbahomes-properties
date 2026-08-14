import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Properties from './pages/Properties'
import Map from './pages/Map'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/map" element={<Map />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
