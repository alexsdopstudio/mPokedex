export interface Paginated {
  count: number;
  next: null | string;
  prev: null | string;
  results: Results[];
}

export interface Results {
  name: string;
  url: string;
}
