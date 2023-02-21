let toDoInput;
let addBtn;
let alertInfo;
let ulList;
let allTasks;
let newTask;
let idNumber = 0;
let popup;
let popupInfo;
let editedToDo;
let popupInput;
let addPopupBtn;
let closeToDoBtn;

const main = () => {
  prepareDOMElement();
  prepareDOMEvents();
}

const prepareDOMElement = () => {
  toDoInput = document.querySelector('.todo-input');
  addBtn = document.querySelector('.add-btn');
  alertInfo = document.querySelector('.alert-info');
  ulList = document.querySelector('.todo-list ul');
  allTasks = document.getElementsByTagName('li');
  popup = document.querySelector('.popup');
  popupInfo = document.querySelector('.popup-info');
  popupInput = document.querySelector('.popup-input');
  addPopupBtn = document.querySelector('.accept');
  closeToDoBtn = document.querySelector('.cancel');
} 

const prepareDOMEvents = () => {
  addBtn.addEventListener('click', addNewTask);
  toDoInput.addEventListener('keyup', enterCheck);
  ulList.addEventListener('click', checkClick);
  addPopupBtn.addEventListener('click', changeToDo);
  closeToDoBtn.addEventListener('click', closePopup);
}

const addNewTask = () => {
  if(toDoInput.value !== ''){
    idNumber++;
    newTask = document.createElement('li');
    newTask.innerText = toDoInput.value;
    newTask.setAttribute('id', `todo-${idNumber}`);
    ulList.appendChild(newTask);

    toDoInput.value = '';
    alertInfo.innerText = '';
    createToolsArea();
  } 
  else {
    alertInfo.innerText ='Wpisz treść zadania!';
  }
}

const enterCheck = (event) => {
  if (event.code === 'Enter'){
    addNewTask();
  }
}

const createToolsArea = () => {
  const toolsPanel = document.createElement('div');
  toolsPanel.classList.add('tools');
  newTask.appendChild(toolsPanel);

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete');
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit');
  editBtn.innerHTML = 'EDIT';

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.innerHTML = '<i class="fas fa-times"></i';

  toolsPanel.appendChild(completeBtn);
  toolsPanel.appendChild(editBtn);
  toolsPanel.appendChild(deleteBtn);
}

checkClick = (e) => {

  if (e.target.classList.value!== ''){
    if (e.target.closest('button').classList.contains('complete')){
      e.target.closest('li').classList.toggle('completed');
      e.target.closest('button').classList.toggle('completed');
    } else if (e.target.closest('button').classList.contains('edit')){
      editTask(e);
    } else if (e.target.closest('button').classList.contains('delete')){
      deleteTask(e);
    }
  }
}

const deleteTask = (e) => {
  const deleteToDo = e.target.closest('li');
  deleteToDo.remove();

  if (allTasks.length === 0){
    alertInfo.innerText ='Brak zadań na liście.';
  }
}

const editTask = (e) => {
  const oldToDo = e.target.closest('li').id;
  editedToDo = document.getElementById(oldToDo);
  popupInput.value = editedToDo.firstChild.textContent;

  popup.style.display = 'flex';
}

const changeToDo = () => {
  if (popupInput.value !== ''){
    editedToDo.firstChild.textContent = popupInput.value;
    popup.style.display = 'none';
    popupInfo.innerText = '';
  } else {
    popupInfo.innerText = 'Podaj treść zadania!';
  }
}

const closePopup = () => {
  popup.style.display = 'none';
  popupInfo.innerText = '';
}

document.addEventListener('DOMContentLoaded', main);