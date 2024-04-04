let btn = document.getElementById('btn')
let cxListaTarefas = document.querySelector('.cxListaTarefas')
let arrayListaTarefas = []

// Função para exibir alerta com infos de navegação ao carregar página
function exibirAlerta() {
    alert("ENTER = ADICIONAR TAREFA / TAB, TAB + SHIFT = NAVEGAÇÃO / ENTER NA TAREFA SELECIONADA = CONCLUIDA / DELETE = DELETAR TAREFA");
}

// Adiciona um event listener para o evento 'load' do documento
window.addEventListener('load', exibirAlerta);

// Adiciona um event listener ao botão
btn.addEventListener('click', function () {
    adicionarTarefa()
    this.classList.add('efeitoScale')
})

// Função para validar input
function validarInput(tarefa) {
    if (tarefa === '') {
        alert('O campo de tarefa está vázio!')
        return false
    }

    if (tarefa.length > 25) {
        alert('O número de caracteres excedeu o limite de 30!')
        return false
    }

    return true
}

// Função para adicionar uma tarefa à lista
function adicionarTarefa() {
    let input = document.getElementById('input'); 

    let tarefa = input.value; 

    if (validarInput(tarefa)) {
        let novaTarefa = {
            tarefa: tarefa,
            concluido: false
        };
        arrayListaTarefas.push(novaTarefa);
        input.value = ''; 
        mostrarTarefas();
    }
}

// Função para exibir as tarefas na lista
function mostrarTarefas() {
    let novaLi = '';
    arrayListaTarefas.forEach((item, posicao) => {
        novaLi += `
            <li class="tarefa ${item.concluido && 'concluido'}" tabindex="0">
                <img src="assets/img/checked.png" alt="" onclick="concluido(${posicao})">
                <p>${item.tarefa}</p>
                <img src="assets/img/trash.png" alt="" onclick="deletar(${posicao})">
            </li>
        `;
    });
    cxListaTarefas.innerHTML = novaLi;
}

// Função para concluir tarefa
function concluido(posicao) {
    arrayListaTarefas[posicao].concluido = !arrayListaTarefas[posicao].concluido
    mostrarTarefas()
}

// Função para deletar tarefa
function deletar(posicao) {
    arrayListaTarefas.splice(posicao, 1)
    mostrarTarefas()
}

// Adiciona um event listener para a tecla "Enter" no input
document.getElementById('input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
        btn.classList.add('efeitoScale'); 

        setTimeout(() => {
            btn.classList.remove('efeitoScale')
        }, 100)

    }
});

// Adiciona um event listener para a tecla "Shift" + "Tab"
document.addEventListener('keydown', function (event) {
    if (event.shiftKey && event.key === 'Tab') {
        let tarefas = document.querySelectorAll('.tarefa');
        let focusedIndex = -1;

        // Encontra o índice da tarefa atualmente focada
        tarefas.forEach((tarefa, index) => {
            if (tarefa === document.activeElement) {
                focusedIndex = index;
            }
        });

        if (focusedIndex !== -1) {
            // Move o foco para a tarefa anterior na lista
            let previousIndex = focusedIndex - 1;
            if (previousIndex < 0) {
                previousIndex = tarefas.length - 1;
            }
            tarefas[previousIndex].focus();
            event.preventDefault(); // Impede o comportamento padrão do "Shift" + "Tab"
        }
    }
});

// Adiciona um event listener ao elemento pai da lista de tarefas
cxListaTarefas.addEventListener('keydown', function (event) {
    // Verifica se o evento ocorreu em uma tarefa (selecionada pelo usuário)
    if (event.target.classList.contains('tarefa')) {
        // Obtém o índice da tarefa selecionada
        let index = Array.from(cxListaTarefas.children).indexOf(event.target);

        // Se a tecla pressionada for "Enter", chama a função concluido
        if (event.key === 'Enter') {
            concluido(index);
        }
    }
});

// Adiciona um event listener ao elemento pai da lista de tarefas
cxListaTarefas.addEventListener('keydown', function (event) {
    // Verifica se o evento ocorreu em uma tarefa (selecionada pelo usuário)
    if (event.target.classList.contains('tarefa')) {
        // Obtém o índice da tarefa selecionada
        let index = Array.from(cxListaTarefas.children).indexOf(event.target);

        // Se a tecla pressionada for "Delete", chama a função deletar
        if (event.key === 'Delete') {
            deletar(index);
        }
    }
});


