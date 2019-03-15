import { Node } from './Node';

export class Connection {
  public id: string = '0';
  public from: Node;
  public to: Node;

  constructor(from: Node, to: Node, id?: string) {
    this.from = from;
    this.to = to;
    this.id = id ? id : Math.random() + '';
  }

  clone() {
    return new Connection(this.from, this.to, this.id);
  }
}
