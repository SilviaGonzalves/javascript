//  Luis, cuento hasta donde llegué:
//  Puedo subir al carrito, borrar, y mostrar el resultado
//  final, limpiando los input.
//  Puedo mostrar un formulario para que ingrese el nombre
//  y dirección,pero de ahi en adelante no logro mostrar el 
//  mensaje de error si no ingresan alguno de los input, creo
//  que debe ser el tema de la visibility que no manejo muy
//  bien y otra cosa que no me sale es el saludo final que 
//  intento hacerlo con un modal como los otros pero no lo 
//  puedo mostrar.
//  Tampoco pude mostrar un modal con un saludo final,traté de
//  hacerlo con sweetalert como mostró Enzo en el after pero se
//  va rápido y no lo deja hasta que se apriete el ok, para cerrar.
//
//  Te mando hasta acá por el límite de tiempo del desafío, pero
//  esta verde todavía para que quede bien, quisiera haber
//  entregado todo bien, pero cada cosa la tengo que probar y
//  cuesta un poco.
//  Muchas gracias por todo.
//


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
                limpiar.innerHTML = (document.getElementById(producto.id).value = " ");
                // limpiar.innerHTML = (limpiar.value = " ");
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
        // console.log(carrito)
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
        carritoContenedorE.innerHTML=`Error: no se encontró el índice`
    
}else{
    if (codError === 2){
        carritoContenedorE.innerHTML=`Debe ingresar un numero`
       
    }else{
        if (codError === 3){
            carritoContenedorE.innerHTML=`Error en splice`
        }else{
            if (codError === 4){
                carritoContenedorE.innerHTML=`Debe ingresar Nombre y/o Direccion`
            }
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
        if (item.cantidad !== 0){

            const div = document.createElement('div')
            div.classList.add('productoEnCarrito')

            div.innerHTML = `
                    <p>${item.nombre}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Precio: $${item.valorCompra}</p>
                    `
        
            carritoContenedor.append(div)
        }    
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
                <input type="text" class="form-control my-2" id="inputNombre" placeholder="Ingrese su Nombre">
            </div>
            <div class="col-12">
                <label for="inputDireccion" class="form-label">Direccion </label>
                <input type="text" class="form-control my-2" id="inputDireccion" placeholder="Ingrese su direccion">
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-success" id="btn-confirma" onclick="asentarConfirmacion()">CONFIRMA SU PEDIDO</button>
            </div>
        </form>    
    `
    formPedido.append(form)
  
   
}

function asentarConfirmacion(){
    const nombre = document.querySelector('#inputNombre')
    const direccion = document.querySelector('#inputDireccion')
    const btnConfirma = document.querySelector('#btn-confirma')
    formPedido.addEventListener('click', (event)=>{
        event.stopPropagation()
    })
    btnConfirma.addEventListener('click', (e)=>{
        e.preventDefault();
    })
    
    btnConfirma.addEventListener('click', ()=>{
        formContenedor.classList.toggle('modal-active')
    })
    
        if ((nombre.value !== "") && (direccion.value !== "")){


   Swal.fire("Gracias por tu compra!" ," En el transurso de las próximas 72 hs, llega a tu domicilio" )       
 
        }else{

            mostrarError(4)
        }

}
