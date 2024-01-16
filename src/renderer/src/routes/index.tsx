import { createBrowserRouter } from 'react-router-dom'

import Security from '@/pages/Security'
import AddAccount from '@/pages/home/AddAccount'
import AccountEmpty from '@/pages/home/AccountEmpty'
import { AlertDialogDemo } from '@/pages/home/AlertDialog'

import { getUserAccounts, removeUserAccount } from '@/lib/SQL'
import Home from '@/pages/home'

// FIXME: This is a workaround for a bug in vite-plugin-react-pages/react-router-dom
const router = createBrowserRouter([
  {
    path: '/',
    element: <Security />
  },
  {
    path: 'accounts',
    element: <Home />,
    children: [
      {
        path: '/accounts',
        element: <AccountEmpty />,
        loader: () => {
          return getUserAccounts()
        }
      },
      {
        path: 'create',
        element: <AddAccount />
      },
      {
        path: 'edit/:id',
        element: <AddAccount />
      },
      {
        path: 'delete/:id',
        element: <AlertDialogDemo cb={(success, id) => (success ? removeUserAccount(id) : '')} />
      }
    ]
  }
])

export default router
