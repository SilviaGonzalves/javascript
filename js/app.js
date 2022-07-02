

let productos =[
    {id: 1, nombre: "pintura 1", precio: 400, img: "multimedia/pintura1.jpg"},
    {id: 2, nombre: "pintura 2", precio: 400, img: "multimedia/pintura2.jpg"},
    {id: 3, nombre: "pintura 3", precio: 400, img: "multimedia/pintura3.jpg"},
    {id: 4, nombre: "pintura 4", precio: 400,img: "multimedia/pintura4.jpg"},
    {id: 5, nombre: "espejo 1", precio: 600, img: "multimedia/espejo1.jpg"},
    {id: 6, nombre: "espejo 2", precio: 600, img: "multimedia/espejo2.jpg"},
    {id: 7, nombre: "espejo 3", precio: 600, img: "multimedia/espejo3.jpg"},
    {id: 8, nombre: "espejo 4", precio: 600, img: "multimedia/espejo4.jpg"},
    {id: 9, nombre: "accesorio 1", precio: 1200, img: "multimedia/accesorio1.jpg"},
    {id: 10, nombre: "accesorio 2", precio: 1200, img: "multimedia/accesorio2.jpg"},
    {id: 11, nombre: "accesorio 3", precio: 1200, img: "multimedia/accesorio3.jpg"},
    {id: 12, nombre: "accesorio 4", precio: 1200, img: "multimedia/accesorio4.jpg"}
]


class Carrito {
    constructor (id, nombre, cantidad, valorCompra){
       this.id = id,
       this.nombre = nombre,
       this.cantidad = cantidad,
       this.valorCompra = valorCompra
    }
 }

let carrito =[]
let reciboCant = 0
let contArt = 0
let nada = 0
// selectores

const contenedorProductos = document.querySelector("#contenedor-productos")
const cant = document.querySelector("#cantidad")
const contadorCarrito = document.querySelector("#contadorCarrito")

//  decl. selectore modal carrito
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]
const carritoContenedor = document.querySelector('#carrito-contenedor')
const precioTotal = document.querySelector('#precioTotal')
const btnVaciar = document.getElementById('vaciarCarrito')
const confPedido = document.getElementById('confirmaPedido')


// decl. selectores modal de Error

const contenedorModalE = document.getElementsByClassName('modal-contenedorE')[0]
const modalCarritoE = document.getElementsByClassName('modal-carritoE')[0]
const botonCerrarE = document.getElementById('carritoCerrarE')
const carritoContenedorE = document.querySelector('#carrito-contenedorE')


// decl. selector formulario pedido y saludo final
const formPedido = document.querySelector('#form-pedido')
const formContenedor = document.getElementsByClassName('form-contenedor')[0]


// eventos
botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
contenedorModal.addEventListener('click', ()=>{
    botonCerrar.click()
})
modalCarrito.addEventListener('click', (event)=>{
    event.stopPropagation()
})
botonCerrarE.addEventListener('click', ()=>{
    contenedorModalE.classList.toggle('modal-active')
})

//  recupero de localstorage 


// const carritoEnLS = JSON.parse(localStorage.getItem("carrito")) || []
const carritoEnLS = localStorage.getItem("carrito")
const carritoJS = JSON.parse(carritoEnLS)

const nombreLS = localStorage.getItem("nombre")
const direccionLS = localStorage.getItem("direccion")

//  MOSTRAR PRODUCTOS 
//  CAPTURAR CANTIDADES 
//  CARGAR CARRITO

productos.forEach((producto) => {
    const div = document.createElement("div")
    div.classList.add("contImg")
    div.innerHTML=`
             <img src=${producto.img} alt="fondo" class="imagen" /> 
             <p class="letraPrecio">Precio producto $${producto.precio}</p>
             <div class="cantidad">
                 <p class="letraPrecio">Cantidad</p>
                 <input type="number" id="${producto.id}" class="campoNumerico" >
             </div>

    `
    contenedorProductos.append(div)

    let valor = document.getElementById(`${producto.id}`)

    valor.addEventListener("keypress" , (e)=>{

        if(e.key === "Enter"){
             if (e.target.id === `${producto.id}`){

                agregoProductos( `${producto.id}`, valor.value)

                 const limpiar = document.getElementById(producto.id)
                 limpiar.innerHTML = (document.getElementById(producto.id).value = "");


                
             }
        }
    })
 })
 


//  FUNCIONES
 

function agregoProductos(item, cantP){

    const indice = Number(item)
    if (parseInt(cantP) < 0){
       mostrarError(2)
    }
    if ((isNaN(parseInt(cantP))) || (parseInt(cantP) < 0)){
        mostrarError(2)
    }else{
    const registro = productos.find( el => el.id === indice)

    if (registro !== undefined){
        const veoSiExiste = carrito.find( ind => ind.id === registro.id)
        if (veoSiExiste){
                const cual = carrito.indexOf(veoSiExiste)
                if (cual === -1){
                   mostrarError(3)
                }else{
                    carrito.splice(cual,1)
                }
        } 
        // console.log(carrito)
        let valor = cantP * registro.precio 
        let cantN = Number(cantP)       
        carrito.push(new Carrito(indice, registro.nombre, cantN, valor))
     
        muestroToast(registro.nombre)
        muestroCarrito()
        suboLS()

    }else{
        mostrarError(1)
    }
    // console.log(carrito)
    contarArticulos()
    limpiarCarrito()
    cantArtCompra(contArt) 
}}

function muestroToast(producto){
    Toastify({
        text: `Has subido al carrito el producto: ${producto}`,
        gravity: "bottom",
        position: "left",
        duration: 4000,
        className: "info",
        style: {
          background: "linear-gradient(to right, #D48AD4, #B85898)",
        }
    }).showToast();
}



