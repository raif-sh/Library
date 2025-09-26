// Initiate array to store all book objects
// const myLibrary = [];

const myLibrary = []

// Select html elements with form data
const getBookTitle = document.querySelector("#bookName");
const getAuthor = document.querySelector("#author");
const getPages = document.querySelector("#pages");
const getStatus = document.querySelector("#read");
const getFormDialog = document.querySelector("#formDialog");

// Select buttons for input
const addNewBookButton = document.querySelector("#addNewBook");
const openModalButton = document.querySelector("#openForm");

// Initiate constructor for book object
function Book(id, title, author, pages, read){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read;
    }
}

// Add read status method to book prototype
Book.prototype.toggleRead = function() {
    const states = ['want to read', 'reading', 'done'];
    const i = states.indexOf(this.read);
    this.read = i === -1 ? states[0] : states[(i + 1) % states.length];
}

// Function to add new book to library
function addBookToLibrary(e) {
    e.preventDefault()

    let newBook = new Book(
        crypto.randomUUID(), 
        getBookTitle.value, 
        getAuthor.value, 
        getPages.value, 
        getStatus.value
    )

    myLibrary.push(newBook);
    renderLibrary();
    getBookTitle.value = ''; 
    getAuthor.value = ''; 
    getPages.value = ''; 

    getFormDialog.close();

    console.log(myLibrary)
}

// Event listener for add new book button
openModalButton.addEventListener("click", function() {
    getFormDialog.showModal()
})

addNewBookButton.addEventListener("click", addBookToLibrary)


const container = document.getElementById("bookContainer");
const template = document.getElementById("bookRowTemplate");

// Create library container with books
function renderLibrary() {

  container.innerHTML = "";

  myLibrary.forEach(book => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".book-id").dataset.id = book.id;
    clone.querySelector(".title").textContent = book.title;
    clone.querySelector(".author").textContent = book.author;
    clone.querySelector(".pages").textContent = book.pages;
    clone.querySelector(".read").textContent = book.read;
    container.appendChild(clone);
  });
}

// Event listener for book button click
container.addEventListener("click", function(e) {
    if (e.target.closest('button.deleteBook')) {
        let button = e.target.closest('button.deleteBook')
        // select the row based on button clicked
        let row = button.closest('tr.book-id');
        const row_id = row.dataset.id;
        deleteBook(row_id)
    } else if (e.target.closest('button.toggleRead')) {
        let button = e.target.closest('button.toggleRead')
        let row = button.closest('tr.book-id');
        const row_id = row.dataset.id;
        updateBookStatus(row_id)
    } else return;
})

// To process a delete request
function deleteBook(data_id) {
    const idx = myLibrary.findIndex(b => b.id === data_id)
    if (idx > -1) {
        myLibrary.splice(idx, 1);
    }
    renderLibrary()

}

// To process a update read status request
function updateBookStatus(data_id) {
    const idx = myLibrary.findIndex(b => b.id === data_id)
    myLibrary[idx].toggleRead();
    console.log(myLibrary[idx])
    renderLibrary()

}

renderLibrary();
