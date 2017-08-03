import Card from './card';

export default class Matcher {

  isMatchedSet(a, b, c) {
    var matched = true;
    Card.availableAttributes().forEach(
      attribute => {
        matched = matched && this.isAllSameOrDifferent(a.attributes[attribute], b.attributes[attribute], c.attributes[attribute]);
      }
    );
    return matched;
  }

  isAllSameOrDifferent(a, b, c) {
    if (a == b && b == c || a != b && b != c && a != c) return true;
  }

  matchCount(cards) {
    return this.availableMatches(cards).length;
  }

  availableMatches(cards) {
    var found = [];
    for (var a=0; a<cards.length; a++) {
      for (var b=0; b<cards.length; b++) {
        for (var c=0; c<cards.length; c++) {
          if (a !== b && b !== c && c !== a && c > b && b > a) {
            if (this.isMatchedSet(cards[a], cards[b], cards[c])) {
              found.push([cards[a], cards[b], cards[c]]);
              console.log("Match", a,b,c);
            }
          }
        }
      }
    }
    return found;
  }

}
