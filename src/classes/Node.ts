import { Point } from './Point';

export class Node {
  public name: string = 'Node';
  public id: string = '0';
  public icon: string = 'gear';
  public position: Point = new Point();
  public selected: boolean = false;
  public outPortOffset = new Point(45, 0);
  public inPortOffset = new Point(-45, 0);

  constructor(node: any) {
    Object.assign(this, node);
    this.position = new Point(node.position.x, node.position.y);
  }

  get outPortPosition(): Point {
    return this.position.add(this.outPortOffset);
  }

  get inPortPosition(): Point {
    return this.position.add(this.inPortOffset);
  }
}
