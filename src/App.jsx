import React from 'react'
import { BrowserRouter as Router,Routes,Route,NavLink } from 'react-router-dom'
import Home from './Components/Home'
import NewsDeatils from './Components/NewsDetails'
import About from './Components/About'
import Footer from './Components/Footer'
import Contact from './Components/Contact'
import "./App.css";
const App = () => {
  return (
    <Router>
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">News Application</h1>
        <nav className="app-nav">
          <NavLink to="/" className={({isActive})=>isActive?"nav-link active":"nav-link"} end>
          Home
          </NavLink>

          <NavLink to="/about-us" className={({isActive})=>isActive?"nav-link active":"nav-link"}end>
          About
          </NavLink>
          <NavLink to="/contact-us" className={({isActive})=>isActive?"nav-link active":"nav-link"}end>
          Contact Us
          </NavLink>
        </nav>
      </header>
     <main className='app-main'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about-us' element={<About/>}/>
        <Route path='/contact-us' element={<Contact/>}/>
      {/* <Route path='/news/:id' element={<NewsDeatils/>}/> */}
      
      </Routes>
      </main>
      <Footer/>
    </div>
    </Router>
  )
}

export default App
