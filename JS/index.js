let nombreInput = document.getElementById("nombreInput");
let precioInput = document.getElementById("precioInput");
let categoriaInput = document.getElementById("categoriaInput");
let condicionInput = document.getElementById("condicionInput");
let busquedaInput = document.getElementById("busquedaInput");
let alertaNombre = document.getElementById("alertaNombre");
let alertaPrecio = document.getElementById("alertaPrecio");
let alertaCategoria = document.getElementById("alertaCategoria");
let alertaCondicion = document.getElementById("alertaCondicion");
let botonAgregar = document.getElementById("botonAgregar");
let botonLimpiar = document.getElementById("botonLimpiar");
let cuerpoTabla = document.getElementById("cuerpoTabla");
let indiceActual = 0;
let productos = [];

botonAgregar.addEventListener("click",_=>{
    if(nombreValido() && precioValido() && categoriaValida() && condicionValida()){
        if(botonAgregar.innerHTML === "Agregar"){
            let producto = {
                nombre: nombreInput.value,
                precio: precioInput.value,
                categoria: categoriaInput.value,
                condicion: condicionInput.value
            };
            productos.push(producto)
            localStorage.setItem("Productos",JSON.stringify(productos))
            mostrarProducto()
            limpiarFormulario()
            nombreInput.classList.remove("is-valid")
            precioInput.classList.remove("is-valid")
            categoriaInput.classList.remove("is-valid")
            condicionInput.classList.remove("is-valid")
        } else if(botonAgregar.innerHTML === "Actualizar"){
            actualizarProducto()
            limpiarFormulario()
            nombreInput.classList.remove("is-valid")
            precioInput.classList.remove("is-valid")
            categoriaInput.classList.remove("is-valid")
            condicionInput.classList.remove("is-valid")
        }
    }
})
function mostrarProducto(){
    let temp = "";
    let filaCondicion = "";
    for(let i=0;i<productos.length;i++){
        if(productos[i].condicion === "Excelente"){
            filaCondicion = `<td class="text-white bg-success">${productos[i].condicion}</td>`
        } else if(productos[i].condicion === "Bueno"){
            filaCondicion = `<td class="text-white bg-warning">${productos[i].condicion}</td>`
        } else if(productos[i].condicion === "Malo"){
            filaCondicion = `<td class="text-white bg-danger">${productos[i].condicion}</td>`
        }
        temp += `
        <tr>
            <td>${i + 1}</td>
            <td>${productos[i].nombre}</td>
            <td>${productos[i].precio}</td>
            <td>${productos[i].categoria}</td>
            ${filaCondicion}
            <td>
                <i onclick="obtenerInformacionProducto(${i})" title="Actualizar" class="fa-solid me-2 text-warning fa-pen"></i>
                <i onclick="eliminarProducto(${i})" title="Eliminar" class="fa-solid text-danger fa-trash"></i>
            </td>
        </tr>`
    }
    cuerpoTabla.innerHTML = temp
}
botonLimpiar.addEventListener("click",limpiarFormulario)
function limpiarFormulario(){
    nombreInput.value = ""
    precioInput.value = ""
    categoriaInput.value = ""
    condicionInput.value = ""
    nombreInput.classList.remove("is-valid")
    nombreInput.classList.remove("is-invalid")
    alertaNombre.classList.replace("d-block","d-none")
    precioInput.classList.remove("is-valid")
    precioInput.classList.remove("is-invalid")
    alertaPrecio.classList.replace("d-block","d-none")
    categoriaInput.classList.remove("is-valid")
    categoriaInput.classList.remove("is-invalid")
    alertaCategoria.classList.replace("d-block","d-none")    
    condicionInput.classList.remove("is-valid")
    condicionInput.classList.remove("is-invalid")
    alertaCondicion.classList.replace("d-block","d-none")
}
function obtenerInformacionProducto(indice){
    indiceActual = indice
    nombreInput.value = productos[indiceActual].nombre
    precioInput.value = productos[indiceActual].precio
    categoriaInput.value = productos[indiceActual].categoria
    condicionInput.value = productos[indiceActual].condicion
    botonAgregar.classList.replace("btn-success","btn-warning")
    botonAgregar.innerHTML = "Actualizar"
    nombreInput.classList.remove("is-invalid")
    alertaNombre.classList.replace("d-block","d-none")
    precioInput.classList.remove("is-invalid")
    alertaPrecio.classList.replace("d-block","d-none")
    categoriaInput.classList.remove("is-invalid")
    alertaCategoria.classList.replace("d-block","d-none")    
    condicionInput.classList.remove("is-invalid")
    alertaCondicion.classList.replace("d-block","d-none")
}
function actualizarProducto(){
    let producto = {
        nombre: nombreInput.value,
        precio: precioInput.value,
        categoria: categoriaInput.value,
        condicion: condicionInput.value
    };
    productos[indiceActual] = producto
    mostrarProducto()
    localStorage.setItem("Productos",JSON.stringify(productos))
    botonAgregar.classList.replace("btn-warning","btn-success")
    botonAgregar.innerHTML = "Agregar"
}
function eliminarProducto(indice){
    productos.splice(indice,1)
    mostrarProducto()
    localStorage.setItem("Productos",JSON.stringify(productos))
}
busquedaInput.addEventListener("keyup",_=>{
    let temp = "";
    let filaCondicion = "";
    for(let i=0;i<productos.length;i++){
        if(productos[i].nombre.toLowerCase().includes(busquedaInput.value.toLowerCase())){
            if(productos[i].condicion === "Excelente"){
                filaCondicion = `<td class="text-white bg-success">${productos[i].condicion}</td>`
            } else if(productos[i].condicion === "Bueno"){
                filaCondicion = `<td class="text-white bg-warning">${productos[i].condicion}</td>`
            } else if(productos[i].condicion === "Malo"){
                filaCondicion = `<td class="text-white bg-danger">${productos[i].condicion}</td>`
            }
            temp += `
            <tr>
                <td>${i + 1}</td>
                <td>${productos[i].nombre}</td>
                <td>${productos[i].precio}</td>
                <td>${productos[i].categoria}</td>
                ${filaCondicion}
                <td>
                    <i onclick="obtenerInformacionProducto(${i})" title="Actualizar" class="fa-solid me-2 text-warning fa-pen"></i>
                    <i onclick="eliminarProducto(${i})" title="Eliminar" class="fa-solid text-danger fa-trash"></i>
                </td>
            </tr>`
        }
    }
    cuerpoTabla.innerHTML = temp
})
nombreInput.addEventListener("keyup",nombreValido)
precioInput.addEventListener("keyup",precioValido)

