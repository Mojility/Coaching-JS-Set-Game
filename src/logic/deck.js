import Card from './card';

export default class Deck {

  nextCard() {
    return new Card(this.rand(),this.rand(),this.rand(),this.rand());
    // return new Card(this.rand(),0,0,0);//this.rand(),this.rand(),this.rand());
  }

  rand() {
    return Math.floor(Math.random() * 3);
  }

}
