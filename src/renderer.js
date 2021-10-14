console.log('hello browser')

document.querySelector("#btn").addEventListener('click', async () => {
    console.log('Renderer here!')

    const reply = await window.electron.btnClicked('Reply from renderer')
});

// Listan på tjänster bör göras innan listan på stugor!
async function getServices() {
    console.log("my services rendered")
    servicelist = []

    const services = await window.electron.getMyServices()

    options=""
    for(i=0;i<services.length;i++){
        options += "<option value="+services[i].id+">"+services[i].service+"</option>"            
    }
    return options
};

// Den här functionen kallas för att göra event listeners till listan av stugor
function makeOrderBtn(i){
    document.querySelector("#order"+i).addEventListener('click', async () => {
        let s = document.querySelector("#services"+i).value
        const datefield = document.querySelector("#date"+i)
        // datefield.setAttribute("min", today)
        d = datefield.value
        d = "02-01-2021"
        console.log(d)
        const order = await window.electron.makeOrder({id: i, selection: s, order_date: d})
        order.forEach(element =>{
            document.querySelector("#"+i).innerHTML += element
            })
    });
}

// HÄR GENERERAS SIDANS INNEHÅLL
cabins = async () => {
    console.log("my cabins rendered")

    const cabins = await window.electron.getMyCabins()

    console.log(cabins)
    services = await getServices()

    
    cabins.forEach(element => {
        let sauna
        if (element.sauna) sauna = "med bastu"
        else sauna = "utan bastu"
        let beach;
        if (element.sauna) beach = "med strand"
        else beach = "utan strand"

        document.querySelector('#cabins').innerHTML += `
        <div id="${element._id}">
        <div>${element.address}</div>
        <a href="mailto: ${element.owner}" >${element.owner}</a>
        <div>pris: ${element.price}</div>
        <div>storlek: ${element.size}</div>
        <div>` + sauna + `</div>
        <div>` + beach + `</div>

        <select id="services${element._id}" name="services">
        `
        +services+
        `
        </select>
        <input id="date${element._id}" type="date" required pattern="\\d{4}-\\d{2}-\\d{2}">
        <button id="order${element._id}">Beställ!</button>
        </div>`
        makeOrderBtn(element._id)
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
    })
};


orders = async () => {
    console.log("my orders rendered")

    const orders = await window.electron.getMyOrders()

    console.log(orders)

    orders.forEach(element => {
        document.querySelector('#orders').innerHTML += `<div>${element.id}</div>
        <div>Servicetyp: ${element.services_id}</div>
        <div>datum: ${element.order_date}</div>`
    })
};
// LOGIN
(
    async () => {
    const login = await window.electron.login()
    console.log(login)
    document.querySelector('#login').innerHTML += `<div>JWT: ${login}</div>`
})()
cabins()
orders()