import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'

// Components
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { CustomCommandDialog as CommandDialog } from '@/components/Command'
import { CustomMenubar as Menubar } from '@/components/MenuBar'
import { useTheme } from 'next-themes'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (localStorage.getItem('login') !== '1') {
      navigate('/')
    }
  }, [])

  return (
    <>
      <Menubar />
      <CommandDialog />
      <div className="p-3 flex gap-3 flex-col h-full">
        <div className="flex justify-between items-center">
          <h3 className="px-1 text-xl font-semibold">Accounts Manager</h3>

          <div className="flex items-center space-x-3">
            <Label htmlFor="toggle">Dark Mode: </Label>
            <Switch
              id="toggle"
              checked={theme === 'dark'}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />

            <Button size="icon" onClick={() => navigate('create')}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  )
}

export default Home
