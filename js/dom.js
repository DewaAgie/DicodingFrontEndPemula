const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos"
const TODO_ITEMID = "itemId";

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById(UNCOMPLETED_LIST_TODO_ID).append(makeTodo("Tugas Web", '2021-07-10'))
})

function addTodo(){
  const uncompletedTodoList = document.getElementById(UNCOMPLETED_LIST_TODO_ID)
  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;

  const todo = makeTodo(title, date);
  const todoObject = composeTodoObject(title, date, false);

  todo[TODO_ITEMID] = todoObject.id;
  todos.push(todoObject);
  uncompletedTodoList.append(todo);

  updateDataToStorage();
}

function makeTodo(data, timestamp, isCompleted = false){
  const textTitle = document.createElement('h2')
  textTitle.innerText = `${data}`;

  const textTimestamp = document.createElement("p")
  textTimestamp.innerText = `${timestamp}`

  const textContainer = document.createElement("div")
  textContainer.classList.add("inner")
  textContainer.append(textTitle, textTimestamp)

  const container = document.createElement('div')
  container.classList.add('item', 'shadow')
  container.append(textContainer)

  if(isCompleted){
    container.append(
      createUndoButton(),
      createTrashButton()
    )
  } else{
    container.append(createCheckButton())
  }
  return container;
}

function createButton(buttonTypeClass, eventListener){
  const button = document.createElement("button")
  button.classList.add(buttonTypeClass)
  button.addEventListener("click", function(event){
    eventListener(event)
  })
  return button;
}

function addTaskToCompleted(taskElement){
  const taskTitle = taskElement.querySelector('.inner > h2').innerText
  const taskTimestamp = taskElement.querySelector('.inner > p').innerText

  const newTodo = makeTodo(taskTitle, taskTimestamp, true)
  const todo = findTodo(taskElement[TODO_ITEMID]);
  todo.isCompleted = true;
  newTodo[TODO_ITEMID] = todo.id;

  const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID)
  listCompleted.append(newTodo)
  taskElement.remove();

  updateDataToStorage();
}

function createCheckButton(){
  return createButton("check-button", function(event){
    addTaskToCompleted(event.target.parentElement);
  })
}

function removeTaskCompleted(taskElement){
  const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
  todos.splice(todoPosition, 1);

  taskElement.remove();

  updateDataToStorage();
}

function createTrashButton(){
  return createButton("trash-button", function(event){
    removeTaskCompleted(event.target.parentElement)
  })
}

function undoTaskFromCompleted(taskElement){
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID)
  const taskTitle = taskElement.querySelector('.inner > h2').innerText
  const taskTimestamp = taskElement.querySelector('inner > p').innerText
  
  const newTodo = makeTodo(taskTitle, taskTimestamp, false);

  const todo = findTodo(taskElement[TODO_ITEMID]);
  todo.isCompleted = false;
  newTodo[TODO_ITEMID] = todo.id;

  listUncompleted.append(newTodo)
  taskElement.remove();

  updateDataToStorage();
}

function createUndoButton(){
  return createButton("undo-button", function(e){
    undoTaskFromCompleted(e.target.parentElement)
  })
}