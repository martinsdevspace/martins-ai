import * as migration_20260813_020306 from './20260813_020306';
import * as migration_20260817_152200 from './20260817_152200';

export const migrations = [
  {
    up: migration_20260813_020306.up,
    down: migration_20260813_020306.down,
    name: '20260813_020306'
  },
  {
    up: migration_20260817_152200.up,
    down: migration_20260817_152200.down,
    name: '20260817_152200'
  },
];
