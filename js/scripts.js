
var palabras = ['auto','avion','barco','camion','caballo','lancha','perro','vaca','pato','serpiente','pollo','sapo','cangrejo','verde','mariposa','nido','rata','cerdo','pepino','gallina','gaviota','gato','tucan','sardina','coco','lagartija','unicornio','ballena','mono','gorila','mandril','toro','jirafa','tigre','leopardo','tucan','iguana','dragon','cobra','gallo','jurel','pantera','rancor','dragon','guaren','camaleon','papagallo','gaviota','faldero','feo','cabezon','raro','mamon','sandalia','camion','planeador','bicicleta','manto','jabon','trato','ridiculo','capa','trato','pi','cacho','patron','reto','marmol','piton','rotula','mora','frutilla','melon','cancha','pito','mermelada','sandia','fresa','chala','chapa','cara','piedra','collar','chico','trama','vieja','rasca','pronto','ir','fa','la','do','re','mi','sol','si','cama','pluma','negro','blanco','rosado','campaña','sitio','web','portal','patas','azul','marmol','oleo','macaco','oso','mal','mañoso','virtual','podrido','crustacio','molusco','pulpo','concha','verdadero','suertudo','gigante','proceso','barbacoa','zancudo','dulzura','falso','radioactivo','amarillo','volcado','volcan','trotar','japon','chile','europa','flecha','queso','lechuga','oportuno','santo','reliquia','hola','mundo','rascar','volcar','marron','llama','flamenco','papa','ganso','mosquito','zapato','rana','caracol','trozo','niño','garganta','juntos','caos','multiple','carne','carnada','musgo','craneo','musculo','resta','ser','dedo','guante','oler','fiero','terco','pulmon','jaiva','fantasma','ciclope','marte','saturno','marciano','escudo','codigo','rojo','veloz'];
var cantPal = palabras.length;
var inputPalabra = $("#inputPalabra");
var areaJuego = $("#areaJuego");
var marcador = $("#puntaje");
var anchoAreaJuego = areaJuego.width();
var seconds=38;

$(document).ready(function(){
	/*HIDE*/
	$("#inputPalabra, #marcador").hide();
	/*RESET*/
	marcador.val('');
	/*Gatilla Inicio*/
	$("#botonInicia").click(function(){
		marcador.val(0);
		$("#mainPanel").fadeOut();
		$("#inputPalabra, #puntaje").fadeIn();
		areaJuego.addClass("cambioColor");
		seconds=38;
		juegoInit();
		$("#timer .barra").addClass('activa');
		var buclePalabra = setInterval(function(){
			if (seconds<=-0){
				var puntajeFinal = $("#puntaje").val();
				clearInterval(buclePalabra);
				$("#inputPalabra, #puntaje").fadeOut();


				$("#marcador").append("<li>"+puntajeFinal+"</li>").show();
				$("#mainPanel").fadeIn();


				$("#areaJuego p.palabra").remove();
				marcador.addClass('final');
				areaJuego.removeClass("cambioColor");
			} else {
				seconds = seconds -1;
				setTimeout("creaPalabra()",1000);
				/*$("#countdown").val(seconds);*/
			}		
		}
		,1500);		
		return false;
	});	
});


function juegoInit(){
	$("#inputPalabra").focus();
	$("#inputPalabra").blur(function(){
		this.focus();
	});
	marcador.val(0);	
	$(document).keyup(function(e){
		var ekc = e.keyCode;
		$("#areaJuego p.palabra").each(function(){
			var inputPalabra = $("#inputPalabra");
			var v = inputPalabra.val();
			var t = $(this).text();
			if (t.toLowerCase().indexOf(v) >= 0 && v.length > 0){
				/*resalta si tiene el string*/
				$(this).addClass('coincide');
				$(this).unhighlight().highlight(v);
				/*CLICKEAR ENTER*/
				if (ekc == 13) {
					if(t == v){
						var tLango = t.length;					
						var puntajeVal = parseInt($("#puntaje").val());
						var sumaScore =  puntajeVal + tLango;
						$("#puntaje").val(sumaScore).removeClass("aumenta").addClass("aumenta").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){$(this).removeClass('aumenta');});
						$(this).addClass("posScore").text("+"+tLango).stop().animate({'top':'0','opacity':'0'},500,function(){$(this).remove();});
					};					
				};
			} else {
				$(this).removeClass('coincide').unhighlight();
			}			
		});/*Fin each*/
		if (ekc == 13) {
			$("#inputPalabra").val('').focus();
		};
	});
};

/*Crea Palabras*/
function creaPalabra(){
	var altoAreaJuego = $("#areaJuego").height() - 40;
	var numPalRandom = randomNum(cantPal,0);
	var topRandom = randomNum(altoAreaJuego,1);
	$('<p class="palabra">'+palabras[numPalRandom]+'</p>')
	.appendTo("#areaJuego")
	.css({'left':'900px','top':topRandom+'px','font-size':randomNum(50,18)+'px','opacity':'0.'+randomNum(4,5)})
	.animate({'left':'-50px'},velocidadSegunPuntaje(),
		function(){
		/*var sumaScore =  parseInt(marcador.val()) - parseInt($(this).text().length);
		marcador.val(sumaScore);*/		
		$(this).remove();
	});
};

function velocidadSegunPuntaje(){
	var velocidad = 12000;
	var puntaje = parseInt(marcador.val());
	if(puntaje > 0){
		velocidad = velocidad - (puntaje * 5);
	}
	return velocidad;	
};
function randomNum (max,min){
	var num = Math.floor((Math.random() * max) + min);
	return num;
};