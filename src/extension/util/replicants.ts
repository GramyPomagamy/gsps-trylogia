/* eslint-disable max-len */
import { get as nodecg } from './nodecg';
import { timeStrToMS, deltaToTimeStr } from './helpers';

const splitsTime = nodecg().bundleConfig.splits;

export const timerRep = nodecg().Replicant('timer');
export const splitsTimerRep = nodecg().Replicant('splitsTimer');
export const songRep = nodecg().Replicant('nowPlaying', {
  defaultValue: '',
});
export const completionRep = nodecg().Replicant('completion', {
  defaultValue: '0',
});
export const currentSplitRep = nodecg().Replicant('currentSplit', {
  defaultValue: 'GTA III',
});

export const splitsRep = nodecg().Replicant('splits', {
  defaultValue: [
    {
      name: 'GTA III',
      originalTime: timeStrToMS(splitsTime.GTA3),
      formattedOriginalTime: splitsTime.GTA3,
      delta: 0,
      formattedDelta: deltaToTimeStr(0),
    },
    {
      name: 'GTA: Vice City',
      originalTime: timeStrToMS(splitsTime.GTAVC),
      formattedOriginalTime: splitsTime.GTAVC,
      delta: 0,
      formattedDelta: deltaToTimeStr(0),
    },
    {
      name: 'GTA: San Andreas',
      originalTime: timeStrToMS(splitsTime.GTASA),
      formattedOriginalTime: splitsTime.GTASA,
      delta: 0,
      formattedDelta: deltaToTimeStr(0),
    },
  ],
});
