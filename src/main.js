const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const fetch = require('electron-fetch').default
require('dotenv').config()

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        autoHideMenuBar: true // öppnas med alt
    })

    win.loadFile(path.join(__dirname, 'index.html'))
}

app.on('ready', createWindow)

// TODO: LOGIN
ipcMain.handle('login-handler', async (event, data) => {
    try{

        const response = await fetch("https://wom-project1.azurewebsites.net/users/login", data)
        login = await response.json()
        console.log(login)
        return login
    } catch (error) {
        return error.message
    }
})

ipcMain.handle('getmycabins-handler', async (event, data) => {
    try{
            const response = await fetch('https://shielded-shelf-90510.herokuapp.com/cabins', data)
        
            cabins = await response.json()
            return cabins
    } catch (error) {
        return error.message
    }
})

ipcMain.handle('makeorder-handler', async (event, data) => {
    console.log("Placing order!")
    try{
        console.log(data)
        const response = await fetch('https://shielded-shelf-90510.herokuapp.com/orders', data)
    
        order = await response.json()
        console.log(order)
        return order

    } catch (error) {
        return error.message
    }
})

ipcMain.handle('deleteorder-handler', async (event, data) => {
    console.log("Deleting order!")
    try{
        console.log(data)

        let request = {
            method: 'DELETE',
            timeout: 5000
        }

        const response = await fetch('https://shielded-shelf-90510.herokuapp.com/orders/' + data, request)
    
        order = await response.json()
        // console.log(order)
        return order

    } catch (error) {
        return error.message
    }
})

ipcMain.handle('getmyorders-handler', async (event, data) => {
    try{
            const response = await fetch('https://shielded-shelf-90510.herokuapp.com/orders', data)
        
            orders = await response.json()
            return orders
    } catch (error) {
        return error.message
    }
})

ipcMain.handle('getmyservices-handler', async (event, data) => {
    try{
            const response = await fetch('https://shielded-shelf-90510.herokuapp.com/services', {
                headers: {
                    "Authorization": data,
                    "Content-Type": "application/json"},
                timeout: 5000
            })
        
            services = await response.json()
            return services
    } catch (error) {
        return error.message
    }
})

