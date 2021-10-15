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

// TODO: Sätt jwt i localstorage?
// localStorage.setItem("user_key", 
jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTY2OTlkMzcwMmQyNzdlOGE1YmQzMGQiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjM0MTQ2OTIwLCJleHAiOjE2MzkzMzA5MjB9.nhgJEjjxQFRwXqnsu5O9h0jfTPclGL2OHP7QvDO5oCI";

// TODO: LOGIN
ipcMain.handle('login-handler', async (event, data) => {
    console.log("\n\nLÄS HÄR:")
    try{
        // OBS. ÄNDRA URL
        const D = {
            email: "kraakan@krakmail.com",
            password: "hejhej123"
        }

        const response = await fetch("https://wom-project1.azurewebsites.net/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"},
            body: JSON.stringify(D),
            timeout: 5000
        })
        console.log(response)
        login = await response.json()
        console.log(login)
        return login
    } catch (error) {
        return error.message
    }
})

ipcMain.handle('getmycabins-handler', async (event, data) => {
    console.log("Get my cabins main!")
    try{
            const response = await fetch('https://shielded-shelf-90510.herokuapp.com/cabins', {
                headers: {
                    "Authorization": jwt,
                    "Content-Type": "application/json"},
                timeout: 5000
            })
        
            cabins = await response.json()
            return cabins
    } catch (error) {
        return error.message
    }
})

ipcMain.handle('makeorder-handler', async (event, data) => {
    console.log("Placing order!")
    try{
        // LÄGG TILL DATUM "order_date"
        console.log(data.order_date)
            const response = await fetch('https://shielded-shelf-90510.herokuapp.com/orders', {
                method: "POST",
                headers: {
                    "Authorization": jwt,
                    "Content-Type": "application/json"},
                body: JSON.stringify(data),
                timeout: 5000
            })
        
            order = await response.json()
            console.log(order)
            return order

            // console.log(data.id)
            // console.log(data.selection)


    } catch (error) {
        return error.message
    }
})

ipcMain.handle('getmyorders-handler', async (event, data) => {
    console.log("Get my orders main!")
    try{
            const response = await fetch('https://shielded-shelf-90510.herokuapp.com/orders', {
                headers: {
                    "Authorization": jwt,
                    "Content-Type": "application/json"},
                timeout: 5000
            })
        
            orders = await response.json()
            return orders
    } catch (error) {
        return error.message
    }
})

ipcMain.handle('getmyservices-handler', async (event, data) => {
    console.log("Get my services main!")
    try{
            const response = await fetch('https://shielded-shelf-90510.herokuapp.com/services', {
                headers: {
                    "Authorization": jwt,
                    "Content-Type": "application/json"},
                timeout: 5000
            })
        
            services = await response.json()
            return services
    } catch (error) {
        return error.message
    }
})

ipcMain.handle('btn-handler', async (event, data) => {
    console.log("This is main!")
    return "Return from main."
})

