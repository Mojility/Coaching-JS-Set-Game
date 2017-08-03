import Board from '../../src/logic/board';
import Deck from '../../src/logic/deck';

describe("Board", () => {

  let deck = new Deck();

  let board;

  beforeEach(() => {
    const cards = Array(9).fill().map(() => deck.nextCard());
    board = new Board(3, 3, cards);
  });

  it("should have cards so we can play", () => {
    expect(board.cardAt(0, 0)).not.toBeNull();
  });

  it("should be able to replace a card", () => {
    let card = deck.nextCard();
    board.replaceCardAt(0, 0, card);
    expect(board.cardAt(0, 0)).toBe(card);
  });

});

