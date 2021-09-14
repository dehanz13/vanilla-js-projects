// VARIABLES
let todoItems = document.getElementById("todo-items"),
  todoInput = document.getElementById("todo-input"),
  todoSearch = document.getElementById("todo-search"),
  todoForm = document.getElementById("todo-form");

// EVENT LISTENERS
todoItems.addEventListener("click", removeItem);
todoForm.addEventListener("submit", addTodo);
todoSearch.addEventListener("keyup", searchTodo);
document.addEventListener("DOMContentLoaded", loadItems);

// FUNCTIONS
function addTodo(e) {
  e.preventDefault();

  // get input value
  let todo = todoInput.value;

  // check, if todo is not empty
  if (todo != "") {
    // create a list item
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = todo;

    // create delete 'X' button and append it to li
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm float-end";
    deleteBtn.textContent = "X";
    li.appendChild(deleteBtn);

    // append the todo item to the list
    todoItems.appendChild(li);
    todoForm.reset();

    // add todo item to localStorage array
    addToLocalStorage(todo);
    checkLocalStorage();
  }
}

function removeItem(e) {
  // check if list item has a delete "X" button
  if (e.target.classList.contains("btn")) {
    // assign item to the parent element, which is the whole li element
    let item = e.target.parentElement;
    // remove item from local storage
    removeFromLocalStorage(item);
    // remove item from DOM
    item.remove();
  }
}

function searchTodo() {
  // get the input value and convert it to upper case
  let searchInput = todoSearch.value.toUpperCase();
  let items = todoItems.getElementsByTagName("li");
  // loop through each item in the array of todoItems
  for (let i = 0; i < items.length; i++) {
    // convert the text content to uppercase to match the search input
    let val = items[i].textContent.toUpperCase();
    // check if both text content are equal.
    if (val.indexOf(searchInput) != -1) {
      // if yes, only display the matched items
      items[i].style.display = "block";
    } else {
      // else don't display
      items[i].style.display = "none";
    }
  }
}

function addToLocalStorage(todo) {
  // get todo items from local storage
  let storageItems = getFromLocalStorage();
  // push new todo item to storageItems array
  storageItems.push(todo);
  // add items to array in local storage
  localStorage.setItem("todo", JSON.stringify(storageItems));
}

function getFromLocalStorage() {
  let items = localStorage.getItem("todo");

  // check if there are no todos
  if (items === null) {
    items = [];
  } else {
    // if there are any todo, parse todo item
    items = JSON.parse(items);
  }
  // return todos
  return items;
}

function removeFromLocalStorage(todo) {
  let liValue = todo.firstChild.textContent;
  let storageArray = getFromLocalStorage();
  // iterate each todos in array from local storage and check if todo = deleted todo
  storageArray.forEach(function (item, index) {
    if (item === liValue) {
      // splice item on index
      storageArray.splice(index, 1);
      localStorage.setItem("todo", JSON.stringify(storageArray));
    }
    checkLocalStorage();
  });
}

// Load todo items from localStorage
function loadItems() {
  todoInput.focus();
  let items = getFromLocalStorage();
  checkLocalStorage();
  if (items != "") {
    items.forEach((item, index) => {
      let li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = item;

      let deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger btn-sm float-end";
      deleteBtn.textContent = "X";

      li.appendChild(deleteBtn);
      todoItems.appendChild(li);
    });
  }
}

function checkLocalStorage() {
  let arr = getFromLocalStorage();
  // check if array is empty
  if (arr.length != 0) {
    todoItems.parentElement.style.display = "block";
  } else {
    todoItems.parentElement.style.display = "none";
  }
}
