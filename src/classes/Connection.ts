import { Node } from './Node';

export class Connection {
  public id: string = '0';
  public from: Node;
  public to: Node;

  constructor(from: Node, to: Node) {
    this.from = from;
    this.to = to;
    this.id = Math.random() + '';
  }
}
