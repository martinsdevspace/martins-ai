import * as migration_20260813_020306 from './20260813_020306';

export const migrations = [
  {
    up: migration_20260813_020306.up,
    down: migration_20260813_020306.down,
    name: '20260813_020306'
  },
];
