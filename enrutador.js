const recursos = require('./recursos');
const mascotas = require('./rutas/mascotas')


module.exports = {
    ruta: (data,callback) => {
        callback(200,{mensaje:"OK"});
    },
    usuarios: (data,callback) =>{
        callback(200,[{nombre: 'usuario1'},{nombre:'usuario2'}]);
    },
    mascotas: mascotas(recursos.mascotas),
    noEncontrado: (data,callback) => {
        callback(405,{mensaje:"NO OK"});
    }
}
