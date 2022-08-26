'use strict'
/* Modal abrir/fechar */
const openModal = () => document.querySelector('#modal').classList.add('active')

const closeModal = () => {
    clearFields()
    document.querySelector('#modal').classList.remove('active')

}

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbClient')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem('dbClient', JSON.stringify(dbClient))

/* CRUD */
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}
const readClient = () => getLocalStorage()

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.querySelector('#form').reportValidity()
}

/* limpando campos */
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")// forEach ira varrer todos os campo
    document.querySelector('#nome').dataset.index = 'new'
}
/* Salvando dados */
const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.querySelector('#nome').value,
            email: document.querySelector('#email').value,
            celular: document.querySelector('#celular').value,
            cidade: document.querySelector('#cidade').value
        }
        const index = document.querySelector('#nome').dataset.index
        if (index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}
/* Criando novas linhas na tabela */
const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
<td>${client.nome}</td>
<td>${client.email}</td>
<td>${client.celular}</td>
<td>${client.cidade}</td>
<td class="d-flex">
     <button type="button" class="button green" id="edit-${index}">Editar</button>
    <button type="button" class="button red" id="delete-${index}" >Excluir</button>
</td>
`
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}
/* Limpar linhas da tabela */
const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}
/* Atualizando tabela */
const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}
/* Mostra campos preenchidos para ser editado */
const fillFields = (client) => {
    document.querySelector('#nome').value = client.nome
    document.querySelector('#email').value = client.email
    document.querySelector('#celular').value = client.celular
    document.querySelector('#cidade').value = client.cidade
    document.querySelector('#nome').dataset.index = client.index

}
/* Editar cliente */
const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}
/* Editar tabelas */
const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(index)

        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)

            if (response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}

updateTable()

/* Eventos */
document.querySelector('#cadastrarCliente')
    .addEventListener('click', openModal)

document.querySelector('#modalClose')
    .addEventListener('click', closeModal)

document.querySelector('#salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)

document.querySelector('#cancelar')
    .addEventListener('click', closeModal)