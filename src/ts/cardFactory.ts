export type BookData = {
    title: string,
    author: string,
    pages: number,
    read: boolean,
    id: number,
}

export default class Card {
    private title: string;
    private author: string;
    private pages: number;
    private read: boolean;
    private id: number;
    constructor(data: BookData) {
        this.title = data.title;
        this.author = data.author;
        this.pages = data.pages;
        this.read = data.read;
        this.id = data.id;
    }

    createCard(): HTMLElement {
        const card = document.createElement("div") as HTMLElement;

        return card;
    }
}