//Action
var page = "procurar";
var productsData;

$(document).ready(function () {
    page = "procurar";

    $.getJSON("products.json", function (res) {
    })
        .done(function (res) {
            productsData = res[0];
            getCarrinho();
        })
        .fail(function (err) {
            console.log(err);
        })
        .always(function () {
        });
});

//PEDIDO PELO WHATSAPP
var whatsappEnviar = () => {

    window.teste = "TESTADO";

    var nome = document.getElementById('name').value;
    var pedido = document.getElementById('pedido').value;

    var texto = 'Olá,meu nome é ' + nome + '! Gostaria de fazer um pedido. \n *PEDIDO:* ' + pedido;
    var href = 'https://api.whatsapp.com/send?phone=5519982492037&text=' + texto + '&lang=pt_br';

    window.location.href = href;
}

var getCarrinho = () => {

    //Só acontece 1 vez, quando o usuário entrar na página
    if ($('.carousel').not('.slick-initialized')[0] != undefined) {
        document.getElementById('main').innerHTML = procurarProdutos();
        document.getElementById('carrinho-button').innerHTML = totalProdutos;
        fix();
    }
    else {
        if (page === "procurar") {
            page = "pagar";
            document.getElementById('carrinho-button').innerHTML = comprarProdutos;
            //Comprar
            document.getElementById('main').style.visibility = "hidden";
            document.getElementById('main').style.display = "none";
            //Carrinho atual
            document.getElementById('carrinho-compras').style.visibility = "hidden";
            document.getElementById('carrinho-compras').style.display = "none";
            //Checkout
            document.getElementById('main2').style.visibility = "visible";
            document.getElementById('main2').style.display = "block";
            $('.carousel').slick('slickSetOption', "autoplay", "false", "true");

        }
        else if (page === "pagar") {
            page = "procurar";
            document.getElementById('carrinho-button').innerHTML = totalProdutos;
            //Comprar
            document.getElementById('main').style.visibility = "visible";
            document.getElementById('main').style.display = "block";
            //Carrinho atual
            document.getElementById('carrinho-compras').style.visibility = "visible";
            document.getElementById('carrinho-compras').style.display = "block";
            //Checkout
            document.getElementById('main2').style.visibility = "hidden";
            document.getElementById('main2').style.display = "none";
            $('.carousel').slick('slickSetOption', "autoplay", "true", "true");
        }
    }
}

var procurarProdutos = () => {
    var produtos = Object.keys(productsData).length;
    var HTMLreturned = '';

    for (var i = 0; i < produtos; i++) {
        //Object.entries pega as entradas para aquele elemento do array de produtos
        //Na posição [i][0] ficam os ids dos produtos
        //Na posição [i][1] ficam os objetos daqueles produtos
        //A partir do [i][1], posso então pegar as keys que eu preciso
        //Deve existir maneiras mais simples de fazer isso, mas quero dormir :)
        HTMLreturned += categoriaHTML(Object.entries(productsData)[i][1]);
    }

    main_comprar = HTMLreturned;

    return main_comprar;
}

var categoriaHTML = (infos) => {
    return `<div style="float:left; margin-left: 0.5vw;
                    width: fit-content; height: fit-content; background-color: #d9adad; text-align: center;
                    padding: 5px;  border-radius: 8px; font-size: 1rem">
                <div style="padding: 5px; border-radius: 4px">
                    <img id="itemg" style="width: 100%; border-style: solid; border-width: thin; border-color: grey; margin:auto;
                    border-radius: 10px;" src="images/${infos.image}" alt="nops">
                </div>
                <a onclick="defineProducts(this.id)" id="${infos.id}" style="padding: 2px; padding-left: 6px; padding-right: 6px; border-radius: 6px">${infos.title}</a>                
            </div>`;
}

var fix = () => {
    $('.carousel').not('.slick-initialized').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 5,
        arrows: false,
        swipeToSlide: true,
        cssEase: 'ease-out',
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
}

var defineProducts = (id) => {

    if(document.getElementById('label-carrinho').textContent == Object.entries(productsData)[id][1].title)
    {
        document.getElementById('label-carrinho').textContent = 'Escolha acima o tipo do produto desejado';
        document.getElementById('grid-carrinho').innerHTML = '';
        return;
    }

    var products = (Object.entries(productsData)[id][1].types);
    document.getElementById('label-carrinho').textContent = Object.entries(productsData)[id][1].title;
    document.getElementById('grid-carrinho').innerHTML = '';
    for(var i = 0; i < products.length; i++)
    {
        document.getElementById('grid-carrinho').innerHTML +=
        `
        <div id="item-carrinho">
            <div id="item-nome">${products[i].title}</div>
            <img title="${products[i].title}" id="item-imagem" style="width: 80%; border-radius: 10px;"
                src="images/${products[i].image}" alt="falha">
            <a id="${products[i].title}" onclick="addItem(this.id, 1, ${products[i].price})">
                <img id="addremove" style="position: absolute; right: 5%; top: 5%;"
                    src="images/adicionar.png" alt="adicionar-item"></a>
            <a id="${products[i].title}" onclick="removeItem(this.id, 1, ${products[i].price})">
                <img id="addremove" style="position: absolute; left: 5%; top: 5%;"
                    src="images/remover.png" alt="remover-item"></a>
        </div>
        `
        ;
    }
}

var carrinho = [];

var addItem = (item, qtd, preco) => {

    console.log(preco);

    updateTotal(qtd * preco);

    if(carrinho[item] == null){
        console.log("n existe")
        carrinho[item] = qtd;
    }
    else{
        carrinho[item]++;
        console.log("existe")
    }
    atualizarCarrinho();
}

var removeItem = (item, qtd, preco) => {
    if(carrinho[item] == null || carrinho[item] <= 0){
        alert('Este item não está no seu carrinho. Fique tranquilo :)')
    }
    else{
        updateTotal(-1 * (qtd * preco));
        carrinho[item]--;
        atualizarCarrinho();
    }
}

var atualizarCarrinho = () => {

    var tamanhoCarrinho = Object.entries(carrinho);
    console.log('???');
    document.getElementById('pedido').textContent = '';

    for(var i = 0; i < tamanhoCarrinho.length; i++)
    {
        if(i != 0 && tamanhoCarrinho[i][1] > 0)
            document.getElementById('pedido').textContent += `${tamanhoCarrinho[i][0]} - qtd.: ${tamanhoCarrinho[i][1]} \n`;
        else if(i == 0)
        document.getElementById('pedido').textContent += `Total a pagar: R$${tamanhoCarrinho[i][1]} \n -------------- \n`;
    }
}

var updateTotal = (custo) => {

    if(carrinho["total"] == null)
    {
        carrinho["total"] = 0.0;
    }
    
    carrinho["total"] += custo;

    document.getElementById('carrinho-button').innerHTML = "R$ " + carrinho["total"];

}