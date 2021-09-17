/*
===============
CLASSES
===============
*/
// BOOK CLASS: This class represents the book
class Book {
  constructor(bookName, bookAuthor) {
    this.title = bookName;
    this.author = bookAuthor;
  }
}

// UI CLASS: This class will handle the UI tasks, add book to the list, remove book from the list, show alerts
class UI {
  // we are using static so we don't have to re-instantiate the UI everytime we display the books

  static displayBooks() {
    let storedBooks = Store.getBooks();
    storedBooks.forEach((book) => {
      UI.addBookToList(book);
    });
  }

  static addBookToList(book) {
    let tbody = document.getElementById("book-list");
    let element = document.createElement("tr");
    let template = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td><a href="#" class="btn btn-danger btn-sm">X</a></td>
		`;
    element.innerHTML = template;
    tbody.appendChild(element);
  }

  static showAlert(message, type) {
    let div = document.createElement("div");
    div.className = `alert alert-${type}`;
    // div.textContent = message;
    div.appendChild(document.createTextNode(message));
    let alert = document.getElementById("alert");
    alert.appendChild(div);
    setTimeout(() => {
      // alert.removeChild(div);
      alert.textContent = "";
    }, 3000);
  }
}

// STORE CLASS: This class will handle the books storage (store, remove, get from local storage)
class Store {
  static getBooks() {
    let books = localStorage.getItem("books");
    if (books === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addToLocalStorage(book) {
    let books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeFromLocalStorage(bookName) {
    let books = Store.getBooks();
    books.forEach((item, index) => {
      if (item.title === bookName) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
/*
===============
EVENT LISTENERS
===============
*/

// EVENT: Display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// EVENT: Add a new book by instantiating it
document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let bookTitle = document.getElementById("title").value;
  let bookAuthor = document.getElementById("author").value;

  if (bookTitle == "" || bookAuthor == "") {
    UI.showAlert("This field cannot be empty", "danger");
    document.getElementById("book-form").reset();
  } else {
    // here we instantiate the new book
    let newBook = new Book(bookTitle, bookAuthor);
    Store.addToLocalStorage(newBook);
    UI.addBookToList(newBook);
    UI.showAlert(`New Book: "${bookTitle}" Added!`, "success");
    document.getElementById("book-form").reset();
  }
});

// EVENT: Remove a book
document.getElementById("book-list").addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-danger")) {
    let bookName =
      e.target.parentElement.parentElement.firstElementChild.textContent;
    Store.removeFromLocalStorage(bookName);
    e.target.parentElement.parentElement.remove();
    UI.showAlert(`Book: "${bookName}" Removed!`, "success");
  }
});
