/* eslint-disable max-len */
import { get as nodecg } from './nodecg';
import { msToTimeStr, deltaToTimeStr } from './helpers';

export const timerRep = nodecg().Replicant('timer');
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
      originalTime: 33818000,
      formattedOriginalTime: msToTimeStr(33818000),
      delta: 0,
      formattedDelta: deltaToTimeStr(0),
    },
    {
      name: 'GTA: Vice City',
      originalTime: 80117000,
      formattedOriginalTime: msToTimeStr(80117000),
      delta: 0,
      formattedDelta: deltaToTimeStr(0),
    },
    {
      name: 'GTA: San Andreas',
      originalTime: 173626000,
      formattedOriginalTime: msToTimeStr(173626000),
      delta: 0,
      formattedDelta: deltaToTimeStr(0),
    },
  ],
});
