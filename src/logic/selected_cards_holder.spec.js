import SelectedCardsHolder from '../../src/logic/selected_cards_holder';
import Card from '../../src/logic/card';

class FakeDOMGateway {
  markSelection() {}
  clearSelectionMarker() {}
  toggleSelectionMarker() {}
}

describe("SelectedCardsHolder", () => {

  var fakeDOMGateway = new FakeDOMGateway();
  var selectedCardsHolder;
  var dummy;

  beforeEach(() => {
    spyOn(fakeDOMGateway, "markSelection");
    spyOn(fakeDOMGateway, "clearSelectionMarker");
    selectedCardsHolder = new SelectedCardsHolder(fakeDOMGateway);

    class Dummy {
      fakeFunction() {}
    }

    dummy = new Dummy();
    spyOn(dummy, "fakeFunction");
  });

  it("should accept a card/element pair and mark the dom", () => {
    var element = {};
    let card = new Card();
    selectedCardsHolder.add(card, element);
    expect(fakeDOMGateway.markSelection).toHaveBeenCalledWith(element);
  });

  it("should be empty when initialized", () => {
    expect(selectedCardsHolder.count()).toBe(0);
  });

  it("should not run function when empty", () => {
    selectedCardsHolder.eachDo((i, pair) => dummy.fakeFunction() );
    expect(dummy.fakeFunction).not.toHaveBeenCalled();
  });

  describe("when a card / element have been added", () => {

    var card;
    var element;

    beforeEach(() => {
      element = {};
      card = new Card();
      selectedCardsHolder.add(card, element);
    });

    it("should show a count of 1 when 1 pair added", () => {
      expect(selectedCardsHolder.count()).toBe(1);
    });

    it("should run function once when 1 pair added", () => {
      selectedCardsHolder.eachDo((i, pair) => dummy.fakeFunction() );
      expect(dummy.fakeFunction).toHaveBeenCalledTimes(1);
    });

    it("should be able to find a pair once added", () => {
      var pair = selectedCardsHolder.find(card);
      expect(pair.card).toBe(card);
      expect(pair.element).toBe(element);
    });

    it("should be able to determine if a card is selected", () => {
      expect(selectedCardsHolder.isSelected(card)).toBeTruthy();
    });

    it("should be able to toggle a card out of being selected", () => {
      selectedCardsHolder.toggleSelected(card, element);
      expect(selectedCardsHolder.isSelected(card)).toBeFalsy();
      expect(fakeDOMGateway.clearSelectionMarker).toHaveBeenCalledWith(element);
    });

    it("should be able to toggle a new card into the selection", () => {
      let newElement = {};
      let newCard = new Card();
      selectedCardsHolder.toggleSelected(newCard, newElement);
      expect(selectedCardsHolder.isSelected(newCard)).toBeTruthy();
      expect(fakeDOMGateway.markSelection).toHaveBeenCalledWith(newElement);
    });

    it("should be able to clear all selections", () => {
      selectedCardsHolder.clear();
      expect(selectedCardsHolder.selections.length).toBe(0);
      expect(fakeDOMGateway.clearSelectionMarker).toHaveBeenCalledWith(element);
    });

  });

});

