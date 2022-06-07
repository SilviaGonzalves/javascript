
// Primer desafío


                           // Objetivo: 
                           // 1- pide un código de producto
                           // 2- verifica que esté entre 1 y 4, si es otro código distinto de 9,muestra error
                           // 3- pide que se ingrese la cantidad del producto
                           // 4- se va acumulando hasta que ingresa 9 para terminar
                           // 5- se muestra el total y las distintas formas de pago.



                           // let producto = 0,
                           //     cantidad = 0,
                           //     total = 0,
                           //     ctdo = 0,
                           //     tC = 0,
                           //     sC = 0

                           // let precios= [100,150,200,250]


                           // producto = Number (prompt(`Para seleccionar el producto 1, ingrese : 1
                           // Para seleccionar el producto 2, ingrese : 2
                           // Para seleccionar el producto 3, ingrese : 3
                           // Para seleccionar el producto 4, ingrese : 4
                           // Para terminar,ingrese : 9 `))

                           // for (;producto !== 9;){
                           //      if (producto >= 1 && producto <= 4){
                           //         cantidad = Number(prompt("Ingrese la cantidad desea del producto"))
                           //         total = total + (precios[producto - 1] * cantidad)
                           //      }else{
                           //          console.log("Ingrese un producto válido")
                                    
                           //      }
                           //      producto = Number (prompt(` Para seleccionar el producto 1, ingrese : 1
                           //      Para seleccionar el producto 2, ingrese : 2
                           //      Para seleccionar el producto 3, ingrese : 3
                           //      Para seleccionar el producto 4, ingrese : 4
                           //      Para terminar,ingrese : 9 `))
                           // } 
                           // if (total !== 0){  
                           //    alert("El total acumulado es : " + total)
                           //    ctdo = contado()
                           //    tC = tresCuotas()
                           //    sC = seisCuotas()

                           //    alert(`Seleccione su forma de pago :
                           //          Contado     (10%dto): ${ctdo}  
                           //          En 3 cuotas (s/int.): ${tC}
                           //          En 6 cuotas (+  20%): ${sC}`)
                           //    console.log("Fin del programa")
                           // }else{
                           //    console.log("Fin del programa")
                           // } 



                           // function contado(){
                           //    return (total - (total * 0.10))
                           // }
                           // function tresCuotas(){
                           //    return total / 3
                           // }
                           // function seisCuotas(){
                           //    return (total * 1.20) / 6
                           // }

// segundo desafío complementario
// genero una clase con constructor de productos
// y genero un array de productos creando objetos
// realizo un ciclo donde se pueden ingresar 3 posibles valores:
//   1   para agregar elementos al array
//   2   para eliminar elementos del array
//   3   para terminar el ciclo


class Productos {
     constructor (id, nombre, precio){
        this.id = id,
        this.nombre = nombre,
        this.precio = precio 

     }
}

const productos = [
   new Productos(1, "pintura 1", 100),
   new Productos(2, "pintura 2", 200),
   new Productos(3, "pintura 3", 300),
   new Productos(4, "pintura 4", 350),
   new Productos(5, "pintura 5", 400),
   new Productos(6, "pintura 6", 450)
]

console.log("Antes de empezar ")
console.log(productos)
let ver = 0
let cual = 0
for (;ver !== 3;){
   ver = Number(prompt(`Desea agregar productos, ingrese 1
   Desea eliminar Productos, ingrese 2
   Desea terminar ingrese 3`))
      if (ver === 1){
         agregoProductos()
      }else if (ver === 2){
               eliminoProductos()
      }else if (ver === 3){
            console.log("Fin del programa")
      }else {console.log("Ingrese un código correcto")
      }
}

console.log("Al terminar ")
console.log(productos)



// Funciones

function agregoProductos(){

         let id = Number(prompt("Ingrese id del producto : "))
         let nombre = prompt("Ingrese nombre del producto : ")
         let precio = Number(prompt("Ingrese precio del producto : "))
         productos.push(new Productos(id, nombre, precio))      
                       
}
function eliminoProductos(){
         console.log(productos)
         cual = Number(prompt("Ingrese el id del producto a eliminar : "))
         const registro = productos.find( item => item.id === cual)
         const item = productos.indexOf(registro)
         if (item !== -1){
               productos.splice(item,1)
               
         }else{
               console.log("Ingrese un id correcto")
         }
}
