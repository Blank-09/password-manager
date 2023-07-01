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
import AddAccount from './pages/home/AddAccount'
import AccountEmpty from './pages/home/AccountEmpty'
import { getUserAccounts } from './lib/SQL'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Security />
  },
  {
    path: 'accounts',
    element: <App />,
    children: [
      {
        index: true,
        element: <AccountEmpty />,
        loader: () => {
          return getUserAccounts()
        }
      },
      {
        path: 'new',
        element: <AddAccount />
      }
    ]
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
