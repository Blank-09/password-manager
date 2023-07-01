import IUserAccount from '../interface/IUserAccount'

export function insertIntoUserAccount(data: IUserAccount) {
  window.electron.ipcRenderer.invoke('db:insertUserAccount', data)
}

export function updateUserAccount(data: IUserAccount) {
  if (data.id) window.electron.ipcRenderer.invoke('db:updateUserAccount', data)
  else insertIntoUserAccount(data)
}

export function getUserAccounts(): Promise<IUserAccount[]> {
  return new Promise((resolve, reject) => {
    window.electron.ipcRenderer
      .invoke('db:get-all') //
      .then(resolve)
      .catch(reject)
  })
}

export function removeUserAccount(id: number) {
  window.electron.ipcRenderer.invoke('db:removeUserAccount', id)
}
