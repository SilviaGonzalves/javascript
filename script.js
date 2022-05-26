

//------------- primer ejemplo------------------------------------------------

let nro = 0
let suma = 0

for (i = 1; i <= 7; i++){
     nro = Number(prompt("Ingrese un numero : "))
     suma = suma + nro
     console.log("El numero ingresado es : " + nro + "  El acumulado es : " + suma)
}



//------------segundo ejemplo para desafio falta ingresar ESC
   
let nombre  
let nombre1 = "Los nombres son : "
  
while (nombre !== "ESC"){
       nombre = prompt("Ingrese un nombre : ")
       if (nombre === "ESC"){
           break
      }else {
           nombre1 = nombre1 + nombre
           nombre1 = nombre1 + " "
           console.log(nombre1) 
       }
}


//------------- tercer ejemplo ------------------------------------
     
let veces = Number(prompt("Ingrese la cantidad de veces a repetir"))
    console.log(veces)
let k = 0
while (k < veces){
     console.log("Hola");
     console.log(" ");
     k = k + 1;
}

