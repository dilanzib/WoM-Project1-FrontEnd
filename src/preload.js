const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    btnClicked: async (data) => {
        console.log('This is preload')
        return await ipcRenderer.invoke('btn-handler', data)
    },

    // INGEN LOGIN I DET HÄR SKEDET!
    getMyCabins: async (data) => {
        console.log("Här ska mina stugor vara")

        return await ipcRenderer.invoke('getmycabins-handler', data)
    }
})