import Matcher from '../../src/logic/matcher';
import Card from '../../src/logic/card';

describe("Matcher", () => {

  var m;

  beforeEach(() => {
    m = new Matcher();
  });

  describe("isAllSameOrDifferent", () => {

      it("should match all the same", () => {
        expect(m.isAllSameOrDifferent(0, 0, 0)).toBeTruthy();
      });

      it("should match all different", () => {
        expect(m.isAllSameOrDifferent(0, 1, 2)).toBeTruthy();
      });

      it("should not match if two are the same", () => {
        expect(m.isAllSameOrDifferent(0, 0, 1)).toBeFalsy();
      });

  });

  describe("isMatchedSet", () => {

    it("should be able to match three identical cards", () => {
      let card = new Card(0, 0, 0, 0);

      expect(m.isMatchedSet(card, card, card)).toBeTruthy();
    });

    it("should not fail on this", () => {
      let card1 = new Card(2, 0, 0, 0);
      let card2 = new Card(2, 0, 0, 0);
      let card3 = new Card(0, 0, 0, 0);

      expect(m.isMatchedSet(card1, card2, card3)).toBeFalsy();

    });

  });

});
