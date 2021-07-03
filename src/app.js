import { renderFilter, eventFilterContainer } from './javascript/filter-functions.js'
import { eventChangeCheck } from './javascript/change-check.js';


const todoTemplate = document.querySelector('#todo-template');
const todoContainer = document.querySelector('#todo-container');
const newTodoName = document.querySelector('#todo-name');
const deleteCompleted = document.querySelector('#clear-completed');
const btnsContainerFilter = document.querySelector('#filters');

window.sessionStorage.setItem('filter', 'all');



// Funcion para crear y renderizar los todos
function createHTMLTodo({ Id, Text, State }) {
  // Clona un nuevo todo tomando como base el template
  const newTodo = todoTemplate.content.cloneNode(true);

  // Establece el ID unico de cada todo junto con su contenido
  newTodo.querySelector('.todo').setAttribute('id', `todo-${Id}`);
  newTodo.querySelector('p').innerHTML = Text;

  // Establece el estado del check del todo
  const todoTextContainer = newTodo.querySelector('.todo__text');
  const todoCheck = newTodo.querySelector('#todo-check');

  todoCheck.checked = State;
  if (State) newTodo.querySelector('.todo').classList.add('completed');

  // Agrega el evento para detectar el cambio del check
  todoCheck.addEventListener('change', () => eventChangeCheck(todoCheck, Id));
  todoTextContainer.addEventListener('click', () => eventChangeCheck(todoCheck, Id, true));

  // Agrega el evento para eliminar el todo
  const todoDelete = newTodo.querySelector('#todo-delete');
  todoDelete.addEventListener('click', () => {
    // Determina la posicion del todo en la lista de TODOS
    const TODOS = JSON.parse(localStorage.getItem('todos'));
    const todoIndex = TODOS.findIndex((todo) => todo.Id === Id);
    if (todoIndex === -1) return;

    // Elimina el todo de la lista y de la web
    TODOS.splice(todoIndex, 1);
    todoContainer.removeChild(document.querySelector(`#todo-${Id}`));

    // Guarda nuevamente los datos
    localStorage.setItem('todos', JSON.stringify(TODOS));
    const FILTER = window.sessionStorage.getItem('filter');
    renderFilter(FILTER);
  });

  // Agrega el todo a la web y a la lista temporal de todos los todos
  todoContainer.appendChild(newTodo);

  const FILTER = window.sessionStorage.getItem('filter');
  renderFilter(FILTER);
}



const createTodo = (newTodo) => {
  const TODOS = JSON.parse(localStorage.getItem('todos'));
  TODOS.push(newTodo);

  // Almacena todos los todos
  localStorage.setItem('todos', JSON.stringify(TODOS));
}

// Evento para detectar la creacion de un nuevo todo
newTodoName.addEventListener('keyup', (e) => {
  if (e.key !== 'Enter' || newTodoName.value.length < 3) return;

  const btnsFilter = {
    All: document.querySelector('#filt-all'),
    Active: document.querySelector('#filt-active'),
    Completed: document.querySelector('#filt-completed'),
  }

  for (let btn in btnsFilter) btnsFilter[btn].classList.remove('active');
  window.sessionStorage.setItem('filter', 'all');
  btnsFilter.All.classList.add('active');

  const newTodo = {
    State: false,
    Id: Math.floor(Math.random() * Date.now()),
    Text: newTodoName.value,
  }

  newTodoName.value = '';

  createTodo(newTodo)
  createHTMLTodo(newTodo);
});

deleteCompleted.addEventListener('click', () => {
  const TODOS = JSON.parse(localStorage.getItem('todos'));
  do {
    const todoIndex = TODOS.findIndex((todo) => todo.State === true);
    if (todoIndex === -1) break;

    todoContainer.removeChild(document.querySelector(`#todo-${TODOS[todoIndex].Id}`));
    TODOS.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(TODOS));
  } while (true);
});



// Funcion para obtener los todos del localstorage
(() => {
  let todos = localStorage.getItem('todos');
  if (!todos) {
    localStorage.setItem('todos', JSON.stringify([]));
    return;
  };

  // Si existen los todos renderizarlos
  todos = JSON.parse(todos);
  todos.forEach((todo) => createHTMLTodo(todo));
})();


btnsContainerFilter.addEventListener('click', eventFilterContainer);
