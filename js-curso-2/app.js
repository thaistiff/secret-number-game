//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Secret number game';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Choose a number between 1 to 10';

let listaDeNumerosSorteados = []; //quando abrimos uma lista vazia, abrimos e fechamos conchetes.
let numeroLimite = 10;
let NumeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'US English Female', {rate:1.2}) //isso aqui é o pro computador literalmente ler o que esta escrito na tela
} //aqui nos criamos/declaramos a funcao 

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Secret number game');
    exibirTextoNaTela('p', 'Choose a number between 1 to 10');
}

exibirMensagemInicial();

//aqui nos estamos chamando essa funcao que foi criada.
// esse é um exemplo de funcao com parametros e sem retorno (executa mas nao devolve informacao)

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if(chute == NumeroSecreto) {
        exibirTextoNaTela('h1', 'You got it right!');
        let palavraTentativa = tentativas > 1 ? 'attempts' : 'attempt';
        let mensagemTentativas = `You guessed the secret number ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //habilitamos a visualizacao do botao NOVO JOGO, que ate entao estava desabilitado. A gente pegou o Id do botao no codigo HTML. Como no html o botao estava como DISABLED, usamos o removeAttribute pra remover o atributo e torna-lo able.
    } else {
        if(chute > NumeroSecreto) {
            exibirTextoNaTela('p', `the secret number is less than ${chute}`);
        } else {
            exibirTextoNaTela('p', `the secret number is greater than ${chute}`);
        }
        tentativas++; //mesma coisa que tentativas = tentativas + 1;
        limparCampo();
    }



} //funcao sem parametro e nao exibe retorno

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == 3) {
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''; //deixa vazio porque quando o numeroo de chute for colocado e nao for o numero secreto, o campo ficara vazio.
}

function reiniciarJogo() {
    NumeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); //deixamos o botao de NOVO JOGO desabilitadoo enquanto estamos tentando. quando acertamos, ele habilita novamente.

    
}