function nombreValido(){
    let regex = /^[A-Z][a-zA-Z0-9 ]+$/
    if(regex.test(nombreInput.value)){
        nombreInput.classList.add("is-valid")
        nombreInput.classList.remove("is-invalid")
        alertaNombre.classList.replace("d-block","d-none")
        return true
    } else{
        nombreInput.classList.add("is-invalid")
        nombreInput.classList.remove("is-valid")
        alertaNombre.classList.replace("d-none","d-block")
        return false
    }
}
function precioValido(){
    let regex = /^[1-9][0-9]{2,}$/
    if(regex.test(precioInput.value)){
        precioInput.classList.add("is-valid")
        precioInput.classList.remove("is-invalid")
        alertaPrecio.classList.replace("d-block","d-none")
        return true
    } else{
        precioInput.classList.add("is-invalid")
        precioInput.classList.remove("is-valid")
        alertaPrecio.classList.replace("d-none","d-block")
        return false
    }
}
function categoriaValida(){
    if(categoriaInput.value === ""){
        categoriaInput.classList.add("is-invalid")
        categoriaInput.classList.remove("is-valid")
        alertaCategoria.classList.replace("d-none","d-block")
        return false
    } else{
        categoriaInput.classList.add("is-valid")
        categoriaInput.classList.remove("is-invalid")
        alertaCategoria.classList.replace("d-block","d-none")
        return true
    }
}
function condicionValida(){
    if(condicionInput.value === ""){
        condicionInput.classList.add("is-invalid")
        condicionInput.classList.remove("is-valid")
        alertaCondicion.classList.replace("d-none","d-block")
        return false
    } else{
        condicionInput.classList.add("is-valid")
        condicionInput.classList.remove("is-invalid")
        alertaCondicion.classList.replace("d-block","d-none")
        return true
    }
}

