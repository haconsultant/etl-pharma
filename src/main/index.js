'use strict'

import { app, BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let iconPath = path.join(__static, 'v.png')

let mainWindow
let tray

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function readyApp () {
  createWindow()
  createTray()
}
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 840,
    maxHeight: 840,
    minHeight: 840,
    width: 800,
    maxWidth: 800,
    minWidth: 750,
    useContentSize: true,
    webPreferences: {webSecurity: false}
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createTray () {
  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Conexion', type: 'radio'},
    {label: 'Sincrionizar', type: 'radio'},
    {label: 'Ayuda', type: 'radio'},
    { label: 'Salir',
      accelerator: 'Command+Q',
      selector: 'terminate:'
    }
  ])
  tray.setToolTip('ETL - Herramienta de Migracion')
  tray.setContextMenu(contextMenu)
}

app.on('ready', readyApp)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})