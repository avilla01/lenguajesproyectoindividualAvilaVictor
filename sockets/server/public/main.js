var socket = io.connect('192.168.14.5:8081', { 'forceNew': true });

socket.on('messages', function(data) {
    console.log(data);
    render(data);

    //vocales listo
    expresionvocal = /[aeiou|áéíóú]/ig;
    //mayuscula
    expresionmayuscula = /(\b[A-Z|ÁÉÍÓÚ])[a-z|áéíóú|A-Z|ÁÉÍÓÚ]*/g;
    //numero(listo)
    expresionnumeros = /[\d]/g;

    //cosonate
    expresionconso = /[a-záéíúóA-ZÁÉÍÓÚ]+([^aeiouáéíóú\? ])\b/g;
})

function render(data) {
    var html = data.map(function(elem, index) {
        return (`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
                <hr>
                <div>Vocales: <a>${elem.numvocal}</a></div>
                <div>Palabras: <a>${elem.numpal}</a></div>
                <div>Palabras que inician con mayúscula: <a>${elem.nummayus}</a></div>
                <div>Números: <a>${elem.numnum}</a></div>
                <div>Palabras que finalizan con letras que nos son vocal: <a>${elem.consonante}</a></div>
            </div>`);
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {

    var mensaje = document.getElementById('texto').value; //se toma lo que haya escrito el usuario

    //Sección para comparar números
    var pruebanumeros = mensaje.match(expresionnumeros); //Se almacenan
    try {
        pruebanumeros = pruebanumeros.length; //El tamaño de la lista es la cantidad de númeross encontrados
    } catch (error) {
        console.log("El mensaje no tiene ningún número. Colocando el valor de cero"); //En caso de que no se encuentre ningún número, el tamaño de la lista será nulo. Para evitar errores, se asignará el valor de cero
        pruebanumeros = 0;
    }

    //Sección para comparar vocales
    var pruebavocales = mensaje.match(expresionvocal); //Se almacenan
    try {
        pruebavocales = pruebavocales.length; //El tamaño de la lista es la cantidad de vocales encontradas
    } catch (error) {
        console.log("El mensaje no contiene ninguna vocal. Colocando el valor de cero"); //En caso de que no se encuentre ninguna vocal, el tamaño de la lista será nulo. Para evitar errores, se asignará el valor de cero
        pruebavocales = 0;
    }
    texto = mensaje;
    //Sección para contar Palabras
    if (texto != "") {

        //Reemplazamos los saltos de linea por espacios
        texto = texto.replace(/\r?\n/g, " ");
        //Reemplazamos los espacios seguidos por uno solo
        texto = texto.replace(/[ ]+/g, " ");
        //Quitamos los espacios del principio y del final
        texto = texto.replace(/^ /, "");
        texto = texto.replace(/ $/, "");
        //Troceamos el texto por los espacios
        var textoTroceado = texto.split(" ");
        //Contamos todos los trozos de cadenas que existen

    }
    var pruebapalabra;

    try {
        pruebapalabra = textoTroceado.length;
    } catch (error) {
        console.log("El mensaje nom contiene ninguna palabra. Para evitar errores, se asignará el valor de cero");
        pruebapalabra = 0;
    }

    //Sección para contar las palabras que empiezan con mayúscula
    //Aprovechando que ya tenemos el mensaje troceado por palabras, analizaremos cada palabra de esa lista
    var pruebamayus = mensaje.match(expresionmayuscula);

  


    try {
        pruebamayus = pruebamayus.length;

    } catch (error) {
        console.log("El mensaje no contiene ninguna Palabra que comience con mayúscula. Colocando el valor de cero"); //En caso de no encontrarse ninguna palabra que empiece cn mayúscula, el tamaño de la lista será nulo. Para evitar errores, se asignará el valor de cero
        pruebamayus = 0;
    }

    //sección para final de palabra
    var pruebaconsonante = mensaje.match(expresionconso);


    try {
        pruebaconsonante = pruebaconsonante.length;

    } catch (error) {
        console.log("El mensaje no contiene ninguna Palabra que comience con mayúscula. Colocando el valor de cero"); //En caso de no encontrarse ninguna palabra que empiece cn mayúscula, el tamaño de la lista será nulo. Para evitar errores, se asignará el valor de cero
        pruebaconsonante = 0;
    }

    var message = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
        numvocal: pruebavocales,
        numpal: pruebapalabra,
        nummayus: pruebamayus,
        numnum: pruebanumeros,
        consonante: pruebaconsonante

    };

    socket.emit('new-message', message);
    return false;
}