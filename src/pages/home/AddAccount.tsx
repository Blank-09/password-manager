import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../../components/ui/dialog'

import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'

import { insertIntoUserAccount } from '../../lib/SQL'

const initialState = {
  name: '',
  username: '',
  password: ''
}

const AddAccount = () => {
  const [open, setOpen] = React.useState<boolean>(true)
  const [data, setData] = React.useState(initialState)

  function onClickHandler() {
    // @ts-ignore SQL creates a new ID
    insertIntoUserAccount({
      icon: '/test.png',
      account_name: data.name,
      username: data.username,
      password: data.password,
      isFavorite: false
    })

    setData(initialState)
    setOpen(false)
    setTimeout(() => history.back(), 100)
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open)
        setTimeout(() => history.back(), 100)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Account</DialogTitle>
          <DialogDescription>Please fill your Accounts details to import.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Account Name</Label>
            <Input
              onChange={onChangeHandler}
              value={data.name}
              id="name"
              placeholder="Google Account"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username / Email</Label>
            <Input
              onChange={onChangeHandler}
              value={data.username}
              id="username"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={onChangeHandler}
              value={data.password}
              id="password"
              placeholder="password"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClickHandler}>Add Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddAccount
