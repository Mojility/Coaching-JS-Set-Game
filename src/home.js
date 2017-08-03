// System.import('./home.css!');

import {bindable} from 'aurelia-framework';

import Deck from './logic/deck';
import Board from './logic/board';
import Matcher from './logic/matcher';
import SelectedCardsHolder from './logic/selected_cards_holder';
import {TimerGateway, DOMGateway} from './gateways/browser';

export class Home {

  @bindable match;
  @bindable nomatch;

  deck = new Deck();
  rows;

  width = 5;
  height = 4;

  matcher = new Matcher();

  constructor() {
    this.domGateway = new DOMGateway();
    this.selectedCardsHolder = new SelectedCardsHolder(this.domGateway);
    this.timerGateway = new TimerGateway();

    var cards = Array(this.width * this.height).fill().map(() => this.deck.nextCard());
    this.board = new Board(this.width, this.height, cards);

    this.rows = [];
    for (var y = 0; y < this.height; y++) {
      var row = [];
      for (var x = 0; x < this.width; x++) {
        row.push(this.board.cardAt(x, y));
      }
      this.rows.push(row);
    }

    this.canSelect = true;

    // this.timerGateway.runLater(() => this.markHint(), 5000);
  }

  markHint() {
    var availableMatches = this.matcher.availableMatches(this.board.cards);
    var set = availableMatches[Math.random()*availableMatches.length];
    set.forEach(cards => {
      // How do we even find these elements?!
    });
  }

  textForCard(card) {
    return `${card.color} - ${card.shape} - ${card.rank} - ${card.shading}`;
  }

  userClickedCard($event, card) {
    if (this.canSelect) {
      var element = this.findClickedCardElement($event);
      this.toggleSelectedCard(element, card);
    }
  }

  findClickedCardElement($event) {
    // Icky!!!!
    var element;
    if ($event.target.tagName === 'IMG') {
      element = $event.target.parentElement
    } else if ($event.target.tagName === 'CARD-VIEW') {
      element = $event.target.children[0];
    } else {
      element = $event.target;
    }
    return element;
  }

  classNameFor(card) {
    return this.selectedCardsHolder.isSelected(card) ? "selected" : "";
  }

  toggleSelectedCard(element, card) {
    this.selectedCardsHolder.toggleSelected(card, element);

    console.log("Selected cards", this.selectedCardsHolder.selections);

    if (this.selectedCardsHolder.count() === 3) {
      let pairs = this.selectedCardsHolder.selections;
      if (this.matcher.isMatchedSet(pairs[0].card, pairs[1].card, pairs[2].card)) {
        this.userDidFindMatch();
      } else {
        this.userDidNotFindMatch();
      }
    }
  }

  userDidNotFindMatch() {
    this.presentNoMatchFoundAlert();
    this.selectedCardsHolder.clear();
  }

  presentNoMatchFoundAlert() {
    this.domGateway.addClassTo(this.nomatch, "show");
    this.timerGateway.runLater(() => this.domGateway.removeClassFrom(this.nomatch, "show"), 1000);
  }

  userDidFindMatch() {
    this.canSelect = false;
    this.presentMatchFoundAlert();

    var stagger = 75;

    this.selectedCardsHolder.eachDo((i, pair) => {
        const l = i;
        const c = pair.card;
        const e = pair.element;

        this.domGateway.clearSelectionMarker(e);

        // Set up outbound
        this.timerGateway.runLater(() => {
          e.classList.add("out");

          // Replace card & set up inbound
          this.timerGateway.runLater(() => {
            this.board.replaceCard(c, this.deck.nextCard());
            e.classList.add("in");
            e.classList.remove("out");

            // End animation sequence
            this.timerGateway.runLater(() => {
              e.classList.remove("in");
              if (l === this.selectedCardsHolder.count() - 1) {
                this.canSelect = true;
                this.selectedCardsHolder.clear();
                console.log("Available matches", this.matcher.matchCount(this.board.cards));
              }
            }, 300);
          }, 300);
        }, i * stagger);
    });
  }

  presentMatchFoundAlert() {
    this.match.classList.add("show");
    this.timerGateway.runLater(() => this.match.classList.remove("show"), 1000);
  }

}




