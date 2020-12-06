function adicionar () {
    var texto = document.getElementById("texto").value;
    if (texto == "") {
        alert("Favor, preencher o campo antes de adicionar!")
        return;
    }
    var lista = pegaLista()
    lista.unshift({ texto: texto, concluido: false }) 
    document.getElementById("texto").value = "" 
    salvarLista(lista)
    exibirLista ()
}

function exibirLista () {
    document.getElementById("lista").innerHTML = "";
    var lista = pegaLista()
    lista.forEach((item, posicao) => exibirItem(item, posicao)) 
}

function exibirItem (item, posicao) {
    var elementoLi = document.createElement("li");
    var elementoInput = document.createElement("input");
    elementoInput.setAttribute("type","checkbox")
    elementoInput.addEventListener("click", () => alterarItem(item, posicao))
    var elementoLabel = document.createElement("label");
    elementoLabel.innerHTML = item.texto
    var elementoButton = document.createElement("button");
    elementoButton.addEventListener("click", () => removerItem(item, posicao))
    elementoButton.innerHTML = "X"
   
    if (item.concluido) {
        elementoLi.setAttribute("class" ,"concluido")
        elementoInput.setAttribute("checked", "")
    }

    elementoLi.appendChild(elementoInput)
    elementoLi.appendChild(elementoLabel)
    elementoLi.appendChild(elementoButton)
    document.getElementById("lista").appendChild(elementoLi)
}

function pegaLista() {
    var lista = []
    var json = localStorage.getItem('lista')
    if (json != null){
        lista = JSON.parse(json)
    }
    return lista;
}

function salvarLista (lista){
    localStorage.setItem('lista', JSON.stringify(lista))
}

function removerItem (item, posicao) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")){
        var lista = pegaLista()
        lista.splice(posicao, 1) 
        salvarLista(lista)  
        exibirLista()
    }   
}

function teclaPressionada (tecla) {
    if (tecla.key == "Enter"){
        adicionar()
    }
}

function alterarItem (item, posicao) {
    var lista = pegaLista()
    lista[posicao].concluido = !lista[posicao].concluido
    salvarLista(lista)  
    exibirLista()
}

function excluirTudo () {
    if (confirm("Tem certeza que deseja excluir todas as tarefas?")) {
        localStorage.removeItem("lista")
        exibirLista()
    }
}

exibirLista()
document.getElementById("texto").addEventListener("keypress", teclaPressionada)