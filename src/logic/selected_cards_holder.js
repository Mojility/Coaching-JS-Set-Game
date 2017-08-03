import CardElementPair from './card_element_pair';

export default class SelectedCardsHolder {
  selections = [];

  constructor(domGateway) {
    this.domGateway = domGateway;
  }

  count() {
    return this.selections.length;
  }

  add(card, element) {
    this.selections.push(new CardElementPair(card, element));
    this.domGateway.markSelection(element);
  }

  remove(card) {
    var pair = this.find(card);
    if (!pair) throw "Card not present";
    this.domGateway.clearSelectionMarker(pair.element);
    this.selections.splice(this.selections.indexOf(pair), 1);
  }

  find(card) {
    return this.selections.find(s => s.card === card);
  }

  clear() {
    this.selections.forEach(p => this.domGateway.clearSelectionMarker(p.element));
    this.selections.length = 0;
  }

  isSelected(card) {
    return this.find(card) !== undefined;
  }

  toggleSelected(card, element) {
    if (this.isSelected(card)) {
      this.remove(card);
    } else {
      this.add(card, element);
    }
  }

  eachDo(func) {
    for (var i = 0; i< this.selections.length; i++) {
      func(i, this.selections[i]);
    }
  }
}
