
const constPromesa = (indice) => new Promise( (resolve,reject) => {
    const tiempoRech = Math.floor(Math.random() * 100) +100;
    const tiempoReso = Math.floor(Math.random() * 100) +100;
    console.log("tiempo rechazo",tiempoRech);
    console.log("tiempo resolucion",tiempoReso);

    setTimeout(() => {
        reject(`No se resolvio ${indice}`);
    }, tiempoRech);

    setTimeout(() => {
        resolve(`Se resolvio ${indice}`); 
    }, tiempoReso);
});
let misPromesas = [];
for(let i = 0; i<10 ; i++){
    misPromesas = [...misPromesas,constPromesa(i)];
}

misPromesas.forEach((promesaActual)=>
promesaActual
    .then((respuesta)=>console.log(respuesta))
    .catch((razon)=>console.log(razon))
    );

//miPromesa.then( respuesta => console.log(respuesta),(razon)=>console.log(razon));

/*
const miBoton = document.getElementById("miboton");

const ac = (evento) => {
    console.log(evento);
    alert("Diste click");   
};

miBoton.addEventListener("click",ac);

//console.log(miBoton);
*/
/*
const mostrar = () => {
    console.log('Termino ejecucion');
};
*/

/*
const funcionCallBack = () => {
    console.log('Funcion call');
};


const mostrar = () => {
    setTimeout(funcionCallBack,10000);
};

mostrar();
console.log('Termino ejecucion');
*/