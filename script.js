const newBookBtn = document.getElementById("new-book-btn");
const newBookForm = document.getElementById("new-book-form");

const AddNewBookBtn = document.getElementById("add-new-book-btn");
const newBookTitle = document.getElementById("title");
const newBookAuthor = document.getElementById("author"); 



newBookBtn.addEventListener("click", () => {
    if (newBookForm.style.visibility === "hidden"){
        newBookForm.style.visibility = "visible";
    }
    else {
        newBookForm.style.visibility = "hidden";
        
    }
});



function Book(name, author) {
    this.name = name;
    this.author = author;
}


const catch22 = new Book ("Catch 22", "Joseph Heller");
const behave = new Book ("Behave: The Biology of Humans at Our Best and Worst", "Robert Sapolsky");
const theStranger = new Book ("The stranger", "Albert Camus");


AddNewBookBtn.addEventListener("click", addBookToLibrary);

function addBookToLibrary (event){
    event.preventDefault();
    let newBook = new Book (newBookTitle.value, newBookAuthor.value);
    myLibrary.push(newBook);
    displayBook(newBook);
    newBookTitle.value = "";
    newBookAuthor.value = "";

    console.log(myLibrary);
}


const myLibrary = [catch22, behave, theStranger];

myLibrary.forEach(displayBook);
    
function displayBook (book){
    const newPara = document.createElement("p");
    document.body.appendChild(newPara);
    newPara.textContent = `${book.name}, ${book.author}`;
}
