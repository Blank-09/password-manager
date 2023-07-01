import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Podcast } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './components/ui/dialog'

// import { SelectDemo } from './components/Select'

import { Input } from './components/ui/input'
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
    <div className="px-3 pt-3 flex flex-col h-full">
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

          {/* <SelectDemo /> */}
        </div>
      </div>

      <div className="py-3 h-full">
        <div className="flex h-full w-full shrink-0 items-center justify-center rounded-md border border-dashed">
          <div className="mx-auto flex flex-col items-center justify-center text-center">
            <Podcast className="h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Accounts added</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              You have not added any Accounts. Add one below.
            </p>
            <Dialog>
              <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 relative">
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Account</DialogTitle>
                  <DialogDescription>
                    Please fill your Accounts details to import.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username / Email</Label>
                    <Input id="username" placeholder="example@gmail.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="password" />
                  </div>
                </div>
                <DialogFooter>
                  <Button>Add Account</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
