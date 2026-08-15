import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Properties from './pages/Properties'
import Map from './pages/Map'
import Contact from './pages/Contact'
import { useProperties } from './hooks/useProperties'
import './App.css'

function App() {
  const {
    properties,
    addProperty,
    deleteProperty,
    getFeatured
  } = useProperties()

  return (
    <div className="app">
      <Navbar />
      <AdminPanel 
        properties={properties}
        onAddProperty={addProperty}
        onDeleteProperty={deleteProperty}
      />
      <Routes>
        <Route path="/" element={<Home featuredProperties={getFeatured()} />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/properties" element={<Properties properties={properties} />} />
        <Route path="/map" element={<Map />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
