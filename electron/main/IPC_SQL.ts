import { ipcMain as ipc } from 'electron'
import IUserAccount from './interface/IUserAccount'

import {
  insertIntoUserAccount,
  removeUserAccount,
  selectAllFromUserAccount,
  selectFromUserAccount,
  updateUserAccount
} from './utils'

ipc.handle('db:insertUserAccount', async (_e, arg: IUserAccount) => {
  insertIntoUserAccount(
    arg.account_name, //
    arg.username,
    arg.icon,
    arg.password,
    arg.isFavorite
  )
})

ipc.handle('db:updateUserAccount', async (_e, arg: IUserAccount) => {
  updateUserAccount(
    arg.id, //
    arg.account_name,
    arg.username,
    arg.icon,
    arg.password,
    arg.isFavorite
  )
})

ipc.handle('db:removeUserAccount', async (_e, arg: number) => {
  removeUserAccount(arg)
})

ipc.handle('db:get-all', async () => {
  return await selectAllFromUserAccount()
})

ipc.handle('db:get', async (_e, arg: number) => {
  return await selectFromUserAccount(arg)
})
