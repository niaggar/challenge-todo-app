import { renderFilter } from './filter-functions.js'


export const eventChangeCheck = (element, Id, text) => {
  const TODOS = JSON.parse(localStorage.getItem('todos'));
  const state = element.checked
  
  if ((state && !text) || (!state && text)) {
    document.querySelector(`#todo-${Id}`).classList.add('completed');
    TODOS.map((todo) => todo.State = todo.Id === Id ? true : todo.State );
    localStorage.setItem('todos', JSON.stringify(TODOS));

  } else {
    document.querySelector(`#todo-${Id}`).classList.remove('completed');
    TODOS.map((todo) => todo.State = todo.Id === Id ? false : todo.State );
    localStorage.setItem('todos', JSON.stringify(TODOS));
  }

  if (text) element.checked = !state;

  const FILTER = window.sessionStorage.getItem('filter');
  renderFilter(FILTER);
}
