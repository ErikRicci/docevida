//Action
var page = "procurar";

$(document).ready(function () {
    page = "procurar";
    if (page == "procurar")
    {
        document.getElementById('body2').innerHTML = procurarProdutos;
        document.getElementById('carrinho-button').innerHTML = comprarProdutos;
    }
});

//PEDIDO PELO WHATSAPP
var whatsappEnviar = () => {

    window.teste = "TESTADO";

    var nome = document.getElementById('name').value;
    var pedido = document.getElementById('pedido').value;

    var texto = 'Olá,meu nome é ' + nome + '! Gostaria de fazer um pedido.PEDIDO: ' + pedido;
    var href = 'https://api.whatsapp.com/send?phone=5519982492037&text=' + texto + '&lang=pt_br';

    //window.location.href = href;
}

var getCarrinho = () => {
    if (page == "procurar") {
        page = "finalizar";
        document.getElementById('body2').innerHTML = finalPedido;
        document.getElementById('carrinho-button').innerHTML = totalProdutos;
    }
    else {
        page = "procurar";
        document.getElementById('body2').innerHTML = procurarProdutos;
        document.getElementById('carrinho-button').innerHTML = comprarProdutos;
    }

}