import { RouterProvider } from 'react-router'

// Components
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/sonner'

// Routes
import router from './routes'

function App(): JSX.Element {
  return (
    <ThemeProvider //
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <RouterProvider router={router} />
      <Toaster richColors />
    </ThemeProvider>
  )
}

export default App
