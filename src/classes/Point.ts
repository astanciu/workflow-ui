export class Point {
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  add(point: Point): Point {
    console.log(this.x, point.x);
    return new Point(this.x + point.x, this.y + point.y);
  }
}
