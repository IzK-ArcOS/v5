import { Log } from "./console";

export class Cache<T> {
  private _data: T;
  id: string;

  constructor(id: string, initial?: T) {
    this.id = id;

    if (initial) this.set(initial);
  }

  public set(data: T) {
    console.log(`Cache ${this.id}: set`, `Setting cache`, data);

    this._data = data;
  }

  public get() {
    Log(`Cache ${this.id}: get`, `Getting cache`);

    return this._data;
  }

  public clear() {
    Log(`Cache ${this.id}: clear`, `Clearing cache`);

    this.set(null);
  }
}
