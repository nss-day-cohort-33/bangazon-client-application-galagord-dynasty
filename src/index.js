import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import './index.css'
import BangazonApp from './components/BangazonApp'

ReactDOM.render(
  <Router>
      <BangazonApp />
  </Router>
  , document.getElementById('root'))
