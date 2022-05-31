
// Objetivo: 
// 1- pide un código de producto
// 2- verifica que esté entre 1 y 4, si es otro código distinto de 9,muestra error
// 3- pide que se ingrese la cantidad del producto
// 4- se va acumulando hasta que ingresa 9 para terminar
// 5- se muestra el total y las distintas formas de pago.



let producto = 0,
    cantidad = 0,
    total = 0,
    ctdo = 0,
    tC = 0,
    sC = 0

let precios= [100,150,200,250]


producto = Number (prompt(`Para seleccionar el producto 1, ingrese : 1
Para seleccionar el producto 2, ingrese : 2
Para seleccionar el producto 3, ingrese : 3
Para seleccionar el producto 4, ingrese : 4
Para terminar,ingrese : 9 `))

for (;producto !== 9;){
     if (producto >= 1 && producto <= 4){
        cantidad = Number(prompt("Ingrese la cantidad desea del producto"))
        total = total + (precios[producto - 1] * cantidad)
     }else{
         console.log("Ingrese un producto válido")
         
     }
     producto = Number (prompt(` Para seleccionar el producto 1, ingrese : 1
     Para seleccionar el producto 2, ingrese : 2
     Para seleccionar el producto 3, ingrese : 3
     Para seleccionar el producto 4, ingrese : 4
     Para terminar,ingrese : 9 `))
} 
if (total !== 0){  
   alert("El total acumulado es : " + total)
   ctdo = contado()
   tC = tresCuotas()
   sC = seisCuotas()

   alert(`Seleccione su forma de pago :
         Contado     (10%dto): ${ctdo}  
         En 3 cuotas (s/int.): ${tC}
         En 6 cuotas (+  20%): ${sC}`)
   console.log("Fin del programa")
}else{
   console.log("Fin del programa")
} 



function contado(){
   return (total - (total * 0.10))
}
function tresCuotas(){
   return total / 3
}
function seisCuotas(){
   return (total * 1.20) / 6
}

