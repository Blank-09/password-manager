import { ipcMain as ipc, dialog } from 'electron'
import IUserAccount from './interface/IUserAccount'

import {
  insertIntoUserAccount,
  removeUserAccount,
  selectAllFromUserAccount,
  selectFromUserAccount,
  updateUserAccount
} from './utils'

ipc.on('ping', (_e, args: string) => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Alert',
    message: args,
    buttons: ['OK']
  })
  return 'pong'
})

ipc.handle('db:insertUserAccount', (_e, arg: IUserAccount) => {
  insertIntoUserAccount(
    arg?.account_name || '', //
    arg?.username || '',
    arg?.icon || '',
    arg?.password || '',
    arg?.isFavorite || false
  )
})

ipc.handle('db:updateUserAccount', (_e, arg: IUserAccount) => {
  updateUserAccount(
    arg.id, //
    arg.account_name,
    arg.username,
    arg.icon,
    arg.password,
    arg.isFavorite
  )
})

ipc.handle('db:removeUserAccount', (_e, arg: number) => {
  removeUserAccount(arg)
})

ipc.handle('db:get-all', async () => {
  return await selectAllFromUserAccount()
})

ipc.handle('db:get', async (_e, arg: number) => {
  return await selectFromUserAccount(arg)
})
