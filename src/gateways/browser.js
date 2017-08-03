const SelectedClassName = "selected";

export class TimerGateway {
  runLater(func, delay) {
    setTimeout(func, delay);
  }
}

export class DOMGateway {

  addClassTo(element, name) {
    element.classList.add(name);
  }

  removeClassFrom(element, name) {
    element.classList.remove(name);
  }

  toggleClassOn(element, name) {
    element.classList.toggle(name);
  }

  markSelection(element) {
    this.addClassTo(element, SelectedClassName);
  }

  clearSelectionMarker(element) {
    this.removeClassFrom(element, SelectedClassName);
  }

  toggleSelectionMarker(element) {
    this.toggleClassOn(element, SelectedClassName);
  }
}
