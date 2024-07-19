const newBookBtn = document.getElementById("new-book-btn");
const newBookForm = document.getElementById("new-book-form");

const AddNewBookBtn = document.getElementById("add-new-book-btn");
const newBookTitle = document.getElementById("title");
const newBookAuthor = document.getElementById("author"); 


newBookBtn.addEventListener("click", showHide);
function showHide() {
    if (newBookForm.style.visibility === "hidden"){
        newBookForm.style.visibility = "visible";
    }
    else {
        newBookForm.style.visibility = "hidden";
    }
};


let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];

function Book(name, author) {
    this.name = name;
    this.author = author;
    this.id = generateUniqueID();
}

function generateUniqueID() {
    return "id-" + Date.now() + "-" + Math.floor(Math.random()*1000);
}


AddNewBookBtn.addEventListener("click", addBookToLibrary);

function addBookToLibrary(event) {
    event.preventDefault();
    let newBook = new Book (newBookTitle.value, newBookAuthor.value);  
    myLibrary.push(newBook);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    
    displayBook(newBook);

    newBookTitle.value = "";
    newBookAuthor.value = "";
}


myLibrary.forEach(displayBook);
    
function displayBook(book) {
    const newDiv = document.createElement("div");
    const newBtn = document.createElement("button");
    const newPara = document.createElement("p");

    newDiv.classList.add("displayed-item");

    newDiv.setAttribute("data-id", book.id);
    
    newBtn.classList.add("displayed-item-btn");

    newBtn.addEventListener("click", function () {
        removeBook(newDiv, book.id);
    });

    newDiv.appendChild(newBtn);
    newDiv.appendChild(newPara);
    document.body.appendChild(newDiv);

    newPara.textContent = `${book.name}, ${book.author}`;
    newBtn.textContent = " X ";

}


function removeBook(newDiv, bookId){
    newDiv.remove();
    myLibrary = myLibrary.filter(book => book.id != bookId);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

}

