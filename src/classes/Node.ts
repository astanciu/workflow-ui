import { Point } from './Point';

export class Node {
  public name: string = 'Node';
  public id: string = '0';
  public icon: string = 'gear';
  public position: Point = new Point();
  public selected: boolean = false;
  public outPortOffset = new Point(45, 0);
  public inPortOffset = new Point(-45, 0);
  public highlightInPort: boolean = false;

  constructor(node: any) {
    Object.assign(this, node);
    this.position = new Point(node.position.x, node.position.y);
  }

  get outPortPosition(): Point {
    if (!this.position) return new Point();
    return this.position.add(this.outPortOffset);
  }

  get inPortPosition(): Point {
    if (!this.position) return new Point();
    return this.position.add(this.inPortOffset);
  }

  public clone() {
    return new Node(this);
  }
}
