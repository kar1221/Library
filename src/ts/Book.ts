type BookData = {
  title: string;
  author: string;
  pages: number;
  isRead: boolean;
};

class Book {
  title: string;
  author: string;
  pages: number;
  isRead: boolean;

  constructor(data: BookData) {
    this.title = data.title;
    this.author = data.author;
    this.pages = data.pages;
    this.isRead = data.isRead;
  }
}

export { Book as default };
