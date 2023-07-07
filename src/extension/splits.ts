'use strict';

import { get as nodecg } from './util/nodecg';
import { timerRep, currentSplitRep, splitsRep } from './util/replicants';
import { msToTimeStr, deltaToTimeStr } from './util/helpers';

const splitNames: Array<'GTA III' | 'GTA: Vice City' | 'GTA: San Andreas'> = [
  'GTA III',
  'GTA: Vice City',
  'GTA: San Andreas',
];

function handleSplit() {
  const currentSplitIndex = splitNames.indexOf(currentSplitRep.value!);
  if (currentSplitIndex < 2) {
    currentSplitRep.value = splitNames[currentSplitIndex + 1];
  }
  if (currentSplitIndex <= 2) {
    const originalSplitTime = splitsRep.value![currentSplitIndex]!.originalTime;
    const currentSplitTime = timerRep.value!.milliseconds;
    const delta = currentSplitTime - originalSplitTime;
    splitsRep.value![currentSplitIndex]!.originalTime = currentSplitTime;
    splitsRep.value![currentSplitIndex]!.formattedOriginalTime = msToTimeStr(currentSplitTime);
    splitsRep.value![currentSplitIndex]!.delta = delta;
    splitsRep.value![currentSplitIndex]!.formattedDelta = deltaToTimeStr(delta);
  }
  if (currentSplitIndex === 2) {
    nodecg().sendMessage('timerFinish');
  }
}

function resetTimerRep() {
  currentSplitRep.value = 'GTA III';
  splitsRep.value = [
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
  ];
  nodecg().log.info('[Splity] Zresetowano splity');
}

nodecg().listenFor('split', () => {
  handleSplit();
});

nodecg().listenFor('resetSplits', () => {
  resetTimerRep();
});
