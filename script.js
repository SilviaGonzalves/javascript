
 
//  hecho todo en javascript sin interactuar con html
//  el proyecto final será e-commerce para un negocio de venta de
//  productos de manicuría para esculpir uñas
//  armé la estructura de 2 array (productos y carrito)
//  completé el array de productos
//  utilicé la misma lógica del desafío complementario con los 3 posibles valores:
//   1   para agregar elementos al carrito
//   2   para eliminar elementos del carrito (elimina todos)
//   3   para terminar el ciclo
//  cuando se termina de cargar el carrito, muestro el total de la compra
//  y pregunto si confirma la compra, pido los datos para el envío y termino
//  el programa.
let carrito = []
class Productos {
     constructor (id, nombre, precio){
        this.id = id,
        this.nombre = nombre,
        this.precio = precio 

     }
}

const productos = [
   new Productos(1, "pintura 1", 400),
   new Productos(2, "pintura 2", 400),
   new Productos(3, "pintura 3", 400),
   new Productos(4, "pintura 4", 400),
   new Productos(5, "espejo 1", 600),
   new Productos(6, "espejo 2", 600),
   new Productos(7, "espejo 3", 600),
   new Productos(8, "espejo 3", 600),
   new Productos(9, "accesorio 1", 1300),
   new Productos(10, "accesorio 2", 1300),
   new Productos(11, "accesorio 3", 1300),
   new Productos(12, "accesorio 4", 1300),
]

class Carrito {
   constructor (id, cantidad, valorCompra){
      this.id = id,
      this.cantidad = cantidad,
      this.valorCompra = valorCompra
   }
}

console.log("Antes de empezar ")
console.log(productos)
let ver = 0
let cual = 0
for (;ver !== 3;){
   ver = Number(prompt(`Desea agregar productos al carrito, ingrese 1
   Desea eliminar Productos del carrito, ingrese 2
   Desea terminar ingrese 3`))
      if (ver === 1){
         agregoProductos()
                    }
      else if (ver === 2){
               eliminoProductos()
                         }
            else if (ver === 3){
                     muestroTotal()
                     if (confirma === "si"){
                         pedirDatosEntrega()
                         console.log("Fin del programa")
                                           }                    
                     else{
                          console.log("Fin del programa")
                          }
                                }                         
                  else {console.log("Ingrese un código correcto")
                       }
                    }

console.log("Al terminar ")
console.log(productos)
console.log(carrito)


// Funciones

function agregoProductos(){
         cual = Number(prompt("Ingrese el id del producto seleccionado : "))
         const registro = productos.find( el => el.id === cual)
         if (registro !== undefined){
            let cantidad = Number(prompt("Ingrese la cantidad : "))
            const veoSiExiste = carrito.find( item => item.id === cual)
            if (veoSiExiste){
               veoSiExiste.cantidad += cantidad
               veoSiExiste.valorCompra = veoSiExiste.valorCompra + (cantidad * registro.precio)
            }else{
               let valor = cantidad * registro.precio  
               carrito.push(new Carrito(registro.id, cantidad, valor))
            }
            
         }else{
            console.log("Ingresó un id incorrecto")
         }
      }                     

function eliminoProductos(){
         console.log(carrito)
         cual = Number(prompt("Ingrese el id del producto a eliminar : "))
         const registro = carrito.find( el => el.id === cual)

         const item = carrito.indexOf(registro)
         if (item !== -1){
               carrito.splice(item,1)
               
         }else{
               console.log("Ingrese un id correcto")
         }
}
function muestroTotal(){
   const total = carrito.reduce((ac, item) => ac + item.valorCompra , 0)
   console.log("El total de su compra es : " + " " + total)

   conf = prompt(`Confirma la compra? 
   Ingrese si o no`)
   confirma = conf.toLowerCase()
  
}
function pedirDatosEntrega(){
   let nombrePersoa = prompt("Ingrese su nombre : ") 
   let direccion = prompt("Ingrese dirección de envío : ")
   console.log("Su pedido llegará en las próximas 72 horas a : " +
   " " + direccion)
}