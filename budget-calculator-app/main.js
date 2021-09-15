// VARIABLES
let initialForm = document.querySelector("#initial-form"),
  enterBudget = document.querySelector("#enter-budget"),
  budgetBtn = document.querySelector("#budget-btn"),
  firstMessage = document.getElementById("first-message"),
  secondForm = document.querySelector("#second-form"),
  expenseName = document.querySelector("#expense-name"),
  expenseAmount = document.querySelector("#expense-amount"),
  addBtn = document.querySelector("#add-btn"),
  secondMessage = document.getElementById("second-message"),
  myBudget = document.querySelector("#my-budget"),
  remainingBudget = document.querySelector("#remaining"),
  expenseList = document.querySelector("#list");

let budget;

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  enterBudget.focus();
});
initialForm.addEventListener("submit", init);
secondForm.addEventListener("submit", addExpense);

// FUNCTIONS

// Helper function to create an element with attributes
function tag(name, attrs) {
  var el = document.createElement(name.toString());

  !!attrs &&
    Object.keys(attrs).forEach(function (key) {
      el.setAttribute(key, attrs[key]);
    });

  return el;
}

function init(e) {
  e.preventDefault();
  budget = enterBudget.value;
  if (budget !== "") {
    enableForm();
    expenseName.focus();
    myBudget.textContent = budget;
    remainingBudget.textContent = budget;
  } else {
    firstMessage.textContent = "Please Enter Your Budget First.";
    setTimeout(() => {
      firstMessage.style.display = "none";
    }, 3000);
  }
}

function enableForm() {
  expenseName.disabled = false;
  expenseAmount.disabled = false;
  addBtn.disabled = false;
  initialForm.parentElement.style.display = "none";
}

function addExpense(e) {
  e.preventDefault();
  let name = expenseName.value,
    amount = expenseAmount.value;

  secondForm.reset();
  expenseName.focus();
  addToList(name, amount);
  updateBudget(amount);
}

function addToList(item, value) {
  if (item != "" && value != "") {
    let li = document.createElement("li");
    let span = document.createElement("span");

    li.className = "list-group-item";
    span.className = "badge bg-info text-dark";
    // Problem: class needs to be a string but upon saving, it changes back to non string. So li won't be displayed.
    // let li = tag("li", { class: "list-group-item" });
    // let span = tag("span", { class: "badge  bg-info text-dark" });
    span.textContent = " $" + value;
    li.textContent = item;

    li.appendChild(span);
    expenseList.appendChild(li);
  }
}

function updateBudget(expense) {
  let total = budget - expense;
  budget = total;
  remainingBudget.textContent = budget;
  checkBudget(budget);
}

function checkBudget(budget) {
  let initialBudget = Number(myBudget.textContent);
  console.log(initialBudget);
  if (budget <= 0.5 * initialBudget) {
    remainingBudget.parentElement.className = "bg-warning";
  }
  if (budget <= 0.25 * initialBudget) {
    remainingBudget.parentElement.className = "bg-danger";
  }
  if (budget <= 0) {
    remainingBudget.parentElement.className = "bg-danger";
    secondMessage.textContent = "You have used all of your budget.";
  }
}
