import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer } from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'
import serve from './serve'

// let loadURL
// if (is.dev) {
const loadURL = serve({ directory: 'out/renderer', scheme: 'pmg' })
// }

import './IPC_SQL'

async function createWindow(): Promise<void> {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    show: false,
    frame: false,

    // autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // mainWindow.removeMenu()
  // mainWindow.webContents.openDevTools()

  ipcMain.on('minimize', () => {
    mainWindow.minimize()
  })

  ipcMain.on('maximize', () => {
    if (mainWindow.isMaximized()) mainWindow.unmaximize()
    else mainWindow.maximize()
  })

  ipcMain.on('close', () => {
    mainWindow.close()
  })

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('maximize', true)
  })

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('maximize', false)
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  ipcMain.handle('win:devtools', () => {
    mainWindow.webContents.toggleDevTools()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  // if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
  //   mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  // } else {
  await loadURL(mainWindow)
  // mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  // }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.password-manager')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
