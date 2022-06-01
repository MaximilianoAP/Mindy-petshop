let dataApi;

async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(json => dataApi = json)

    let arrayData = dataApi.response
    id = 1
    arrayData.map(item => item.id = id++)
    console.log(arrayData)

    let arrayMedicamento = arrayData.filter(e => e.tipo == "Medicamento")
    console.log(arrayMedicamento)

    medicamentosBaratos = []
    console.log()
    //captura de datos checkbox
    let checkbox = document.querySelectorAll('input[type=checkbox]')
    checkSeleccionado = []

    checkbox.forEach(check => check.addEventListener('click', (evento) => {
        let checkeado = evento.target.checked
        if (checkeado) {
            checkSeleccionado.push(evento.target.value)
        } else {
            checkSeleccionado = checkSeleccionado.filter(uncheck => uncheck !== evento.target.value)
        }
        arrayaImprimir()
        console.log(checkSeleccionado)
    }))

    //combinar checkbox y searchInput
    function arrayaImprimir() {
        let array = [];
        if (checkSeleccionado.length > 0) {
            checkSeleccionado.forEach(e => {
                if (e.includes("menos500")) {
                    array.push(...arrayMedicamento.filter(medicamento => medicamento.precio <= 500))
                } else if (e.includes("mas500")) {
                    array.push(...arrayMedicamento.filter(medicamento => medicamento.precio > 500))
                } else {
                    array.push(...arrayMedicamento.filter(medicamento => medicamento.stock <= 5))
                }
            })
        } else {
            array.push(...arrayMedicamento)
        }
        console.log(array)
        displayCards(array)
    }

    //capturar datos search

    let search = document.getElementById("search")
    search.addEventListener('keyup', (evento) => {
        textSearch = evento.target.value
        filtrarBuscador()
        console.log(textSearch)
    })

    function filtrarBuscador() {
        if (textSearch !== "") {
            let arrayBusqueda = []
            console.log(textSearch)
            arrayBusqueda.push(...arrayMedicamento.filter(elemento => elemento.nombre.toLowerCase().includes(textSearch.trim().toLowerCase())))
            console.log(arrayBusqueda)
        }
        displayCards(arrayBusqueda)
    }




    function displayCards(arrayFarmacia) {

        let contMedicine = document.getElementById('contMedicine')

        let templateCard = "";
        if (arrayFarmacia.length > 0) {
            arrayFarmacia.forEach(element => {
                if (element.stock < 5) {
                    templateCard += `
            <div class="col-lg-3 col-md-6 col-sm-12 my-2 m-3">
            <div class="card" id="card">
                <img src="${element.imagen}" class="card-img-top border" alt="...">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h3 class="card-text mb-3">${element.nombre}</h3>
                    <h4 class="card-title mb-3">$${element.precio} <span class="text-danger parpadeo">¡¡Ultimas Unidades!!</span></h4>
                    <div class="d-flex flex-column h-100 justify-content-between">
                        <p>Descripcion: ${element.descripcion}</p>
                        <div class="d-flex justify-content-center">
                            <a href="#" class="btn carritoAgregar carritoEliminar" onclick="fnCarrito(${element.id})" id="btn-cards">Agregar al carrito</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `
                    contMedicine.innerHTML = templateCard
                } else {
                    templateCard += `
            <div class="col-lg-3 col-md-6 col-sm-12 my-2 m-3">
            <div class="card" id="card">
                <img src="${element.imagen}" class="card-img-top border" alt="...">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h3 class="card-text mb-3">${element.nombre}</h3>
                    <h4 class="card-title mb-3">$${element.precio}</h4>
                    <div class="d-flex flex-column h-100 justify-content-between">
                        <p>Descripcion: ${element.descripcion}</p>
                        <div class="d-flex justify-content-center">
                            <a href="#" class="btn carritoAgregar carritoEliminar" onclick="fnCarrito(${element.id})" id="btn-cards">Agregar al carrito</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `
                    contMedicine.innerHTML = templateCard
                }
            })
        } else {
            templateCard =`
            <div>      
                <div>
                    <img src="../assets/alerta.png" alt="mindy_toma_cafe">
                </div>
                <div>
                    <h5>ADVERTENCIA</h5>
                    <p>Búsqueda no encontrada</p>
                </div>
            </div>
            `
            
        }
        contMedicine.innerHTML = templateCard
    }

    displayCards(arrayMedicamento)



}

getData()


