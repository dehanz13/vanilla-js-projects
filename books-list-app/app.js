//VARIABLES
let bookForm = document.querySelector("#book-form"),
  bookTitle = document.querySelector("#title"),
  bookAuthor = document.querySelector("#author"),
  tableBody = document.querySelector("#book-list");

let error = true; // Initially, both fields are blank

//EVENT LISTENERS
bookTitle.addEventListener("blur", validation);
bookAuthor.addEventListener("blur", validation);
bookForm.addEventListener("submit", addBookToList);
tableBody.addEventListener("click", removeBook);
document.addEventListener("DOMContentLoaded", init);

//FUNCTIONS
function validation() {
  if (this.value != "") {
    this.className = "form-control is-valid";
    error = false;
  } else {
    this.className = "form-control is-invalid";
    error = true;
    this.nextElementSibling.className = "invalid-feedback";
    this.nextElementSibling.textContent = "This field cannot be empty.";
  }
}

function addBookToList(e) {
  e.preventDefault();
  // check if error is false/true
  if (error == false) {
    // if error is false, then create the <tr> element for the new books,
    let title = bookTitle.value;
    let author = bookAuthor.value;

    let tr = document.createElement("tr");
    tr.innerHTML = `
			<td>${title}</td>
			<td>${author}</td>
			<td><a href="#" class="btn btn-danger btn-sm">X</a></td>
		`;
    // append it to the table list (body)
    tableBody.appendChild(tr);
    // reset the form, so user can enter new books
    bookForm.reset();

    bookTitle.className = "form-control";
    bookAuthor.className = "form-control";
    // lastly, add that book to the local storage with the title and author values
    addBookToLocalStorage(title, author);
  }
}

function removeBook(e) {
  // to remove a book, get/target the element with btn-danger specifically
  if (e.target.classList.contains("btn-danger")) {
    // console.log(e.target.parentElement); // Element (delete btn inside <td>): <td><a>X</a></td>
    // console.log(e.target.parentElement.parentElement); // Element (whole table row): <tr> <td>${title}</td> ... <td><a>X</a></td></tr>
    // console.log(e.target.parentElement.parentElement.firstElementChild); // El: <td>${title}</td>
    // console.log(
    //   e.target.parentElement.parentElement.firstElementChild.textContent
    // ); // El: ${title}

    // then remove it from Local Storage
    removeBookFromLocalStorage(
      e.target.parentElement.parentElement.firstElementChild.textContent
    );
    // lastly, remove it from the DOM
    e.target.parentElement.parentElement.remove();
  }
}

function getBooksFromLocalStorage() {
  // check if books are stored in local storage
  if (localStorage.getItem("books") == null) {
    // if no books are stored, set books with an empty array
    localStorage.setItem("books", "[]");
    // then return that empty array after parsing it.
    return JSON.parse(localStorage.getItem("books"));
  } else {
    // otherwise, if books are stored in local storage, parse the books and return it.
    return JSON.parse(localStorage.getItem("books"));
  }
}

function removeBookFromLocalStorage(name) {
  // parse books from local storage
  let books = JSON.parse(localStorage.getItem("books"));
  // iterate through each books, and check if the book name from localStorage matches the name to-be deleted.

  books.forEach((book, index) => {
    // if the names match, remove that book
    if (book.book === name) {
      books.splice(index, 1);
    }
  });
  // then set the remaining books back in local storage
  localStorage.setItem("books", JSON.stringify(books));
}

function addBookToLocalStorage(bookName, authorName) {
  // create an object with keys & values to store in local storage
  let obj = {
    book: bookName,
    author: authorName,
  };
  // assign getter function to add new objects to local storage.
  let ls = getBooksFromLocalStorage();
  // then push the new book object to the new variable that contains the parsed books from local storage, if any books exist at all.
  ls.push(obj);
  // then convert the books object to string and set the books with the new added book object back to the local storage
  localStorage.setItem("books", JSON.stringify(ls));
}

function checkLocalStorage() {}

function sortBooks() {}

function init() {
  bookTitle.focus();
  let books = getBooksFromLocalStorage();

  console.log(books);
  books.forEach(function (book) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${book.book}</td>
            <td>${book.author}</td>
            <td><a href="#" class="btn btn-danger btn-sm">X</a></td>
        `;
    tableBody.appendChild(tr);
  });
}
