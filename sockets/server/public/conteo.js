var mensajes = document.getElementById('messages').innerHTML;

console.log(mensajes);
var palabra;
var numero;
var mayus;
var consonante;

var expresionvocal = /[a|e|i|o|u]/gi

//var busquedavocal = mensajes.match(expresionvocal);

document.getElementById('vocales').innerHTML = document.getElementById('messages');