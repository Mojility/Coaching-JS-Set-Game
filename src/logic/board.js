export default class Board {

  constructor(width, height, cards) {
    this.width = width;
    this.height = height;
    this.cards = cards;
  }

  cardAt(x, y) {
    return this.cards[this.calculatePosition(x, y)];
  }

  replaceCard(original, replacement) {
    var i = this.cards.indexOf(original);
    if (i >= 0) {
      this.cards[i].attributes = replacement.attributes;
    }
  }

  replaceCardAt(x, y, card) {
    this.cards[this.calculatePosition(x, y)] = card;
  }

  calculatePosition(x, y) {
    return y * this.width + x;
  }

}
