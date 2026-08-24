import * as migration_20260822_043559 from './20260822_043559';
import * as migration_20260823_200700 from './20260823_200700';

export const migrations = [
  {
    up: migration_20260822_043559.up,
    down: migration_20260822_043559.down,
    name: '20260822_043559',
  },
  {
    up: migration_20260823_200700.up,
    down: migration_20260823_200700.down,
    name: '20260823_200700'
  },
];
