const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    btnClicked: async (data) => {
        console.log('This is preload')
        return await ipcRenderer.invoke('btn-handler', data)
    },

    // LOGIN
    
    login: async (data) => {

        return await ipcRenderer.invoke('login-handler', data)
    },

    getMyCabins: async (data) => {
        console.log("Här ska mina stugor vara")

        return await ipcRenderer.invoke('getmycabins-handler', data)
    },

    makeOrder: async (data) => {

        return await ipcRenderer.invoke('makeorder-handler', data)
    },

    getMyOrders: async (data) => {
        console.log("Här ska mina beställningar vara")

        return await ipcRenderer.invoke('getmyorders-handler', data)
    },

    getMyServices: async (data) => {
        console.log("Här ska mina tjänster vara")

        return await ipcRenderer.invoke('getmyservices-handler', data)
    }
})