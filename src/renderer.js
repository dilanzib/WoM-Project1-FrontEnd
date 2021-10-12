console.log('hello browser')

document.querySelector("#btn").addEventListener('click', async () => {
    console.log('Renderer here!')

    const reply = await window.electron.btnClicked('Reply from renderer')
});

// INGEN LOGIN I DET HÄR SKEDET!
(async () => {
    console.log("my cabins rendered")

    const cabins = window.electron.getMyCabins()

    console.log(cabins)
    cabins.foreach(element => {
        document.querySelector('#cabins').innerHTML += `<div>${element.text}</div>`
    })
})()