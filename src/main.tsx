// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// App
import App from './App'

// CSS
import './styles/globals.css'

// Components
import { ContextMenuProvider } from './components/ContextMenu'
import { MenubarDemo } from './components/MenuBar'
import { CommandDialogDemo } from './components/Command'
import Security from './pages/Security'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Security />
  },
  {
    path: '/home',
    element: <App />
  }
])

localStorage.setItem('login', '0')
const dark = localStorage.getItem('dark') === '1'

if (dark) {
  document.body.classList.add('dark')
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextMenuProvider>
      <CommandDialogDemo />
      <RouterProvider router={router} />
    </ContextMenuProvider>
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('menubar') as HTMLElement).render(
  <React.StrictMode>
    <MenubarDemo />
  </React.StrictMode>
)
