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
      originalTime: 40284000,
      formattedOriginalTime: msToTimeStr(40284000),
      delta: 0,
      formattedDelta: deltaToTimeStr(0),
    },
    {
      name: 'GTA: Vice City',
      originalTime: 83839000,
      formattedOriginalTime: msToTimeStr(83839000),
      delta: 0,
      formattedDelta: deltaToTimeStr(0),
    },
    {
      name: 'GTA: San Andreas',
      originalTime: 177395000,
      formattedOriginalTime: msToTimeStr(177395000),
      delta: 0,
      formattedDelta: deltaToTimeStr(0),
    },
  ],
});