function mostrarError(codError){
 
contenedorModalE.classList.toggle('modal-active')


codError === 1?  carritoContenedorE.innerHTML=`Error: no se encontró el índice`: codError === 2?   carritoContenedorE.innerHTML=`Debe ingresar un numero > o igual a 0`: codError === 3?  carritoContenedorE.innerHTML=`Error en splice`: codError === 4?  carritoContenedorE.innerHTML=`Debe ingresar Nombre y Direccion` : nada = 0
}


function contarArticulos() {
    contArt = 0
    carrito.forEach((item) => {
        const convCant = Number(item.cantidad)
        contArt += convCant
        
    })
 
}
function limpiarCarrito(){
    let i = 0
    carrito.forEach((i) =>{
         if (i.cantidad === 0){
            const reg = carrito.indexOf(i)
            if (reg !== -1){
                carrito.splice(reg,1)
         }}
    })
}


const cantArtCompra = (contArt) => {
    contadorCarrito.innerText = contArt
}


function muestroCarrito  ()  {
        carritoContenedor.innerHTML = ''
        carrito.forEach(({id, nombre, cantidad, valorCompra}) => {
        if (cantidad !== 0){
            const div = document.createElement('div')
            div.classList.add('productoEnCarrito')
            div.innerHTML = `
                    <p>${nombre}</p>
                    <p>Cantidad: ${cantidad}</p>
                    <p>Precio: $${valorCompra}</p>
                    <button onclick="removerDelCarrito(${id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                    `
            carritoContenedor.append(div)
        }    
        })
        cuentoTotal()
       
}

function cuentoTotal(){
    let totalPedido = 0
        carrito.forEach(({valorCompra}) =>{
            totalPedido += valorCompra
        })
            precioTotal.innerText = totalPedido
}



const removerDelCarrito = (id) => {
    const item = carrito.find((producto) => producto.id === id)
    const itemP = productos.find((ele) => ele.id === id)

    item.cantidad -= 1
    item.valorCompra = item.cantidad * itemP.precio


    if (item.cantidad === 0) {
        const indice = carrito.indexOf(item)
        carrito.splice(indice, 1)
    }
    
    Toastify({
        text: `Se eliminó 1 unidad de ${item.nombre}`,
        position: 'right',
        gravity: 'bottom',
        duration: 5000,
        style: {
            background: "linear-gradient(to right, #D48AD4, #B85898)",
          }
    }).showToast()

    // localStorage.setItem('carrito', JSON.stringify(carrito))
    suboLS()
    muestroCarrito()
    contarArticulos()
    cantArtCompra(contArt)    
}



function vaciarCarrito () {

    Swal.fire({
        title: 'Realmente deseas vaciar el carrito?',
        text: "Acción irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, deseo vaciarlo!',
        cancelButtonText: 'Cancelar acción!'
      }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0
            contArt = 0
            contadorCarrito.innerText = contArt
            muestroCarrito()
            eliminoDeLS()
             contenedorModal.classList.toggle('modal-active')

          Swal.fire({
            title: 'Vaciado!',
            text: 'El carrito ha sido eliminado.',
            icon:'success',
            confirmButtonColor: "#B85898",
            iconColor: "#B85898"
        })
        }
      })


}
function confirmaPedido(){
    contenedorModal.classList.toggle('modal-active')
    formContenedor.classList.toggle('modal-active')
    modalCarrito.classList.toggle('modal-active')
    formPedido.innerHTML= ""
    
    const form = document.createElement("form")


    form.innerHTML=`
        <form class="row g-3" >
            <div class="col-12">
                <label for="inputNombre" class="form-label">Nombre</label>
                <input type="text" class="form-control my-2" id="inputNombre" placeholder="Ingrese su Nombre" >
            </div>
            <div class="col-12">
                <label for="inputDireccion" class="form-label">Direccion </label>
                <input type="text" class="form-control my-2" id="inputDireccion" placeholder="Ingrese su direccion">
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-success" id="btn-confirma" onclick="asentarConfirmacion()" >CONFIRMA SU PEDIDO</button>
            </div>
        </form>    
    `
    formPedido.append(form)

}


function asentarConfirmacion(){

    formContenedor.classList.toggle('modal-active')
    let nombre = document.querySelector('#inputNombre')
    const direccion = document.querySelector('#inputDireccion')
    const btnConfirma = document.querySelector('#btn-confirma')

    if (nombre.value !== "" && direccion.value !== "" ){
          fun();
          localStorage.setItem("nombre", nombre.value);
          localStorage.setItem("direccion", direccion.value);
          suboLS()
    }else{
          mostrarError(4)
    }

    // (nombre.value !== "" && direccion.value !== "" )? (fun()), ( localStorage.setItem("nombre", nombre.value)), (localStorage.setItem("direccion", direccion.value)), (suboLS()) :  mostrarError(4)


}
function fun(){
    Swal.fire({
        icon: 'success',
        title: 'Gracias por tu compra!!!',
        text: 'LLegarán los productos en el transcurso de las próximas 72 horas',
        iconColor: "#B85898",
        confirmButtonColor: "#B85898"
})
}
//  subo a localstorage
function suboLS(){
    const carritoJS = JSON.stringify(carrito)
    localStorage.setItem("carrito", carritoJS)

}

if (carritoJS){
    carrito = carritoJS
    muestroCarrito()
    contarArticulos()
    cantArtCompra(contArt) 
}else{
    carrito = []
}
function eliminoDeLS(){
    localStorage.clear(carrito)
}
