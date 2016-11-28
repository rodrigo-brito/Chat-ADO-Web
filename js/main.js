$(document).ready(function(){
	// Referência da base do Firebase
	var mensagens = firebase.database().ref('mensagens');

	//Quando nova mensagem é salva
	mensagens.on('child_added', function(data) {
		addComentario(data.val());
	});

	/**
	 * Adiciona nova mensagem na UI do Chat
	 * @param {JSON} comentario
	 */
	function addComentario(comentario){
		var msg_element = $('<div class="row message-bubble"></div>');
		msg_element.append('<p class="text-muted">'+comentario.nome+' ('+comentario.date+')</p>');
		msg_element.append('<span>'+comentario.mensagem+'</span>');
		$("#lista-mensagens").append(msg_element);
		window.scrollTo(0,document.body.scrollHeight);
	}

	//Click para enviar mensagem
	$("#btn-enviar").click(function(){
		var msg = {
			nome: $('#input-nome').val(),
			date: getHoraMinuto(),
			mensagem: $('#mensagem').val()
		}
		mensagens.push(msg);
		$('#mensagem').val("");
	});

	//Enter no botão de enviar mensagem
	$('#form-mensagem').on('submit', function(event){
		event.preventDefault();
		var msg = {
			nome: $('#input-nome').val(),
			date: getHoraMinuto(),
			mensagem: $('#mensagem').val()
		}
		mensagens.push(msg);
		$('#mensagem').val("");
	})

	/**
	 * Adiciona zero para unidade de tempo menor que 10
	 * @param {String} tempo com zero incluso
	 */
	function addZero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}

	/**
	 * Retorna as horas e minutos formatados
	 * @return {String} Hora e minuto no formato HH:mm
	 */
	function getHoraMinuto() {
		var d = new Date();
		var h = addZero(d.getHours());
		var m = addZero(d.getMinutes());
		return h + ":" + m;
	}
});