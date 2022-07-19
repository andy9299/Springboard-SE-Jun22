const form = document.querySelector('#addTodo');
const task = document.querySelector("input[name='task']");
const todoList = document.querySelector('#todoList');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const newTask = document.createElement('li');
  const removeButton = document.createElement('button');
  removeButton.innerText = 'x';
  newTask.innerText = task.value;
  todoList.appendChild(newTask);
  newTask.prepend(removeButton);
  form.reset();
});
todoList.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    e.target.parentElement.remove();
  }
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('done');
  }
});
