//* main.js

//* Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })

  //* and load the index.html of the app.
  mainWindow.loadFile('src/index.html')
  mainWindow.webContents.openDevTools()
  //* Open the DevTools.
  //* mainWindow.webContents.openDevTools()
  let menu = Menu.buildFromTemplate([
    {
      //* aqui se crea la etiqueta de la barra de menu principal
      //* label es para nombrar las cosas
      label: 'Menu',
      //* etiqueta de submenu
      submenu: [
        //* se pone lo que se quiera aparececer dentro del array con objetos
          {label: 'Adjust Notification Value'},
          {
            label: 'CoinMarketCap',
            click() {
              //* abre una pagina externa al programa
              shell.openExternal('http://coinmarketcap.com')
            }
          },
          //* el type identifica lo que queremos poner como por ejemplo un separador 
          {type: 'separator'},
          {
            label: 'Exit',
            click() {
              app.quit()
            }
          }
        
      ]
    },
    {
      label: 'Info'
    }
  ])
  Menu.setApplicationMenu(menu);
}

//* This method will be called when Electron has finished
//* initialization and is ready to create browser windows.
//* Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    //* On macOS it's common to re-create a window in the app when the
    //* dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

//* Quit when all windows are closed, except on macOS. There, it's common
//* for applications and their menu bar to stay active until the user quits
//* explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

//* In this file you can include the rest of your app's specific main process
//* code. Tu también puedes ponerlos en archivos separados y requerirlos aquí.