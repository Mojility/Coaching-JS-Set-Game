import Board from './board';

export default class Game {

  constructor(matcher, deck) {
    this.deck = deck;
    this.matcher = matcher;
    this.picks = [];
    this.score = 0;
    this.board = this.createBoard(deck);
  }

  createBoard(deck) {
    let cards = Array(9).fill().map(() => deck.nextCard());
    return new Board(3, 3, cards);
  }

  pickCard(x, y) {
    if (this.hasAlreadyPicked(x, y)) throw new Error("duplicate pick");
    if (this.picks.length >= 3) throw new Error("too many picks");

    this.picks.push({ x: x, y: y });

    if (this.picks.length == 3) this.checkForMatch();
  }

  hasAlreadyPicked(x, y) {
    var found = false;
    this.picks.forEach(pick => {
      if (pick.x == x && pick.y == y)
        found = true;
    });
    return found;
  }

  checkForMatch() {
    let cards = [];
    this.picks.forEach(pick => {
      cards.push(this.board.cardAt(pick.x, pick.y));
    });
    if (this.matcher.isMatchedSet(cards[0], cards[1], cards[2])) {
      this.picks.forEach(
        pick => this.board.replaceCardAt(pick.x, pick.y, this.deck.nextCard())
      );

      this.score += 1;
    }
  }

}
