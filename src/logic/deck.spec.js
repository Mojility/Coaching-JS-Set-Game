import Deck from '../../src/logic/deck';

describe("Deck", () => {

  it("should provide a new card", () => {
    let d =  new Deck();
    expect(d.nextCard()).not.toBeNull();
  });

});
