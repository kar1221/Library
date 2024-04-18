import Book from "./Book";

class Library {
  Books: Book[];
  constructor() {
    this.Books = [];
  }

  addBookToLibrary(newBook: Book): void {
    if (this.isBookInLibrary(newBook)) return;

    this.Books.push(newBook);
  }

  isBookInLibrary(newBook: Book): boolean {
    return this.Books.some((book) => book.title === newBook.title);
  }

  bookLookup(bookTitle: string): Book | undefined {
    return this.Books.find((book) => book.title === bookTitle);
  }

  removeBook(bookTitle: string): void {
    const target = this.Books.findIndex((book) => book.title === bookTitle);
    this.Books.splice(target, 1);
  }
}

export { Library as default };
