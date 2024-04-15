import { BookData } from "./cardFactory";
import Card from "./cardFactory";

enum State {
    add,
    remove
}

export default class Library {
  private library: BookData[];
  private container: HTMLElement;
  constructor(cardContainer: HTMLElement) {
    this.library = [];
    this.container = cardContainer;
  }

  addBookToLibrary(data: BookData) {
    this.library.push(data);
  }

  private Render(newLibrary: BookData[], mode: State) {
    let different = this.library
      .filter((x) => !newLibrary.includes(x))
      .concat(newLibrary.filter((x) => !this.library.includes(x)));

      if(mode === State.add) {
        different.forEach(x => {
            const card = new Card(x).createCard();
            this.container.appendChild(card);
        })
      }

      if (mode === State.remove) {
        // TODO
      }
  }
}
