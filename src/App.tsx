import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'

// import { SelectDemo } from './components/Select'

import { Label } from './components/ui/label'
import { Button } from './components/ui/button'
import { Switch } from './components/ui/switch'

function App(): JSX.Element {
  const [dark, setDark] = React.useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const dark = localStorage.getItem('dark') === '1'
    setDark(dark)

    if (dark) {
      document.body.classList.add('dark')
    }

    if (localStorage.getItem('login') !== '1') {
      navigate('/')
    }
  }, [])

  return (
    <div className="p-3 flex gap-3 flex-col h-full">
      <div className="flex justify-between items-center">
        <h3 className="px-1 text-xl font-semibold">Accounts Manager</h3>

        <div className="flex items-center space-x-3">
          <Label htmlFor="toggle">Dark Mode: </Label>
          <Switch
            id="toggle"
            checked={dark}
            onClick={() => {
              setDark(!dark)
              localStorage.setItem('dark', dark ? '0' : '1')
              document.body.classList.toggle('dark')
            }}
          />

          <Button size="icon" onClick={() => navigate('create')}>
            <Plus className="h-4 w-4" />
          </Button>

          {/* <SelectDemo /> */}
        </div>
      </div>

      <Outlet />
    </div>
  )
}

export default App
