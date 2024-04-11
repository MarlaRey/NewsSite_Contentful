import './App.scss'
import { Main } from './components/Main/Main'
import BlogList from './components/Blog/BlogList'
import BlogDetails from './components/Blog/BlogDetails'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/blogDetails/:id" element={<BlogDetails/>} />
          <Route path="/blogList" element={<BlogList/>} />
          <Route path="/main" element={<Main/>} />
          <Route path="/" element={<BlogList/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
