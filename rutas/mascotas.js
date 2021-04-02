 
module.exports = function mascotasHandler(mascotas){
    return {
            get: (data,callback) =>{
            if(typeof data.indice !== "undefined"){
                if(mascotas[data.indice]){
                    return callback(209,mascotas[data.indice]);
                }else{
                    return callback(401,mascotas.filter(mascota => mascota.raza === "perro"));
                }
                return callback(401,{mensaje: "No encontrado"});
            }
            callback(205,mascotas);
            },
            post: (data,callback) =>{
                mascotas.push(data.payload);
                callback(201,mascotas);
            },
    }
}

