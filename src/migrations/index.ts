import * as migration_20260824_121529 from './20260824_121529';

export const migrations = [
  {
    up: migration_20260824_121529.up,
    down: migration_20260824_121529.down,
    name: '20260824_121529'
  },
];
