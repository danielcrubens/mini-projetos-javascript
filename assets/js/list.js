
let banco = []

/* pega no banco */
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []
/* atualiza do banco */
const setBanco = (banco)=> localStorage.setItem('todoList',JSON.stringify(banco))

/* criando item */
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `
    <input type="checkbox"${status} data-indice =${indice}>
    <div>${tarefa}</div>
    <input type="button"value="x" data-indice =${indice}>
    `
    document.querySelector('#todoList').appendChild(item)
}

/* limpar item */
const limparTarefas = () => {
    const todoList = document.querySelector('#todoList')
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }

}

/* chamar item */
const atualizarTela = () => {
    limparTarefas()

    const banco = getBanco()
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice))
}

/* inserir nova tarefa */
const inserirItem = (evento) => {
    const tecla = evento.key
    const texto = evento.target.value
    if (tecla === 'Enter') {
        const banco = getBanco()
        banco.push({ 'tarefa': texto, 'status': '' })
        setBanco(banco)
        atualizarTela()
        evento.target.value = ''
    }
}

/* remover item */
const removerItem = (indice) => {
    const banco = getBanco()
    banco.splice(indice, 1)
    setBanco(banco)
    atualizarTela()
}

/* atualizar item */
const atualizarItem = (indice) => {
    const banco = getBanco()
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''
    setBanco(banco)
    atualizarTela()
}

const clickItem = (evento) => {
    const elemento = evento.target
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice
        removerItem(indice)
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice
        atualizarItem(indice)
    }
}

document.querySelector('#newItem').addEventListener('keypress', inserirItem)
document.querySelector('#todoList').addEventListener('click', clickItem)

atualizarTela()