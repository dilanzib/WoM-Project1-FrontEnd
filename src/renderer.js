
// Listan på tjänster bör göras innan listan på stugor!
async function getServices() {
    servicelist = []

    const services = await window.electron.getMyServices(localStorage.getItem('jwt'))

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

        // console.log(d)
        var data = 
        {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({'cabin_id': i, 'services_id': s, 'order_date': d}),
            timeout: 5000
        }
        const order = await window.electron.makeOrder(data)
        // console.log(order)
        // document.querySelector("#"+i).innerHTML += order
            
    });
}

// Den här functionen kallas för att göra event listeners till listan av beställningar
function makeDeleteBtn(i){
    console.log("Making delete button " + i)
    document.querySelector("#delete"+i).addEventListener('click', async () => {
        
        console.log("Sending delete order!")
        console.log("Delete " + i)
        var data = i
        const order = await window.electron.deleteOrder(data)
        console.log(order)
        document.querySelector("#order_"+i).innerHTML = "RADERAD!"
            
    });
}

// HÄR GENERERAS SIDANS INNEHÅLL
cabins = async () => {
    var data = {
        headers: {
            'Authorization': localStorage.getItem('jwt')
        },
        timeout: 5000
    }
    const cabins = await window.electron.getMyCabins(data)

    // console.log(cabins)
    services = await getServices()

    
    document.querySelector('#cabins').innerHTML = '<li>'
    
    cabins.forEach(element => {
        let sauna
        if (element.sauna) sauna = "Med bastu"
        else sauna = "Utan bastu"
        let beach;
        if (element.sauna) beach = "Med strand"
        else beach = "Utan strand"
        // OBS. skillnaden mellan #order${element._id} - "beställ" - (här) 
        // och #order_${element.id} - "beställning" - (nedan)

        document.querySelector('#cabins').innerHTML += `
        <div id="${element._id}">
        <div><h4>${element.address}</h4></div>
        <div>Ägare: <a href="mailto: ${element.owner}" >${element.owner}</a></div>
        <div>Pris: ${element.price}</div>
        <div>Storlek: ${element.size}</div>
        <div>` + sauna + `</div>
        <div>` + beach + `</div>

        <select id="services${element._id}" name="services">
        `
        +services+
        `
        </select><br>
        <input id="date${element._id}" type="date" required pattern="\\d{4}-\\d{2}-\\d{2}"><br><br>
        <button class="btn btn-danger" id="order${element._id}">Beställ!</button><br><br>
        </div>`
        makeOrderBtn(element._id)
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
    })
    document.querySelector('#cabins').innerHTML += '</li>'
    cabins.forEach(element => {
        makeOrderBtn(element._id)
    })
};


orders = async () => {

    var data = {
        headers: {
            'Authorization': localStorage.getItem('jwt')
        },
        timeout: 5000
    }

    const orders = await window.electron.getMyOrders(data)

    // console.log(orders)

    document.querySelector('#orders').innerHTML = '<li>'

    orders.forEach(element => {
        // OBS. skillnaden mellan #order${element._id} - "beställ" - (ovan) 
        // och #order_${element.id} - "beställning" - (här)
        document.querySelector('#orders').innerHTML += `
        <ul id="order_${element.id}">
        <div><h5>Stug-id: ${element.cabin_id}</h5></div>
        <div>Servicetyp: ${element.services_id}</div>
        <div>datum: ${element.order_date}</div>
        <button class="btn btn-danger"  id="delete${element.id}">Ta bort!</button><br><br>
        </ul>`
    })

    document.querySelector('#orders').innerHTML += '</li>'

    orders.forEach(element => {
        makeDeleteBtn(element.id)
    })
};
// LOGIN
if (localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != 'undefined'){
    document.querySelector('#login').style.display = "none"
    document.querySelector('#notloggedin').style.display = "none"
    cabins()
    // Stugorna visas efter inloggning
    showCabins()
    orders()
}
else // Skapa login knapp
// Failed login ger svaret {message: 'No such user'}
{
document.querySelector("#loginBtn").addEventListener('click', async () => {
    var loginData =  {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify({email: document.querySelector("#user").value,
        password: document.querySelector("#password").value}),
        timeout: 5000
    }
    const login = await window.electron.login(loginData)
    // console.log(login)
    // document.querySelector('#login').innerHTML += `<div>JWT: ${login.accessToken}</div>`
    if (login.message){
        document.querySelector('#loginFail').innerHTML += 'Felaktig inloggning!'
    }
    else{
    localStorage.setItem('jwt',login.accessToken)
    location.reload();
    }
})}

function showCabins(){
    document.querySelector('#orders').style.display = "none"
    document.querySelector('#cabins').style.display = "block"
}

function showOrders(){
    document.querySelector('#cabins').style.display = "none"
    document.querySelector('#orders').style.display = "block"
}

function logOut(){
    localStorage.removeItem('jwt')
    location.reload()
}