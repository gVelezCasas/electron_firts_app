//* imports and requires + constants
const { default: axios } = require('axios')
const electron = require('electron')
const path = require('path')
const ipc = electron.ipcRenderer
const BrowserWindow = electron.remote.BrowserWindow
const notifyBtn = document.getElementById('notifyBtn')
const notification ={
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}
// const axios = require('axios')

// //* variables
let price = document.querySelector('h1')
let targetPrice = document.getElementById('targetPrice')
let targetPriceVal



function getBTC(){
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD').then(res=>{
        const cryptos = res.data.BTC.USD
        price.innerHTML='$'+cryptos.toLocaleString('es')

        if(targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD){
            const myNotification = new window.Notification(notification.title,notification)
        }
    })
}
getBTC()
setInterval(getBTC,30000);
notifyBtn.addEventListener('click',function (event){
    const modalPath = path.join('file://',__dirname,'add.html')
    let win = new BrowserWindow({frame:false, transparent:true,alwaysOnTop:true, width:400,height:200,webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },})
    //win.webContents.openDevTools()
    win.on('close',function() {win=null})
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetPriceVal', function(event,arg){
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('es')
})
