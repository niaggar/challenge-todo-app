const btnsFilter = {
  All: document.querySelector('#filt-all'),
  Active: document.querySelector('#filt-active'),
  Completed: document.querySelector('#filt-completed'),
}


export const eventFilterContainer = (e) => {
  const FILTER = e.target.dataset.filter;
  window.sessionStorage.setItem('filter', FILTER);
  
  for (let btn in btnsFilter) btnsFilter[btn].classList.remove('active');
  renderFilter(FILTER)
}


export const renderFilter = (filter) => {
  switch (filter) {
    case 'all':
      renderAllTodos();
      break;
    
    case 'active':
      renderActiveTodos();
      break;
    
    case 'completed':
      renderCompletedTodos();
      break;
  }
}


export const renderAllTodos = () => {
  let count = 0;
  const TODOS = JSON.parse(localStorage.getItem('todos'));
  TODOS.forEach((todo) => {
    document
      .querySelector(`#todo-${todo.Id}`)
      .style
      .display = 'flex'
    if (!todo.State) count += 1;
  });
  btnsFilter.All.classList.add('active');
  document.querySelector('#todos-count').innerHTML = count;
}


export const renderActiveTodos = () => {
  let count = 0;
  const TODOS = JSON.parse(localStorage.getItem('todos'));
  TODOS.forEach((todo) => {
    if (todo.State) {
      document
        .querySelector(`#todo-${todo.Id}`)
        .style
        .display = 'none'
    } else {
      document
        .querySelector(`#todo-${todo.Id}`)
        .style
        .display = 'flex'
        count += 1;
    }
  });
  btnsFilter.Active.classList.add('active');
  document.querySelector('#todos-count').innerHTML = count;
}


export const renderCompletedTodos = () => {
  let count = 0;
  const TODOS = JSON.parse(localStorage.getItem('todos'));
  TODOS.forEach((todo) => {
    if (todo.State) {
      document
        .querySelector(`#todo-${todo.Id}`)
        .style
        .display = 'flex'
    } else {
      document
        .querySelector(`#todo-${todo.Id}`)
        .style
        .display = 'none'
      count += 1;
    }
  });
  btnsFilter.Completed.classList.add('active');
  document.querySelector('#todos-count').innerHTML = count;
}
