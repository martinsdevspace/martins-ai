import * as migration_20260824_150409 from './20260824_150409';

export const migrations = [
  {
    up: migration_20260824_150409.up,
    down: migration_20260824_150409.down,
    name: '20260824_150409'
  },
];
