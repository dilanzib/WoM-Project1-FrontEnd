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

// const login = async () => {
//     console.log("login till projekt 1")

// }

// INGEN LOGIN I DET HÄR SKEDET!
ipcMain.handle('getmycabins-handler', async (event, data) => {
    console.log("Get my cabins main!")
    try{
            // OBS. ÄNDRA URL
            const response = await fetch('http://127.0.0.1:5000/', {
                headers: {
                    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTU3NTFlYWQ3NWYxNzg5M2JjZWM0NzMiLCJlbWFpbCI6ImtyYWFrYW5Aa3Jha21haWwuY29tIiwiaWF0IjoxNjM0MDY4MjMwLCJleHAiOjE2MzY2NjAyMzB9.VpnFgaOfbcpkHVOYQbRDp6q3VCAWo8uZGn8htEsO_bU",
                    "Content-Type": "application/json"},
                body: {
                },
                timeout: 2000
            })
        
            login = await response.json()
            return login
        } catch (error) {
            return error.message
        }
})

ipcMain.handle('btn-handler', async (event, data) => {
    console.log("This is main!")
    return "Return from main."
})

