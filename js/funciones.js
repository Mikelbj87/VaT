var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var speechRecognitionList = new SpeechGrammarList();

let palabrasTexto = []
grammar = '#JSGF V1.0; grammar palabrasTexto; public <palabrasTexto> = ' + palabrasTexto.join(' | ') + ' ;'

//en variable reconocimiento declaramos un objeto de reconocimiento de voz
let reconocimiento = new webkitSpeechRecognition();
//en la variable idiomaSeleccionado introducimos el string es-ES (en español y mayusculas-minusculas)
let idiomaSeleccionado = "es-ES";
//se lo pasamos a la propiedad lang de reconocimiento que controla el lenguaje
reconocimiento.lang = idiomaSeleccionado
//propiedad continous e interimResults booleanas de reconocimiento las dos a true
reconocimiento.continuous = true;
reconocimiento.interimResults = true;
//Con el metodo start solicitamos al navegador permiso para acceder al microfono
reconocimiento.start();

//Evento para capturar el sonido
reconocimiento.onresult = (event) => {
    
    const resultados = event.results;

    console.log(resultados)
    const frase = resultados[resultados.length - 1][0].transcript;

    if (frase == "reiniciar") { borrar(); frase = ""; }

    cajatexto.innerText = frase;
}

//evento de cuando pulsamos el boton reiniciar, al pulsarlo el texto que pueda haber en la caja texto se borra, 
//mediante una funcion flecha
document.getElementById("Reiniciar").addEventListener("click", () => {
    //borramos el texto de la cajatexto mediante innerText
    cajatexto.innerText = "";
    //Con el metodo start solicitamos al navegador permiso para acceder al microfono
    reconocimiento.start();
}
    , false)

//funcion borrrar, para borrar la cajatexto
function borrar() {
    //borramos la caja de texto mediante un innerText
    cajatexto.innerText = "";
}

//evento reproducir, en el que unicamente llamamos a la funcion leerTexto
document.getElementById("Reproducir").addEventListener("click"
    , leerTexto, false)

//evento para cuando pulsamos el boton parar, se debe parar la reproduccion del texto
document.getElementById("Parar").addEventListener("click"
    , () => {
        //mediante el metodo abort del objeto webkitSpeechRecognition se para la reproduccion
        reconocimiento.abort();
    }, false)

    //funcion leerTexto, para que el sistema nos lea el texto que previamente le hemos dictado
    function leerTexto() {
        //en la constante speech guardamos la interfaz del objeto SpeechSynthesisUtterance que es un servicio de voz
        const speech = new SpeechSynthesisUtterance();
        //guardamos el contenido del texto en la variable texto
        let texto= cajatexto.innerText;
        //le decimos a SpeechSynthesisUtterance que el lenguaje es español mediante .lang
        speech.lang = idiomaSeleccionado
        //le decimos a SpeechSynthesisUtterance que el texto que tiene que leer esta en la variable texto
        speech.text = texto;
        //configuramos parametros para el volumen y la velocidad
        speech.volumen = 1
        speech.rate = 1
        speech.pitch = 1
        //mediante el metodowindow.speechSynthesis.speak(speech) que es el que lee en el navegador le damos speech
        //que es la variable a la que hemos dado parametros de habla
        window.speechSynthesis.speak(speech)

    }
