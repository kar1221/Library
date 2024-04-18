import "./styles/index.scss";
import Book from "./ts/Book";
import Library from "./ts/Library";

const newBookModal = document.querySelector(
  "#add-book-modal"
) as HTMLDialogElement;
const booksContainer = document.querySelector(
  "#card-container"
) as HTMLDivElement;
const submitButton = document.querySelector("#submit-btn") as HTMLButtonElement;
const cancelButton = document.querySelector("#cancel-btn") as HTMLButtonElement;
const bookTitle = document.querySelector("#book-title") as HTMLInputElement;
const bookAuthor = document.querySelector("#book-author") as HTMLInputElement;
const bookPages = document.querySelector("#book-pages") as HTMLInputElement;
const isRead = document.querySelector("#book-read") as HTMLInputElement;
const formTitle = document.querySelector(
  "#add-book-modal h3"
) as HTMLHeadElement;

const library = new Library();

// Modal Events
document.addEventListener("click", (ev) => {
  if (!(ev.target as HTMLElement).contains(newBookModal)) return;
  newBookModal.close();
});

document.addEventListener("keydown", (ev) => {
  if (ev.key === "Escape") {
    newBookModal.close();
  }
});

const addBookBtn = document.querySelector("#add-btn") as HTMLButtonElement;
addBookBtn.addEventListener("click", () => {
  newBookModal.showModal();
  resetForm();
});

cancelButton.addEventListener("click", () => {
  newBookModal.close();
});

submitButton.addEventListener("click", addBook);

document.addEventListener("DOMContentLoaded", restoreFromLocalStorage);

// Functions
function isDialogFormValid(): boolean {
  const bookTitle = document.querySelector("#book-title") as HTMLInputElement;
  const bookAuthor = document.querySelector("#book-author") as HTMLInputElement;
  const bookPages = document.querySelector("#book-pages") as HTMLInputElement;

  if (!bookTitle.value) return false;
  if (!bookAuthor.value) return false;
  if (!bookPages.value) return false;

  return true;
}

function retrieveBookFromForm(): Book {
  const newBook = new Book({
    title: bookTitle.value,
    author: bookAuthor.value,
    pages: Number(bookPages.value),
    isRead: isRead.checked,
  });

  return newBook;
}

function createCard(book: Book): void {
  const card = document.createElement("div") as HTMLDivElement;
  const title = document.createElement("h3") as HTMLHeadElement;
  const author = document.createElement("p") as HTMLParagraphElement;
  const pages = document.createElement("p") as HTMLParagraphElement;
  const buttonsContainer = document.createElement("div") as HTMLDivElement;
  const readButton = document.createElement("button") as HTMLButtonElement;
  const removeButton = document.createElement("button") as HTMLButtonElement;

  card.classList.add("card");
  buttonsContainer.classList.add("buttons-container");
  readButton.id = "read-btn";
  removeButton.id = "remove-btn";

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;

  if (book.isRead) {
    readButton.textContent = "Read";
    readButton.classList.add("active");
  } else {
    readButton.textContent = "Not Read";
  }

  removeButton.textContent = "Remove";

  readButton.addEventListener("click", toggleRead);
  removeButton.addEventListener("click", removeBook);

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);

  buttonsContainer.appendChild(readButton);
  buttonsContainer.appendChild(removeButton);

  card.appendChild(buttonsContainer);

  booksContainer.appendChild(card);
}

function addBook(event: Event): void {
  event.preventDefault();

  if (!isDialogFormValid()) {
    displayErrorMessage("Form is incompleted!");
    return;
  }

  const book = retrieveBookFromForm();
  if (library.isBookInLibrary(book)) {
    displayErrorMessage("Book is already in library!");
    return;
  }

  library.addBookToLibrary(book);
  saveToLocalStorage();
  updateBooksContainer();

  newBookModal.close();
  console.log(library.Books);
}

function resetForm(): void {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  isRead.checked = false;
  formTitle.textContent = "Add your book here!";
  formTitle.classList.remove("error");
}

function displayErrorMessage(message: string): void {
  formTitle.textContent = message;
  formTitle.classList.add("error");
}

function saveToLocalStorage(): void {
  localStorage.setItem("books", JSON.stringify(library.Books));
}

function restoreFromLocalStorage() {
  const localStorageItem = localStorage.getItem("books");
  if (!localStorageItem) {
    return;
  }
  const books = JSON.parse(localStorageItem) as Book[];
  console.log(books);
  books.forEach((book) => {
    library.addBookToLibrary(book);
  });

  updateBooksContainer();
}

function updateBooksContainer(): void {
  resetBooksContainer();

  for (const book of library.Books) {
    createCard(book);
  }
}

function resetBooksContainer(): void {
  const cards = booksContainer.querySelectorAll(
    ".card"
  ) as NodeListOf<HTMLDivElement>;

  cards.forEach((card) => {
    card.remove();
  });
}

function getTitleFromCard(event: Event): string {
  const targetButton = event.target as HTMLButtonElement;
  const buttonContainer = targetButton.parentNode as HTMLDivElement;
  const card = buttonContainer.parentNode as HTMLDivElement;

  const title = card.querySelector("h3") as HTMLHeadingElement;
  return title.textContent as string;
}

function removeBook(event: Event): void {
  const title = getTitleFromCard(event);

  library.removeBook(title);
  saveToLocalStorage();
  updateBooksContainer();
}

function toggleRead(event: Event): void {
  const title = getTitleFromCard(event);

  const book = library.bookLookup(title)!;

  book.isRead = !book.isRead;
  saveToLocalStorage();
  updateBooksContainer();
}
