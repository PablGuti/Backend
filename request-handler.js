const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const enrutador = require('./enrutador');


module.exports = (req, res) => {
    const urlActual = req.url;
    const urlParseada = url.parse(req.url, true);
    const ruta = urlParseada.pathname;
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, "");
    const metodo = req.method.toLowerCase();    
    //console.log("url: ",urlP);
    const Query2 = urlParseada.query;
    const { query = {} } = urlParseada;
    const { headers ={} } = req;
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();

        if (headers["content-type"] === 'application/json') {
            buffer = JSON.parse(buffer);
        }

        if (rutaLimpia.indexOf("/") >= -1) {
            var [rutaPrincipal, indice] = rutaLimpia.split("/");
        }

        const data = {
            indice,
            ruta: rutaPrincipal || rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer
        };

        //console.log("data.ruta: ", data.ruta)
        //console.log("enrutador[data.ruta]: ", enrutador[data.ruta])
        //console.log("[metodo]: ", enrutador[data.ruta][metodo])
        //console.log("enrutador[data.rutaLimpia][metodo]: ",enrutador[data.rutaLimpia][metodo])
        //console.log("enrutador[data][metodo]: ",enrutador[data][metodo])
        //console.log("enrutador[metodo]: ",enrutador[metodo])
        //console.log("metodo: ", metodo)
        
        let handler;
        if (data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]) {
            handler = enrutador[data.ruta][metodo];
        } else {
            handler = enrutador.noEncontrado;
        }
        console.log("handler",handler);
        if (typeof handler === 'function') {
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(statusCode);
                res.end(respuesta);//linea donde se envia la respuesta
            })
        }
    });
};