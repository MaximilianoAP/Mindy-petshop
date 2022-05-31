let dataApi;
async function getData() {
    await fetch ("https://apipetshop.herokuapp.com/api/articulos")
        .then (response => response.json())
        .then (json => dataApi = json)

        var arrayData = dataApi.response
        console.log (arrayData)
        var arrayJuguetes = arrayData.filter (e => e.tipo.includes("Juguete"))
        console.log (arrayJuguetes)
}
getData()