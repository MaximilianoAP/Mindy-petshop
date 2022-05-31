let dataApi;
async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(json => dataApi = json)

    var arrayData = dataApi.response
    console.log(arrayData)
    var arrayMedicamento = arrayData.filter(e => e.tipo.includes("Medicamento"))
    console.log(arrayMedicamento)
    medicamentosBaratos = []
    console.log()
    //captura de datos checkbox
    var checkbox = document.querySelectorAll('input[type=checkbox]')
    checkSeleccionado = []

    checkbox.forEach(check => check.addEventListener('click', (evento) => {
        var checkeado = evento.target.checked
        console.log (checkeado)
        if (checkeado) {
            checkSeleccionado.push(evento.target.value)
        } else {
            checkSeleccionado = checkSeleccionado.filter(uncheck => uncheck !== evento.target.value)
        }
        arrayaImprimir()
       // console.log(checkSeleccionado)
    }))

    //arrays a imprimir
    var medicamentosBaratos = arrayMedicamento.filter(medicamento => medicamento.precio <= 500)
    //console.log (medicamentosBaratos)
    var medicamentosCaros = arrayMedicamento.filter(medicamento => medicamento.precio > 500)
    //console.log (medicamentosCaros)
    var pocoStock = arrayMedicamento.filter(medicamento => medicamento.stock <= 5)
    //console.log (pocoStock)

    //combinar checkbox y searchInput
function arrayaImprimir () {
    var array = [];
    checkSeleccionado.forEach (e => {
    if (e.includes("menos500")) {
        array.push(medicamentosBaratos)
    } else if (e.includes("mas500")) {
        array.push(medicamentosCaros)
    } else if (e.includes("bajoStock")) {
        array.push(pocoStock)
    } else {
        array.push(arrayMedicamento)
    }
    console.log(array)
})

var arraydef = array[0].concat(array[1]).concat(array[2])
var setImprimir = new Set (arraydef)
var arrayImprimirDefinitvo = [...setImprimir]
console.log (arrayImprimirDefinitvo)

    //capturar datos search
    var search = document.getElementById("search")
    search.addEventListener('keyup', (evento) => {
        textSearch = evento.target.value
        console.log(textSearch)
    })


    let contMedicine = document.getElementById('contMedicine')
    function displayCards(arrayFarmacia) {
            let templateCard = "";
        arrayFarmacia.forEach(element => {
            templateCard += `
            <div class="col-lg-3 col-md-6 col-sm-12 my-2">
            <div class="card">
                <img src="${element.imagen}" class="card-img-top border" alt="...">
                <div class="card-body">
                    <h3 class="card-text mb-3">${element.nombre}</h3>
                    <h4 class="card-title mb-3">$${element.precio}</h4>
                    <p>Descripcion:${element.descripcion}</p>
                    <div class="d-flex justify-content-center">
                        <a href="./details.html" class="btn btn-danger">detalles</a>
                    </div>
                </div>
            </div>
        </div>
            `
            contMedicine.innerHTML = templateCard
        })
    }

}
}
getData()


    //funcion para obtener array a imprimir
    // function arrayaImprimir() {
    //     checkSeleccionado.forEach(e => {
    //         arrayDefinitivo= []
    //         if (e == "menos500") {
    //             arrayDefinitivo.push(medicamentosBaratos)
    //         } else if (e == "mas500") {
    //             arrayDefinitivo.push(medicamentosCaros)
    //         } else if (e == "bajoStock") {
    //             arrayDefinitivo.push(pocoStock)
    //         } else {
    //             arrayDefinitivo.push(arrayMedicamento)
    //         }
    //         console.log(arrayDefinitivo)
    //     displayCards(arrayDefinitivo)
    //     })
    //     }





// function arrayFiltrado() {
//     let dato = []
//     if (checkSeleccionado.length = "menos500") {
//         checkSeleccionado.map(seleccionado => {
//             dato.push(...dataArray.filter(element => element.name.toLowerCase().includes(textSearch.trim().toLowerCase()) && element.category == seleccionado))
//         })
//     } else if (checkSeleccionado.length > 0 && textSearch == "") {
//         checkSeleccionado.map(seleccionado => dato.push(...dataArray.filter(element => element.category == seleccionado)))
//     } else if (checkSeleccionado.length == 0 && textSearch !== "") {
//         dato.push(...dataArray.filter(element => element.name.toLowerCase().includes(textSearch.trim().toLowerCase())))
//     } else {
//         dato.push(...dataArray)
//     }
//     //console.log(dato)
//     displayUpcomingCard(dato)
// }
// arrayFiltrado()