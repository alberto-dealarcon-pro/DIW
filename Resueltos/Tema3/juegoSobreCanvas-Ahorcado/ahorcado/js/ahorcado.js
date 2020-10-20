var game = (function () {

    // Variables globales relacionadas con los elementos html e imágenes a cargar
    var canvas,
        ctx,
        imgFondo, // Imagen del background del juego
        imgNudo, // Imagen del nudo alrededor del cuello del personaje
        imgCargadas = 0; // Control de la cantidad de imágenes cargadas

    // Variables relacionadas con la lógica de computación del juego
    var palabras = ["aburrido", "ácido", "alegre", "alto", "amargo", "ancho", "atrevido", "azul", "bajo", "blanco", "blando", "bonito", "buen", "caliente", "capaz", "central", "chungo", "común", "conocido", "contento", "corto", "débil", "delgado", "derecho", "diferente", "difícil", "dulce", "duro", "enfermo", "estrecho", "exterior", "fácil", "falso", "famoso", "feo", "final", "fresco", "frío", "fuerte", "gordo", "grande", "guay", "guapo", "húmedo", "igual", "imposible", "interesante", "interior", "inútil", "izquierdo", "joven", "largo", "lento", "listo", "malo", "masivo", "mayor", "mejor", "menor", "mucho", "muerto", "musical", "nacional", "natural", "negro", "nuevo", "peor", "pequeño", "perfecto", "pobre", "poco", "popular", "posible", "primero", "principal", "próximo", "rápido", "raro", "real", "recto", "rico", "rojo", "salado", "sano", "seco", "segundo", "simple", "sinvergüenza", "social", "solo", "soso", "tímido", "tonto", "triste", "útil", "verdadero", "verde", "viejo", "vivo", "crema", "explosión", "navaja", "universidad", "llaves", "papá", "catre", "escuela", "codo", "mapa", "lima", "edificio", "hojas", "granizo", "mano", "música", "habitación", "abuelo", "templo", "plato", "botella", "casa", "planeta", "metal", "mono", "petróleo", "debate", "ruído", "herramienta", "anteojos", "zapato", "ojo", "ciente", "diente", "buzo", "puerta", "ensalada", "candidato", "diario", "hierro", "barco", "tecla", "departamento", "hipopótamo", "árbol", "discurso", "rúcula", "lentejas", "reloj", "desodorante", "montañas", "moño", "partido", "fiesta", "café", "guitarra", "martillo", "lapicera", "letra", "librería", "rueda", "camisa", "sillón", "teclado", "pantalla", "tenedor", "pantalla", "tenedor", "agua", "cohete", "césped", "parlante", "pestaña", "monitor", "hombre", "velero", "palo", "lentes", "nube", "castillo", "libro", "televisor", "teléfono", "percha", "anillo", "pared", "cartas", "impresora", "luces", "bomba", "bolígrafo", "gobierno", "enano", "persona", "guantes", "proyector", "muela", "remate", "cuaderno", "taladro", "chocolate", "caramelos", "angustia", "lluvia", "corbata", "periódico", "planta", "chupete", "oficina", "persiana", "silla", "pradera", "zoológico", "deporte", "recipiente", "fotografía", "ave", "refugio", "pantalón", "carne", "nieve", "humedad", "pistola", "tristeza", "sofá", "cama", "campera", "coche", "cinturón", "famoso", "madera", "piso", "maletín", "diputado", "cuchillo", "candado", "luz", "ordenador", "radio", "cuadro", "calor", "teatro", "bala", "auriculares", "plástico", "libro", "aluminio", "agujeta", "sonido", "perro", "pelo", "felicidad", "servilleta", "sol", "estadística", "mensaje", "rey", "presidencia", "colegio", "lámpara", "flor", "tornillo", "abuela", "satélite"];
    var coincidencias = [], // Array que inicializa en caracteres '_' y poco a poco forma la palabra
        fallosMaximos = 6,
        contFallos = 0,
        fallos = [], // Array que acumulará los errores producidos por el usuario
        palabraAzar, // Contiene la palabra generada al azar por el juego
        palabraUsu, // "Tirada" que realiza el usuario, puede ser un caracter o una palabra
        finJuego = false, // boolean que se activará cuando el juego acabe, por adivinar la palabra secreta o por acumular demasiados fallos
        palabraAdivinada = false; // boolean que se activará cuando el usuario adivine la palabra, probando por palabra completa o por caracteres

    var ANCHO_CARACTER_SECRETO = 40,  // Por cada carácter "no descubierto" se muestra un rectángulo. Esta var es el ancho del rectángulo
        SEPARACION_CARACTERES_SECRETOS = 10, // Separación entre los rectángulos de cada carácter no descubierto
        COLOR_PERSONAJE_NORMAL = "#7cff9b", 
        COLOR_PERSONAJE_FALLO = "#ff671c",
	    // Con la siguiente variable sería fácil cambiar la posición horizontal del personaje
	    offsetHorizontalPersonaje = 100, // Desplazamiento horizontal del personaje y los elementos de la escena
	    offsetVerticalPersonaje = 100; // Desplazamiento vertical del personaje
    


    /**
     * Función de inicialización del juego. Esta es la función principal, la que se llama desde el código html.
     * Se encarga de inicializar las variables globales necesarias para el juego
     */
    function init() {
        // Lo primero es comenzar a cargar las imágenes
        preloadImages();

        // Obtención del elemento html con id = "canvas". Puedes mirar el código html para entender mejor esto
        canvas = document.getElementById('canvas');
        // Necesitamos el contexto del canvas, para poderlo utilizar como "brocha", gracias a este elemento podremos
        // asignar colores y pintar primitivas, imágenes, textos, etc.
        ctx = canvas.getContext("2d");

        // Inicialización de la palabra al azar, se obtiene un número al azar para determinar una palabra del array de palabras posibles
        var indiceAzar = getNumeroAleatorio(palabras.length);
        palabraAzar = palabras[indiceAzar];
        // Si no comentas la siguiente línea podrás hacer trampa y conocer la palabra elegida por el ordenador
        // alert("palabra: " + palabraAzar);
        // El array de "coincidencias" tendrá tantos elementos como letras tenga la palabra al azar. Todos los elementos se inicializarán
        // al carácter '_', que indicará que esa letra aún no se ha descubierto en la palabra secreta
        coincidencias = new Array (palabraAzar.length);
        for (var i = 0; i < coincidencias.length; i++) {
            coincidencias[i] = '_';
        }
        // Inicializao un array con todos los fallos posibles a cometer por parte del usuario.
        fallos = new Array(fallosMaximos);
    }




    /**
     * A través de este método conseguiremos precargar las imágenes. Este proceso en JS no es síncrono, por tanto necesitamos implementar
     * una especie de disparador. Cada vez que una imagen se carge (lo controlaremos por la ejecución de la función "addEventListener")
     * se aumentará en 1 la cantidad de imágenes cargadas y se llamará a la función que pinta la escena.
     */
    function preloadImages() {
        // Carga de la imagen del fondo del juego
        imgFondo = new Image();
        imgFondo.src = 'images/farwestbackground.jpg';
        imgFondo.addEventListener('load', function() {
            // Este trozo de código se ejecutará de manera asíncrona cuando la imagen se haya realmente cargado.
            imgCargadas++;
            paintEscena();
          }, false);
        // Carga de la imagen del nudo en la cuerda
        imgNudo = new Image();
        imgNudo.src = 'images/nudo.png';
        imgNudo.addEventListener('load', function() {
            imgCargadas++;
            paintEscena();
          }, false);
      }  



    /**
     * Función principal para pintar la escena, esta función puede tardar un poco en realizar el pintado, por lo que hemos
     * retrasado la llamada al siguiente método "interactua()" unos 100 milisegundos. Ten en cuenta que esa forma de hacer
     * "delay" es asíncrona. Todo el juego es un bucle entre las funciones "paintEscena" e "interactua". Las dos funciones 
     * continuamente se llaman entre sí, creando un "bucle".
     */
    function paintEscena () {
        // Sólo pasamos a pintar la escena si nos aseguramos de que las dos imágenes han sido cargadas correctamente.
        if (imgCargadas == 2) {
            // Pintamos el fondo, el personaje, los caracteres adivinados y los fallos comentidos por el usuario. Cada cosa en su función
            paintFondo();
            paintPersonaje();
            paintCaracteresAdivinados();
            paintFallos();

            // Si no hemos llegado al fin del juego, esperamos 100 milisegundos y llamamos a la función "interactua".
            // La variable "finJuego" se establecerá a valor true en la función "interactua"
            if (!finJuego) {
                setTimeout(interactua,200);
            }
        }
    } 



    /**
     * Es el método principal para la lógica interna del juego. Este método se combina con "paintEscena". Los dos métodos se llaman
     * uno al otro continuamente hasta que el juego finaliza. Este método es el responsable de:
     *      Pedir al usuario que introduzca una letra o una palabra
     *      Comparar si el usuario introduce una palabra y dicha palabra coincide con la palabra secreta
     *      Comparar si el usuario introduce un carácter y dicho carácter coincide con alguno de los carácteres de la palabra secreta
     *      Controlar el número de fallos y el detalle de los mismos
     *      activar las banderas que permiten el funcionamiento del juego: finJuego y palabraAdivinada
     */
    
    function interactua () {

        // Si se llega a este método pero el juego ya ha terminado, se debe acabar la ejecución del programa, este método ya no
        // llamará a "paintEscena" y la ejecución terminará
        if (finJuego) {
            return;
        }

        // Si al llegar al método la palabra ya ha sido adivinada felicitamos al usuario y activamos la correspondiente bandera
        if (palabraAdivinada) {
            finJuego = true;
            alert ("Enhorabuena, has acertado la palabra secreta");
        }

        // Si hemos alcanzado el máximo número de fallos, informamos, cargamos el array de coincidencias con los caracteres de 
        // la palabra secreta (para que posteriormente salgan en pantalla y el usuario pueda comprobar sus errores) y activamos la
        // correspondiente bandera
        if (contFallos >= fallosMaximos) {
            alert("Perdiste, has acumulado demasiados fallos. \nLa palabra secreta es: " + palabraAzar);
            coincidencias = palabraAzar.split('');
            finJuego = true;
        }

        // Si hemos llegado al fin del juego, se llama a un último refresco del objeto canvas, a través de "paintEscena" y se acaba
        // el programa
        if (finJuego) {
            paintEscena();
            return;
        }

        // Empieza la lógica "normal" del programa, se pide al usuario que encuentre una letra o una palabra completa
        palabraUsu = prompt("Pruebe con una letra o una palabra");
        // El juego aún no está terminado
        finJuego = false;

        // Si el usuario no introduce nada en el popup no se procesará nada, porque la palabraUsu valdrá "null"
        if (palabraUsu != null) {
            // Vamos a partir del hecho de que el usuario no acierta, para intentar ahora comprobar en diferentes casos que el usuario
            // ha acertado, bien sea con la palabra completa o con un carácter
            var fallo = true;

            // Si la longitud de lo introducido por el usuario es mayor de 1 se trata de una palabra que debe coincidir al completo
            // con la palabra "pensada" por el ordenador, en este caso anularemos la bandera "fallo" y activaremos "palabraAdivinada"
            if (palabraUsu.length > 1) {
                // Para comparar utilizaremos "localeCompare" que permite esquivar la problemática de las tildes, diéresis, mayúsculas y 
                // cualquier problema que encontremos en el idioma Español cuando comparamos caracteres. Por ejemplo, si la palabra buscada
                // es "corazón" y el usuario busca "o" debemos de poder identificar que 'ó' es igual a 'o'.
                if (palabraUsu.localeCompare(palabraAzar, 'es', {sensitivity: 'base'}) == 0) {
                    // Con la siguiente instrucción obtenemos directamente un array con las letras de la palabra buscada, que cargamos
                    // sobre el array de "coincidencias". Este array dejará de contener los caracteres '_'
                    coincidencias = palabraAzar.split('');
                    fallo = false;
                    palabraAdivinada = true;
                }
            }
            else { // Longitud de la palabra del usuario es 1. Se trata de un carácter único
                // Recorreré todas las letras de la palabra buscada, comparando con la letra que ha introducido el usuario.
                for (var i = 0; i < palabraAzar.length; i++) {
                    // Para utilizar "localeCompare" transformo un caracter en un String
                    var charDePalabraAzar = "" + palabraAzar.charAt(i);
                    // Volvemos a utilizar "localeCompare"
                    if (palabraUsu.localeCompare(charDePalabraAzar, 'es', {sensitivity: 'base'}) == 0) {
                        coincidencias[i] = palabraAzar.charAt(i);
                        // Si el usuario ha encontrado alguna letra de la palabra buscada, desactivamos la bandera "fallo"
                        fallo = false;
                    }
                }
            }

            // Compruebo si existe un fallo. Si hemos llegado hasta aquí con la variable "fallo" a valor "true", significará que 
            // el usuario ha fallado. Debemos contabilizar el fallo y agregarlo al array de fallos cometidos por el usuario.
            // La variable "contFallos" nos permite ser utilizada como índice del array en el que debemos introducir el fallo
            // cometido por el usuario.
            if (fallo == true) {
                fallos[contFallos] = palabraUsu;
                contFallos++;
            }

            // El usuario puede haber descubierto uno a uno todos los caracteres. En ese caso activaremos la bandera "palabraAdivinada"
            if (estanDescubiertosTodosLosCaracteres()) {
                palabraAdivinada = true;
            }

        }

        // Ahora toca repintar la escena, para que todas las variables globales que hemos modificado en este método tengan representación
        // sobre el objeto canvas. Tenemos que tener en cuenta que "paintEscena" terminará volviendo a llamar a la función "interactua".
        // Esta llamada continua entre las dos funciones es una forma de hacer el bucle que siempre se necesita en cada videojuego.
        paintEscena();
    }





    /**
     * Pintamos las dos imágenes que componen el fondo del juego
     */
	function paintFondo () {
		// Pinto el fondo de la escena
        ctx.drawImage(imgFondo, 0, 0);
		// Pinto el nudo 
        ctx.drawImage(imgNudo, offsetHorizontalPersonaje, 0);
		// Pinto el título del juego
        ctx.font="30px Verdana";
        ctx.fillStyle = COLOR_PERSONAJE_NORMAL;
        ctx.fillText("!Encuentra la palabra secreta!", offsetHorizontalPersonaje + 250, 50);
    }


    /**
     * Pinto el personaje. Cada parte del personaje se pintará en un color determinado. Para saber el color en el que
     * pintamos cada parte necesitamos saber la cantidad de fallos cometidos por el usuario.
     */
    function paintPersonaje() {
        // Pinto el personaje

        // Cabeza
		// En caso de que el número de fallos cometidos lo indique, se debe poner un color de fallo
        ctx.arc(offsetHorizontalPersonaje + 112, offsetVerticalPersonaje + 42, 50, 0, 2 * Math.PI, false);
        ctx.fillStyle = contFallos > 0? COLOR_PERSONAJE_FALLO : COLOR_PERSONAJE_NORMAL;  
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.stroke();
		// Tronco
        ctx.fillStyle = contFallos > 1? COLOR_PERSONAJE_FALLO : COLOR_PERSONAJE_NORMAL;  
		ctx.fillRect(offsetHorizontalPersonaje + 63, offsetVerticalPersonaje + 100, 100, 150);
		ctx.strokeRect(offsetHorizontalPersonaje + 63, offsetVerticalPersonaje + 100, 100, 150);
		// Brazo izquierdo
        ctx.fillStyle = contFallos > 2? COLOR_PERSONAJE_FALLO : COLOR_PERSONAJE_NORMAL;  
		ctx.fillRect(offsetHorizontalPersonaje + 26, offsetVerticalPersonaje + 100, 35, 145);
		ctx.strokeRect(offsetHorizontalPersonaje + 26, offsetVerticalPersonaje + 100, 35, 145);
		// Brazo derecho
        ctx.fillStyle = contFallos > 3? COLOR_PERSONAJE_FALLO : COLOR_PERSONAJE_NORMAL;  
		ctx.fillRect(offsetHorizontalPersonaje + 165, offsetVerticalPersonaje + 100, 35, 145);
		ctx.strokeRect(offsetHorizontalPersonaje + 165, offsetVerticalPersonaje + 100, 35, 145);
		// Pierna izquierda
        ctx.fillStyle = contFallos > 4? COLOR_PERSONAJE_FALLO : COLOR_PERSONAJE_NORMAL;  
		ctx.fillRect(offsetHorizontalPersonaje + 63, offsetVerticalPersonaje + 252, 49, 145);
		ctx.strokeRect(offsetHorizontalPersonaje + 63, offsetVerticalPersonaje + 252, 49, 145);
		// Pierna derecha
        ctx.fillStyle = contFallos > 5? COLOR_PERSONAJE_FALLO : COLOR_PERSONAJE_NORMAL;  
		ctx.fillRect(offsetHorizontalPersonaje + 114, offsetVerticalPersonaje + 252, 49, 145);
		ctx.strokeRect(offsetHorizontalPersonaje + 114, offsetVerticalPersonaje + 252, 49, 145);
	}
 


    /**
     * Pinto en la escena los caracteres ya adivinados por el usuario. Si existen caracteres no adivinados pintaré un rectángulo
     * relleno de color
     */
	function paintCaracteresAdivinados() {
        ctx.fillStyle = "#ffb056";
		// Uno a uno pinto los caracteres en pantalla.
        ctx.font="40px Verdana";
		for (var i = 0; i < coincidencias.length; i++) {
			var x = i * (ANCHO_CARACTER_SECRETO + SEPARACION_CARACTERES_SECRETOS) + offsetHorizontalPersonaje + 230;
			// Si se ha encontrado el carácter correspondiente, dibujo el caracter, si no dibujo un cuadrado con transparencia
			if (coincidencias[i] != '_') {
				ctx.fillStyle = COLOR_PERSONAJE_NORMAL;
				ctx.fillText("" + coincidencias[i], x + 10, 190);
			}
			else { // No se ha encontrado el carácter
				ctx.fillStyle = COLOR_PERSONAJE_FALLO;
				ctx.fillRect(x, 150, ANCHO_CARACTER_SECRETO, 60);
            }
        }

	}



    /**
     * Pinto los fallos cometidos por el usuario, almacenados en el array "fallos" y controlados por el numérico "contFallos"
     */
    function paintFallos () {
		// Comienzo a pintar fallos cuando los haya
		if (contFallos > 0) {
			var x = 330;
			var y = 280;
			ctx.fillStyle = COLOR_PERSONAJE_FALLO;
			ctx.fillText("Fallos cometidos:", x, y);
			// Pinto cada fallo en pantalla
			for (var i = 0; i < contFallos; i++) {
				ctx.fillText(fallos[i], x + 30, y + (i + 1) * 40);
			}
		}
	}





    /**
     * Con este método recorro el array de "coincidencias", para conocer si el usuario ya ha adivinado todos los caracteres que
     * componen la palabra secreta
     */
    function estanDescubiertosTodosLosCaracteres () {
		for (var i = 0; i < coincidencias.length; i++) {
			if (coincidencias[i] == '_') { 
				return false;
			}
		}
		return true;
    }


    /**
     * Obtención de un número secreto desde 0 hasta un máximo
     * @param {*} max 
     */
    function getNumeroAleatorio(max) {
        return Math.floor(Math.random() * max);
    }

    /**
     * Método devuelto por el objeto
     */
    return {
        init: init
    }
})();