let id = document.getElementById("id")
let btn = document.getElementById("button")
let name = document.getElementById("name")
let num = document.getElementById("num")
let get = document.getElementById("get")
let getAll = document.getElementById("get-all")
let post = document.getElementById("post")
let put = document.getElementById("put")
let del = document.getElementById("delete")
let resultStatus = document.getElementById("result-status")
let resultData = document.getElementById("result-data")

btn.addEventListener('click', () => {
    document.body.innerHTML = ''
    let btn2 = document.createElement('input')
    btn2.type = 'button'
    btn2.value = 'TV on'
    btn2.addEventListener('click', event => window.location.reload())
    document.body.appendChild(btn2)
})

let result = async (res, get) => {
    resultStatus.innerText = `${res.status} ${res.statusText}`
    if(get == true) {
        resultData.innerText = await res.text()
    } else if(get == false){
        resultData.innerText = ""
    } else { null }
}


/*let body = {
    id: id.value,
    name: name.value,
    num: num.value
}*/

getAll.addEventListener('click',
    async () => {
        try {
            let response = await fetch(`/api/channels`)
            result(response, true)
        } catch (e) { console.dir(e) }
})

get.addEventListener('click', async () => {
    let body = {
        id: id.value,
        name: name.value,
        num: num.value
    }
    try {
       for(let key in body) {
           if(body[key]) {
               let response = await fetch(`/api/channels/${key}/${body[key]}`)
               result(response, true)
           } else {
               resultData.innerText = 'Add data first'
           }
       }
    } catch (e) { console.dir(e) }
})

post.addEventListener("click", async () => {
    let body = {
        name: name.value,
        num: Number(num.value)
    }
    try {
        const response = await fetch("/api/channels",
            {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(body)
            }
        )
        result(response)
        resultData.innerText = response.headers.get("Location")
    } catch (e) { console.dir(e) }
})

put.addEventListener("click", async () => {
    let body = {
        name: name.value,
        num: Number(num.value)
    }
    try {
            const response = await fetch(`/api/channels/id/${id.value}`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify(body)
                }
            )
            result(response, false)
    } catch (e) { console.dir(e) }
})

del.addEventListener("click", async () => {
    let body = {
        id: id.value,
        name: name.value,
        num: num.value
    }
    try {
        for(let key in body) {
            if(body[key]) {
                let response = await fetch(`/api/channels/${key}/${body[key]}`, {method: "DELETE"})
                result(response, true)
            } else {
                resultData.innerText = 'Add data first'
            }
        }
    } catch (e) { console.dir(e) }
})
