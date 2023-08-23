export class Cache<T> {
  private _data: T;
  id: string;

  constructor(id: string, initial?: T) {
    this.id = id;

    if (initial) this.set(initial);
  }

  public set(data: T) {
    this._data = data;
  }

  public get() {
    return this._data;
  }

  public clear() {
    this.set(null);
  }
}
