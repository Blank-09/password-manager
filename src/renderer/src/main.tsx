import './styles/globals.css'

// React
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const root = document.getElementById('root') as HTMLElement

// Logout
localStorage.setItem('login', '0')

// prettier-ignore
ReactDOM
  .createRoot(root)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>    
  )
