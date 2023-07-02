import React, { useEffect } from 'react'

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

import { getUserAccount, insertIntoUserAccount, updateUserAccount } from '../../lib/SQL'
import { useMatch } from 'react-router-dom'

const initialState = {
  name: '',
  username: '',
  password: ''
}

const AddAccount = () => {
  const [open, setOpen] = React.useState<boolean>(true)
  const [data, setData] = React.useState(initialState)

  const match = useMatch('/accounts/edit/:id')
  const isEditMode = match?.params.id !== undefined

  useEffect(() => {
    if (match?.params.id === undefined) return

    getUserAccount(parseInt(match.params.id)) //
      .then((res) => {
        if (res !== undefined) {
          setData({
            name: res.account_name,
            username: res.username,
            password: res.password
          })
        }
      })
  }, [])

  function onClickHandler() {
    if (match?.params.id === undefined) {
      insertIntoUserAccount({
        id: -1,
        icon: '/test.png',
        account_name: data.name,
        username: data.username,
        password: data.password,
        isFavorite: false
      })
    } else {
      updateUserAccount({
        id: parseInt(match.params.id),
        icon: '/test.png',
        account_name: data.name,
        username: data.username,
        password: data.password,
        isFavorite: false
      })
    }

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
          <DialogTitle>{isEditMode ? 'Edit' : 'Add'} Account</DialogTitle>
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
          <Button onClick={onClickHandler}>{isEditMode ? 'Update' : 'Add'} Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddAccount
