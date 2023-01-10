import react from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./views/Home/Home.js"
import Login from './views/Login/Login.js'
import Signup from './views/Signup/Signup.js'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/about' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App