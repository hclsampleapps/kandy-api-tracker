class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  flush() {
  	return this.height +'x'+this.width;
  }
}
let rect = new Rectangle(10, 20);
console.log(rect.flush());