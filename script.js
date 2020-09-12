//PEDIDO PELO WHATSAPP
var whatsappEnviar = () => {

    var nome = document.getElementById('contact-form').nome_cliente.value;
    var pedido = document.getElementById('contact-form').pedido.value;

    var texto = 'Olá,meu nome é ' + nome + '! Gostaria de fazer um pedido.PEDIDO: ' + pedido;
    var href = 'https://api.whatsapp.com/send?phone=5519982492037&text=' + texto + '&lang=pt_br';

    window.location.href = href;
}

//AJAX PARA TER RESPOSTAS
var AJAXemJS = () => {
    window.location.href = 'test.php';
}