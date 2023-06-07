// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// App
import App from './App'

// CSS
import './styles/globals.css'
import { ContextMenuProvider } from './components/ContextMenu'
import { MenubarDemo } from './components/MenuBar'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextMenuProvider>
      <RouterProvider router={router} />
    </ContextMenuProvider>
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('menubar') as HTMLElement).render(
  <React.StrictMode>
    <MenubarDemo />
  </React.StrictMode>
)
