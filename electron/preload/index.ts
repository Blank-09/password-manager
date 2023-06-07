import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

function $(element: string): HTMLElement | null {
  return document.getElementById(element)
}

document.addEventListener('DOMContentLoaded', () => {
  const icons = $('maximize')?.querySelectorAll('svg')

  ipcRenderer.on('maximize', (_, isMaximized) => {
    icons?.[0].classList[!isMaximized ? 'add' : 'remove']('hidden')
    icons?.[1].classList[isMaximized ? 'add' : 'remove']('hidden')
  })

  $('minimize')?.addEventListener('click', () => {
    ipcRenderer.send('minimize')
  })

  $('maximize')?.addEventListener('click', () => {
    ipcRenderer.send('maximize')
  })

  $('close')?.addEventListener('click', () => {
    ipcRenderer.send('close')
  })
})

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
