const getBookName = document.querySelector("#bookName");
const bookError = document.querySelector("#bookName + span.error");

const getAuthorName= document.querySelector("#author");
const authorError = document.querySelector("#author + span.error");

export const validateBook = function() {
    if (getBookName.validity.valid) {
        bookError.textContent = "";
        bookError.className = "error"; // removes active class
    } else {
        showError(getBookName, bookError);
        console.log(getBookName.validity)
        return false;
    }
}

export const validateAuthor = function() {
    if (getAuthorName.validity.valid) {
        authorError.textContent = "";
        authorError.className = "error"; // removes active class
    } else {
        showError(getAuthorName, authorError);
        console.log(getAuthorName.validity)
        return false;
    }
}

function showError(element, span) {
    if (element.validity.valueMissing) {
        // if empty
        span.textContent = "This can't be empty.";
    } else if (element.validity.tooShort) {
        span.textContent = `This should be at least ${element.minLength} characters; you entered ${element.value.length}.`;
    }
    // add active class
    span.className = "error active";
}