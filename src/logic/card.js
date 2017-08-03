import {computedFrom} from 'aurelia-framework';

export default class Card {

  shapes = [ "diamond", "oval", "squiggle" ];
  shadings = [ "outline", "shaded", "solid" ];
  colors = [ "red", "green", "blue" ];

  constructor(color, rank, shape, shading) {
    this.attributes = {
      color: color,
      rank: rank,
      shape: shape,
      shading: shading
    };
  }

  @computedFrom('color', 'shading', 'shape')
  get imageFilename() {
    return "/images/"
      + this.shapes[this.attributes.shape] + "-"
      + this.shadings[this.attributes.shading] + "-"
      + this.colors[this.attributes.color] + ".png";
  }

  get color() {
    return this.attributes.color;
  }

  get rank() {
    return this.attributes.rank;
  }

  get shape() {
    return this.attributes.shape;
  }

  get shading() {
    return this.attributes.shading;
  }

  static availableAttributes() {
    return ['color', 'rank', 'shape', 'shading'];
  }

}
