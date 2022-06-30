const form = document.querySelector('#addTodo')
const task = document.querySelector("input[name='task']")
const todoList = document.querySelector('#todoList')

const storedTodoList = JSON.parse(localStorage.getItem('storedTodoList')) || []
for (let i = 0; i < storedTodoList.length; i++) {
  const newTask = document.createElement('li')
  const removeButton = document.createElement('button')
  removeButton.innerText = 'x'
  newTask.innerText = storedTodoList[i].task
  newTask.isCompleted = storedTodoList[i].isCompleted
  if (newTask.isCompleted) {
    newTask.classList.toggle('done')
  }
  todoList.appendChild(newTask)
  newTask.prepend(removeButton)
}

function indexOf(str) {
  return (index = storedTodoList
    .map(function (t) {
      return t.task
    })
    .indexOf(str))
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  if (indexOf(task.value) != -1) {
    form.reset()
    alert('Duplicate Task!')
  } else if (task.value == '') {
    alert('Empty Task!')
  } else {
    //create element and add to list
    const newTask = document.createElement('li')
    const removeButton = document.createElement('button')
    removeButton.innerText = 'x'
    newTask.innerText = task.value
    newTask.isCompleted = false
    //add to local storage
    storedTodoList.push({ task: newTask.innerText, isCompleted: false })
    localStorage.setItem('storedTodoList', JSON.stringify(storedTodoList))
    form.reset()
    //add onto list
    todoList.appendChild(newTask)
    newTask.prepend(removeButton)
  }
})

todoList.addEventListener('click', function (e) {
  const task = e.target
  if (task.tagName === 'BUTTON') {
    task.parentElement.remove()
    let taskString = task.parentElement.innerText.substring(1)
    storedTodoList.splice(indexOf(taskString), 1)
    localStorage.setItem('storedTodoList', JSON.stringify(storedTodoList))
  }
  if (task.tagName === 'LI') {
    task.classList.toggle('done')
    task.isCompleted = !task.isCompleted
    let taskString = task.innerText.substring(1)
    storedTodoList[indexOf(taskString)].isCompleted = !storedTodoList[
      indexOf(taskString)
    ].isCompleted
    localStorage.setItem('storedTodoList', JSON.stringify(storedTodoList))
  }
})
