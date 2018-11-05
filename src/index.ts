/*
  Goal: create a version of the most commonly used data structure in JS, an array with an object store.
  The array for fast iteration and maintaining order and the object for fast lookup
*/
export class LookupArray<T> extends Array {
  private store: LookupArrayStore<T> = {};
  private defaultOptions: LookupArrayOptions = {
    id: 'id',
    isSorted: false,
    order: 'asc',
    comparator: (a, b) => a[this.options.id] > b[this.options.id]
  };
  private options: LookupArrayOptions;
  constructor(array: T[], options: LookupArrayOptions) {
    super(...(array as any));
    this.options = {
      ...this.defaultOptions,
      ...options
    };
    // Create store with id as keys
    this.store = array.reduce((memo: LookupArrayStore<T>, curr) => {
      const id = (curr as any)[options.id];
      memo[id] = curr;
      return memo;
    }, {});
    return this;
  }
  getById(id: string) {
    return this.store[id];
  }
  sortedInsert(element: T) {
    if (!this.options.isSorted) {
      throw new Error(
        `Performing a sorted insert on an unsorted array. Please manually sort the array first`
      );
    }
    let prev, index, curr;
    for (index = 0; index < this.length; index++) {
      curr = this[index];
      if (!prev) {
        prev = curr;
        continue;
      }
      if (this.options.comparator(curr, prev)) {
        prev = curr;
      } else {
        break;
      }
    }
    this.splice(index, 0, element);
    return this;
  }
}
export type LookupArrayStore<T> = {
  [key: string]: T;
};
export type LookupArrayOptions = {
  id: string;
  isSorted: boolean;
  order: 'asc' | 'desc';
  comparator: (A: any, B: any) => boolean;
};
