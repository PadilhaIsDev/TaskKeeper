// Seleção de elementos
const formulario = document.querySelector('#formulario');
const inputs = document.querySelector('#input-geral');
const lista = document.querySelector('#lista');
const edit = document.querySelector('#form-edit');
const inputEdit = document.querySelector('#input-edit');
const cancel = document.querySelector('#botao-cancel');

let oldInputValue;

// Funções
const saveForm = (text) => {
    const tasks = document.createElement("div");
    tasks.classList.add("task-keeper");

    const tarefa = document.createElement("h3");
    tarefa.innerText = text;
    tasks.appendChild(tarefa);

    const botaoFinalizar = document.createElement("button");
    botaoFinalizar.classList.add("finalizar-tarefas");
    botaoFinalizar.innerHTML = '<i class="fa-solid fa-check"></i>';
    tasks.appendChild(botaoFinalizar);

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("editar-tarefas");
    botaoEditar.innerHTML = '<i class="fa-solid fa-pen"></i>';
    tasks.appendChild(botaoEditar);

    const botaoCancelar = document.createElement("button");
    botaoCancelar.classList.add("remover-tarefas");
    botaoCancelar.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    tasks.appendChild(botaoCancelar);
    lista.appendChild(tasks);

    inputs.value = "";
    inputs.focus();
};

   const toggleForms = () => {
      edit.classList.toggle("esconder");
      formulario.classList.toggle("esconder");
      lista.classList.toggle("esconder");
   };

   const atualizarValor = (text) => {
      const tarefas = document.querySelectorAll(".task-keeper")

      tarefas.forEach((tarefa) => {
         let formTitle = tarefa.querySelector("h3");

            if (formTitle.innerText === oldInputValue) {
               formTitle.innerText = text
            }
      });
   };
// Eventos

formulario.addEventListener("submit", (e) =>{
    e.preventDefault();

    const valorInput = inputs.value;

    if (valorInput) {
       saveForm(valorInput);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let formTitle;

    if (parentEl && parentEl.querySelector("h3")) {
      formTitle = parentEl.querySelector("h3").innerHTML;
    }

     if (targetEl.classList.contains("finalizar-tarefas")) {
        parentEl.classList.toggle("done");
     }

     if (targetEl.classList.contains("remover-tarefas")) {
        parentEl.remove();
     }

     if (targetEl.classList.contains("editar-tarefas")) {
        toggleForms();

        inputEdit.value = formTitle
        oldInputValue =formTitle
     }
});

cancel.addEventListener("click", (e) => {
   e.preventDefault();

   toggleForms();
});

edit.addEventListener("submit", (e) => {
   e.preventDefault();
   const editInputvalue = inputEdit.value

   if(editInputvalue) {
      atualizarValor(editInputvalue)
   }

   toggleForms()
})