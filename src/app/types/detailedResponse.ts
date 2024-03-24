import { Results } from './paginatedResponse';

export interface Detailed {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    back_default: string | null;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: Results;
  }[];
  types: {
    slot: number;
    type: Results;
  }[];
}