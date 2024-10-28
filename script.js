const parentContainer = document.querySelector(".parent-container")
const newBookBtn = document.getElementById("new-book-btn");
const newBookForm = document.getElementById("new-book-form");
const AddNewBookBtn = document.getElementById("add-btn");
const newBookTitle = document.getElementById("title");
const newBookAuthor = document.getElementById("author"); 

// toggle visibility
newBookBtn.addEventListener("click", showHide);
function showHide() {
    const currentVisibility = window.getComputedStyle(newBookForm).visibility;
    if (currentVisibility === "hidden") {
        newBookForm.style.visibility = "visible";
    }
    else {
        newBookForm.style.visibility = "hidden";
    }
};



// retrieve saved data 
let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];


// object
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
    const removeBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const newPara = document.createElement("p");

    newDiv.classList.add("displayed-item");

    newDiv.setAttribute("data-id", book.id);
    
    newDiv.appendChild(removeBtn);
    newDiv.appendChild(editBtn);
    newDiv.appendChild(newPara);
    parentContainer.appendChild(newDiv);

    newPara.textContent = `${book.name}, ${book.author}`;
    removeBtn.textContent = " X ";
    editBtn.textContent = "edit";


    removeBtn.addEventListener("click", function() {
        removeBook(newDiv, book.id);
    });

    editBtn.addEventListener("click", function() {
        editBook(newDiv, newPara, book);
    });
}

function editBook(newDiv, newPara, book) {
 
    const newInput = document.createElement("input");
    newInput.value = newPara.textContent;
    newDiv.appendChild(newInput);
    
    const paraCheck = newDiv.querySelector("p");
    if (paraCheck) {
        paraCheck.remove();
    }

    newInput.focus();


    newInput.addEventListener("blur", function() {
        const inputText = newInput.value;
        const [newTitle, newAuthor] = inputText.split(",").map(item => item.trim());

        book.name = newTitle;
        book.author = newAuthor;

        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

        const updatedPara = document.createElement("p");
        updatedPara.textContent = `${newTitle}, ${newAuthor}`;
        newDiv.appendChild(updatedPara);

        newInput.remove();

           
    });

    newInput.addEventListener("keyup", function(event) {
        if(event.key === "Enter") {
            newInput.blur();
        }
    })
}

function removeBook(newDiv, bookId){
    newDiv.remove();
    myLibrary = myLibrary.filter(book => book.id != bookId);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

}

