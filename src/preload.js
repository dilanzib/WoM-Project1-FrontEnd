const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electron', {

    // LOGIN
    
    login: async (data) => {

        return await ipcRenderer.invoke('login-handler', data)
    },

    getMyCabins: async (data) => {

        return await ipcRenderer.invoke('getmycabins-handler', data)
    },

    makeOrder: async (data) => {

        return await ipcRenderer.invoke('makeorder-handler', data)
    },

    deleteOrder: async (data) => {
        console.log("Preloading delete order!")

        return await ipcRenderer.invoke('deleteorder-handler', data)
    },

    getMyOrders: async (data) => {

        return await ipcRenderer.invoke('getmyorders-handler', data)
    },

    getMyServices: async (data) => {

        return await ipcRenderer.invoke('getmyservices-handler', data)
    }
})