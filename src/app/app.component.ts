import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public set = new DisjointSet();
  public label = 0;
  public foundValue: number = null;

  public add(): void {
    this.set.makeSet(this.label++);
  }

  public find(x: number): void {
    this.foundValue = this.set.find(x);
  }

  instances = [1, 2, 3, 4, 5, 6];

  test() {
    this.instances.forEach((inst) => this.set.makeSet(inst));

    debugger;
    let index = this.instances[0];

    while (this.instances.length) {
      const one = this.instances.findIndex((inst) => inst === index);

      xx[index].forEach((el) => {
        this.set.union(index, el);

        const two = this.instances.findIndex((inst) => inst === el);
        two >= 0 && this.instances.splice(two, 1);
      });

      one >= 0 && this.instances.splice(one, 1);
      index = this.instances[0];
    }

    console.log(this.set.info);
  }
}

class DisjointSet {
  private _parent = [];

  public makeSet(x: number): void {
    this._parent[x] = x;
  }

  public find(x: number): number {
    if (!this._parent[x]) this.makeSet(+x);

    let y = x;

    while (this._parent[y] !== y) {
      y = this._parent[y];
    }

    while (this._parent[x] != x) {
      let z = this._parent[x];
      this._parent[x] = y;
      x = z;
    }

    return y;
  }

  public union(x: number, y: number): number {
    return (this._parent[this.find(+x)] = this.find(+y));
  }

  get info(): { parent: number[]; json: string } {
    return {
      parent: this._parent,
      json: JSON.stringify(this._parent),
    };
  }
}

let xx = {
  1: [3],
  2: [5],
  3: [1, 4],
  4: [3, 5],
  5: [2],
  6: [],
};
