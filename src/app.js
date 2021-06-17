const todoTemplate = document.querySelector('#todo-template');
const todoContainer = document.querySelector('#todo-container');
const newTodoName = document.querySelector('#todo-name');
const deleteCompleted = document.querySelector('#clear-completed');

let TODOS;

// Funcion para crear y renderizar los todos
function createTodo({ Id, Text, State }) {
  if (!Id) Id = Math.floor(Math.random() * Date.now());
  if (!State) State = false;

  // Clona un nuevo todo tomando como base el template
  const newTodo = todoTemplate.content.cloneNode(true);

  // Establece el ID unico de cada todo junto con su contenido
  newTodo.querySelector('.todo').setAttribute('id', `todo-${Id}`);
  newTodo.querySelector('p').innerHTML = Text;

  // Establece el estado del check del todo
  const todoCheck = newTodo.querySelector('#todo-check');
  todoCheck.checked = State;
  if (State) newTodo.querySelector('.todo').classList.add('completed');

  // Agrega el evento para detectar el cambio del check
  todoCheck.addEventListener('change', () => {
    // Dependiendo del estado actual del check agrega/retira la clase de completado
    // y almacena el nuevo estado del todo
    if (todoCheck.checked === true) {
      document.querySelector(`#todo-${Id}`).classList.add('completed');
      TODOS.map((todo) => {
        if (todo.Id === Id) todo.State = true;
        return todo;
      });
      localStorage.setItem('todos', JSON.stringify(TODOS));
    } else {
      document.querySelector(`#todo-${Id}`).classList.remove('completed');
      TODOS.map((todo) => {
        if (todo.Id === Id) todo.State = false;
        return todo;
      });
      localStorage.setItem('todos', JSON.stringify(TODOS));
    }
  });

  const todoDelete = newTodo.querySelector('#todo-delete');

  // Agrega el evento para eliminar el todo
  todoDelete.addEventListener('click', () => {
    // Determina la posicion del todo en la lista de TODOS
    const todoIndex = TODOS.findIndex((todo) => todo.Id === Id);
    if (todoIndex === -1) return;

    // Elimina el todo de la lista y de la web
    TODOS.splice(todoIndex, 1);
    todoContainer.removeChild(document.querySelector(`#todo-${Id}`));

    // Guarda nuevamente los datos
    localStorage.setItem('todos', JSON.stringify(TODOS));
  });

  // Agrega el todo a la web y a la lista temporal de todos los todos
  todoContainer.appendChild(newTodo);
  TODOS.push({ Id, Text, State });

  // Almacena todos los todos
  localStorage.setItem('todos', JSON.stringify(TODOS));
}

// Evento para detectar la creacion de un nuevo todo
newTodoName.addEventListener('keyup', (e) => {
  if (e.key !== 'Enter' || newTodoName.value.length < 3) return;
  const textTodo = newTodoName.value;
  newTodoName.value = '';

  createTodo({ Text: textTodo });
});

deleteCompleted.addEventListener('click', () => {
  let exist = true;
  do {
    const todoIndex = TODOS.findIndex((todo) => todo.State === true);
    if (todoIndex === -1) {
      exist = false;
      return;
    }

    // Elimina el todo de la lista y de la web
    todoContainer.removeChild(document.querySelector(`#todo-${TODOS[todoIndex].Id}`));
    TODOS.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(TODOS));
  } while (exist);
});

// Funcion para obtener los todos del localstorage
(() => {
  let todos = localStorage.getItem('todos');
  TODOS = [];
  if (!todos) return;

  // Si existen los todos renderizarlos
  todos = JSON.parse(todos);
  todos.forEach((todo) => createTodo(todo));
})();
