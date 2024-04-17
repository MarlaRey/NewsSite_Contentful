import React, { useState } from 'react';
import './App.scss';
import { Main } from './components/Main/Main'
import BlogList from './components/Blog/BlogList'
import BlogDetails from './components/Blog/BlogDetails'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Alle"); // Ny state for valgt kategori

  return (
    <>
      <Router>
        <Routes>
          <Route path="/blogDetails/:id" element={<BlogDetails setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />} /> {/* Send setSelectedCategory og selectedCategory som props */}
          <Route path="/" element={<Main setSelectedCategory={setSelectedCategory} />} /> {/* Send setSelectedCategory som props */}
        </Routes>
      </Router>
    </>
  )
}

export default App
