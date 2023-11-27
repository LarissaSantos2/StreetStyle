// Para diminuir o navbar em telas
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}
// Seleciona elementos do DOM
// Seleciona elementos do DOM
let iconeCarrinho = document.getElementById('icone-carrinho');
let carrinho = document.querySelector('.carrinho1');
let fecharCarrinho = document.getElementById('fechar-carrinho');
let conteudoCarrinho = document.querySelector('.conteudo-carrinho');
let precoTotalElemento = document.querySelector('.preco-total');
let btnComprar = document.querySelector('.btn-comprar');
let quantidadeCarrinhoElemento = document.getElementById('quantidade-carrinho');

// Variável para armazenar a quantidade no carrinho
let quantidadeCarrinho = 0;

// Adiciona event listeners
iconeCarrinho.addEventListener('click', () => carrinho.classList.add('ativo'));
fecharCarrinho.addEventListener('click', () => carrinho.classList.remove('ativo'));
btnComprar.addEventListener('click', botaoComprarClicado);

// Função chamada quando o botão 'Comprar agora' é clicado
function botaoComprarClicado() {
    alert('Seu pedido foi feito');
    limparCarrinho();
    atualizarTotal();
}

// Função para adicionar um produto ao carrinho
function adicionarProdutoAoCarrinho(titulo, preco, imgProduto) {
    var nomesItensCarrinho = conteudoCarrinho.getElementsByClassName('titulo-produto');

    for (var i = 0; i < nomesItensCarrinho.length; i++) {
        if (nomesItensCarrinho[i].innerText === titulo) {
            alert("Você adicionou este item ao seu carrinho");
            return;
        }
    }

    var caixaCompraCarrinho = document.createElement('div');
    caixaCompraCarrinho.classList.add('caixa-carrinho');

    var conteudoCaixaCompra = `
        <img src="${imgProduto}" alt="" class="img-carrinho">
        <div class="detalhes-caixa-carrinho">
            <div class="titulo-produto">${titulo}</div>
            <div class="preco">${preco}</div>
            <label for="quantidade">Quantidade:</label>
            <input type="number" class="quantidade-carrinho" value="1" min="1">
        </div>
        <i class='bx bx-trash-alt remover-carrinho'></i>
    `;

    caixaCompraCarrinho.innerHTML = conteudoCaixaCompra;
    conteudoCarrinho.appendChild(caixaCompraCarrinho);

    // Adiciona listener de evento para o input de quantidade
    var inputQuantidade = caixaCompraCarrinho.getElementsByClassName('quantidade-carrinho')[0];
    inputQuantidade.addEventListener('change', atualizarTotal);

    caixaCompraCarrinho.getElementsByClassName('remover-carrinho')[0].addEventListener('click', removerItemCarrinho);

    alert("Você adicionou este item ao seu carrinho");
    atualizarTotal();

    // Incrementa a quantidade no carrinho
    quantidadeCarrinho++;
    atualizarQuantidadeCarrinho();
}

// Função para remover um item do carrinho
function removerItemCarrinho(evento) {
    var itemCarrinho = evento.target.closest('.caixa-carrinho');
    itemCarrinho.remove();
    atualizarTotal();

    // Decrementa a quantidade no carrinho
    quantidadeCarrinho--;
    atualizarQuantidadeCarrinho();
}

// Função para limpar o carrinho
function limparCarrinho() {
    while (conteudoCarrinho.hasChildNodes()) {
        conteudoCarrinho.removeChild(conteudoCarrinho.firstChild);
    }
    quantidadeCarrinho = 0;
    atualizarQuantidadeCarrinho();
}

// Função para atualizar o total no carrinho
function atualizarTotal() {
    var caixasCarrinho = conteudoCarrinho.getElementsByClassName('caixa-carrinho');
    var total = 0;

    for (var i = 0; i < caixasCarrinho.length; i++) {
        var caixaCarrinho = caixasCarrinho[i];
        var elementoPreco = caixaCarrinho.getElementsByClassName('preco')[0];
        var elementoQuantidade = caixaCarrinho.getElementsByClassName('quantidade-carrinho')[0];
        var preco = parseFloat(elementoPreco.innerText.replace('R$', ""));
        var quantidade = parseInt(elementoQuantidade.value, 10);
        total += preco * quantidade;
    }

    total = total.toFixed(2);
    precoTotalElemento.innerText = 'R$' + total;
}

// Função para atualizar a quantidade no ícone do carrinho
function atualizarQuantidadeCarrinho() {
    quantidadeCarrinhoElemento.innerText = quantidadeCarrinho.toString();

    // Se a quantidade for maior que 0, exiba o span, caso contrário, oculte
    quantidadeCarrinhoElemento.style.display = quantidadeCarrinho > 0 ? 'inline' : 'none';
}

// Adiciona event listeners para os botões 'Adicionar ao Carrinho'
var botoesAdicionarCarrinho = document.getElementsByClassName('adicionar-carrinho');
for (var i = 0; i < botoesAdicionarCarrinho.length; i++) {
    var botao = botoesAdicionarCarrinho[i];
    botao.addEventListener("click", function (evento) {
        var produtosLoja = evento.target.parentElement;
        var titulo = produtosLoja.getElementsByClassName('titulo-produto')[0].innerText;
        var preco = produtosLoja.getElementsByClassName('preco')[0].innerText;
        var imgProduto = produtosLoja.getElementsByClassName('imagem-produto')[0].src;
        adicionarProdutoAoCarrinho(titulo, preco, imgProduto);
    });
}



function redirecionar(url) {
    window.location.href = url;
}

function adicionarAoCarrinho(event) {
    // Lógica para adicionar ao carrinho, por exemplo, exibindo uma mensagem


    // Evitar que o evento seja propagado para o elemento pai (div.pro)
    event.stopPropagation();
}

