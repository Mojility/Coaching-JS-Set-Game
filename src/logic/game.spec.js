import Game from '../../src/logic/game';
import Card from '../../src/logic/card';
import Matcher from '../../src/logic/matcher';

describe("Game", () => {

  var game;

  describe("with AllTheSameCards", () => {

    class AllTheSameDeck {
      nextCard() {
        return new Card(0, 0, 0, 0);
      }
    }

    beforeEach(() => {
      game = new Game(new Matcher(), new AllTheSameDeck());
    });

    it("should have no pick when newly created", () => {
      expect(game.hasAlreadyPicked(0, 0)).toBeFalsy();
    });

    it("should recognize if a card has been picked", () => {
      game.pickCard(0, 0);
      expect(game.hasAlreadyPicked(0, 0)).toBeTruthy();
    });

    it("should let a player pick a card", () => {
      it("should not let a player pick the same card twice", () => {
        expect(() => {
          game.pickCard(0, 0);
        }).not.toThrow(new Error("duplicate pick"));
      });
    });

    it("should not let a player pick the same card twice", () => {
      expect(() => {
        game.pickCard(0, 0);
        game.pickCard(0, 0);
      }).toThrow(new Error("duplicate pick"));
    });

    it("should let the player pick three cards", () => {
      game.pickCard(0, 0);
      game.pickCard(0, 1);
      game.pickCard(0, 2);
      expect(game.hasAlreadyPicked(0, 0)).toBeTruthy();
      expect(game.hasAlreadyPicked(0, 1)).toBeTruthy();
      expect(game.hasAlreadyPicked(0, 2)).toBeTruthy();
    });

    it("should not let the player pick more than three cards", () => {
      expect(() => {
        game.pickCard(0, 0);
        game.pickCard(0, 1);
        game.pickCard(0, 2);
        game.pickCard(1, 0);
      }).toThrow(new Error("too many picks"));
    });

    it("should have a zero score on new game", () => {
      expect(game.score).toBe(0);
    });

    it("should increment score on a good match", () => {
      game.pickCard(0, 0);
      game.pickCard(0, 1);
      game.pickCard(0, 2);
      expect(game.score).toBe(1);
    });

  });

  describe("with sample deck 1", () => {

    let newCard = new Card(0, 1, 2, 3);

    class SampleDeck {
      constructor() {
        this.index = 0;
        this.cards = [
          new Card(0, 0, 0, 0),
          new Card(1, 1, 1, 1),
          new Card(2, 2, 2, 2),

          new Card(0, 0, 0, 0),
          new Card(1, 1, 1, 1),
          new Card(2, 2, 2, 2),

          new Card(0, 0, 0, 0),
          new Card(1, 1, 1, 1),
          new Card(2, 2, 2, 2),

          newCard,
          newCard,
          newCard
        ];
      }

      nextCard() {
        var card = this.cards[this.index++];
        if (this.index >= this.cards.length) this.index = 0;
        return card;

      }
    }

    beforeEach(() => {
      game = new Game(new Matcher(), new SampleDeck());
    });

    it("should increment score on a good match", () => {
      game.pickCard(0, 0);
      game.pickCard(0, 1);
      game.pickCard(0, 2);
      expect(game.score).toBe(1);
      expect(game.board.cardAt(0,0)).toBe(newCard);
      expect(game.board.cardAt(0,1)).toBe(newCard);
      expect(game.board.cardAt(0,2)).toBe(newCard);
    });

    it("should not increment score on a bad match", () => {
      game.pickCard(0, 0);
      game.pickCard(1, 0);
      game.pickCard(1, 1);
      expect(game.score).toBe(0);
    });

  });

});
