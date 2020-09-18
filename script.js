//Action
var page = "procurar";
var productsJSON;

$(document).ready(function () {
    page = "procurar";

    $.getJSON("products.json", function (res) {
    })
        .done(function (res) {
            productsJSON = res[0];
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

    var texto = 'Olá,meu nome é ' + nome + '! Gostaria de fazer um pedido.PEDIDO: ' + pedido;
    var href = 'https://api.whatsapp.com/send?phone=5519982492037&text=' + texto + '&lang=pt_br';

    //window.location.href = href;
}

var getCarrinho = () => {

    //Só acontece 1 vez, quando o usuário entrar na página
    if ($('.carousel').not('.slick-initialized')[0] != undefined) {
        document.getElementById('main').innerHTML = procurarProdutos();
        document.getElementById('carrinho-button').innerHTML = comprarProdutos;
        fix();
    }
    else {
        if (page === "procurar") {
            page = "pagar";
            document.getElementById('carrinho-button').innerHTML = comprarProdutos;
            document.getElementById('main').style.visibility = "hidden";
            document.getElementById('main').style.display = "none";
            document.getElementById('main2').style.visibility = "visible";
            document.getElementById('main2').style.display = "block";
            $('.carousel').slick('slickSetOption',"autoplay", "false", "true");
            
        }
        else if (page === "pagar") {
            page = "procurar";
            document.getElementById('carrinho-button').innerHTML = comprarProdutos;
            document.getElementById('main').style.visibility = "visible";
            document.getElementById('main').style.display = "block";
            document.getElementById('main2').style.visibility = "hidden";
            document.getElementById('main2').style.display = "none";
            $('.carousel').slick('slickSetOption',"autoplay", "true", "true");
        }
    }
}

var procurarProdutos = () => {
    var produtos = Object.keys(productsJSON).length;
    var HTMLreturned = '';

    for (var i = 0; i < produtos; i++) {
        //Object.entries pega as entradas para aquele elemento do array de produtos
        //Na posição [i][0] ficam os ids dos produtos
        //Na posição [i][1] ficam os objetos daqueles produtos
        //A partir do [i][1], posso então pegar as keys que eu preciso
        //Deve existir maneiras mais simples de fazer isso, mas quero dormir :)
        HTMLreturned += produtoHTML(Object.entries(productsJSON)[i][1]);
    }

    main_comprar = HTMLreturned;

    return main_comprar;
}

var produtoHTML = (infos) => {
    return `<div style="float:left; margin-left: 0.5vw;
                    width: fit-content; height: fit-content; background-color: white; text-align: center;
                    padding: 5px;  border-radius: 8px">
                <div style="padding: 5px; border-radius: 4px">
                    <img id="itemg" style="width: 100%; border-style: solid; border-width: thin; border-color: grey; margin:auto;
                    border-radius: 10px;" src="${infos.image}" alt="">
                </div>
                ${infos.title}
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