import * as React from 'react'

import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'

// Others
import router from './routes'

// Components
import { Toaster } from '@/components/ui/sonner'
import { ContextMenuProvider } from './components/ContextMenu'

const App: React.FC = () => {
  React.useEffect(() => {
    if (localStorage.getItem('login') !== '1') {
      router.navigate('/')
    }
  }, [])

  return (
    <ThemeProvider //
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ContextMenuProvider>
        <RouterProvider router={router} />
        <Toaster richColors />
      </ContextMenuProvider>
    </ThemeProvider>
  )
}

export default App
