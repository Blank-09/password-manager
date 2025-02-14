import { createBrowserRouter } from 'react-router'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="grid place-items-center min-h-screen bg-white text-neutral-950">
        <h1 className="text-7xl font-bold">Hello World 👋</h1>
      </div>
    )
  }
])

export default router
