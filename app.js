//  Luis, hay varios errores que tengo que corregir
//  pero me van a llevar tiempo y quiero cumplir con 
//  las entregas.
//  Faltan terminar la parte donde se pide que apruebe
//  el pedido y si contesta que si, sale el mensaje que 
//  en las próximas 72 horas lo va a estar recibiendo.
//  Errores detectados:
//  1- Solo ingresa al carrito cuando se presiona Enter
//     y no cuando se termina de poner una cantidad, el 
//     error es que si escribe en varios productos la
//     cantidad y no presiona Enter no lo sube al carrito.
//  2- Cuando se dan de baja algun producto del carrito y
//     es la última operación queda en el carrito con cantidad
//     = 0.
//  Voy a tratar de hacer que se coloque la cantidad y abajo
//  mostrar un carrito para que agregue y un tachito de basura
//  para limpiar ese producto porque no me gusta como se ve.
//  Gracias por tu ayuda


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
// selectores

const contenedorProductos = document.querySelector("#contenedor-productos")
const cant = document.querySelector("#cantidad")
const contadorCarrito = document.querySelector("#contadorCarrito")


const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const contenedorModalE = document.getElementsByClassName('modal-contenedorE')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonAgregarCarrito = document.getElementById('boton-agregar-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const botonCerrarE = document.getElementById('carritoCerrarE')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]
const modalCarritoE = document.getElementsByClassName('modal-carritoE')[0]
const carritoContenedor = document.querySelector('#carrito-contenedor')
const precioTotal = document.querySelector('#precioTotal')
const btnVaciar = document.getElementById('vaciarCarrito')


const carritoContenedorE = document.querySelector('#carrito-contenedorE')


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrarE.addEventListener('click', ()=>{
    contenedorModalE.classList.toggle('modal-active')
})
contenedorModal.addEventListener('click', ()=>{
    botonCerrar.click()
})
modalCarrito.addEventListener('click', (event)=>{
    event.stopPropagation()
})




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

             }
        }
      
    })
 })
 

 




//  FUNCIONES
 

function agregoProductos(item, cantP){

    const indice = Number(item)
    // console.log("indice "  + indice)
    // console.log("cantP " + cantP)
    if (isNaN(parseInt(cantP))){
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
    
        let valor = cantP * registro.precio 
        let cantN = Number(cantP)       
        carrito.push(new Carrito(indice, registro.nombre, cantN, valor))
        muestroCarrito()
    }else{
        mostrarError(1)
    }
    // console.log(carrito)
    contarArticulos()
    limpiarCarrito()
    cantArtCompra(contArt) 
}}

function mostrarError(codError){
 contenedorModalE.classList.toggle('modal-active')
    if (codError === 1){
        carritoContenedorE.innerHTML=`Error: nose encontró el índice`
    
}else{
    if (codError === 2){
        carritoContenedorE.innerHTML=`Debe ingresar un numero`
       
    }else{
        if (codError === 3){
            carritoContenedorE.innerHTML=`Error en splice`
        }
    }
}}

function contarArticulos() {
    contArt = 0
    carrito.forEach((item) => {
        const convCant = Number(item.cantidad)
        contArt += convCant
    })
    // console.log("despues contArt " + contArt)

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

    carrito.forEach((item) => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')
    // console.log(carrito)
        div.innerHTML = `
                    <p>${item.nombre}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Precio: $${item.valorCompra}</p>
                    `
        
        carritoContenedor.append(div)
    })
    let totalPedido = 0
    carrito.forEach((item) =>{
        totalPedido += item.valorCompra
 
    })
        precioTotal.innerText = totalPedido
}
function vaciarCarrito () {

 carrito.length = 0
 contArt = 0
 contadorCarrito.innerText = contArt
 muestroCarrito()
}

