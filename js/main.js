$(document).ready(function(){
	// Get a reference to the database service
	var database = firebase.database();
	var mensagens = firebase.database().ref().child('mensagens');

	mensagens.on('child_added', function(data) {
		addComentario(data.val());
	});
	//var commentsRef = firebase.database().ref('');
	function addComentario(comentario){
		var msg_element = $('<div class="row message-bubble"></div>');
		msg_element.append('<p class="text-muted">'+comentario.nome+' ('+comentario.date+')</p>');
		msg_element.append('<span>'+comentario.mensagem+'</span>');
		$("#lista-mensagens").append(msg_element);
		window.scrollTo(0,document.body.scrollHeight);
	}

	$("#btn-enviar").click(function(){
		var msg = {
			nome: $('#input-nome').val(),
			date: getHoraMinuto(),
			mensagem: $('#mensagem').val()
		}
		mensagens.push(msg);
		$('#mensagem').val("");
	});

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


	function addZero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}

	function getHoraMinuto() {
		var d = new Date();
		var h = addZero(d.getHours());
		var m = addZero(d.getMinutes());
		return h + ":" + m;
	}
});