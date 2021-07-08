'use strict';

const nodecg = require('./util/nodecg-api-context').get();
const logger = new nodecg.Logger(`${nodecg.bundleName}:splity`);
const SCTimer = nodecg.Replicant('timer', 'nodecg-speedcontrol');

const splitsRep = nodecg.Replicant('splits', { defaultValue: [
    {
        name: "GTA III",
        originalTime: 47203000,
        formattedOriginalTime: msToTimeStr(47203000),
        delta: 0,
        formattedDelta: deltaToTimeStr(0)
    },
    {
        name: "GTA: Vice City",
        originalTime: 103140000,
        formattedOriginalTime: msToTimeStr(103140000),
        delta: 0,
        formattedDelta: deltaToTimeStr(0)
    },
    {
        name: "GTA: San Andreas",
        originalTime: 197828000,
        formattedOriginalTime: msToTimeStr(197828000),
        delta: 0,
        formattedDelta: deltaToTimeStr(0)
    }
]});

const currentSplitRep = nodecg.Replicant('currentSplit', { defaultValue: "GTA III" });

const splitNames = [
    "GTA III",
    "GTA: Vice City",
    "GTA: San Andreas"
]

function handleSplit() {
    const currentSplitIndex = splitNames.indexOf(currentSplitRep.value);
    if (currentSplitIndex < 2) {
        currentSplitRep.value = splitNames[currentSplitIndex + 1];
    }
    if (currentSplitIndex <= 2) {
        const originalSplitTime = splitsRep.value[currentSplitIndex].originalTime;
        const currentSplitTime = SCTimer.value.milliseconds;
        const delta = currentSplitTime - originalSplitTime
        splitsRep.value[currentSplitIndex].originalTime = currentSplitTime;
        splitsRep.value[currentSplitIndex].formattedOriginalTime = msToTimeStr(currentSplitTime);
        splitsRep.value[currentSplitIndex].delta = delta;
        splitsRep.value[currentSplitIndex].formattedDelta = deltaToTimeStr(delta);
    }
    if (currentSplitIndex === 2) {
        const team = {id: "f926048c-3527-4d2f-96f6-680b81bf06e6"}
        nodecg.sendMessageToBundle('timerStop', 'nodecg-speedcontrol', (team, false))
    }
}

function resetTimerRep() {
    currentSplitRep.value = "GTA III";
    splitsRep.value = [
        {
            name: "GTA III",
            originalTime: 47203000,
            formattedOriginalTime: msToTimeStr(47203000),
            delta: 0,
            formattedDelta: deltaToTimeStr(0)
        },
        {
            name: "GTA: Vice City",
            originalTime: 103140000,
            formattedOriginalTime: msToTimeStr(103140000),
            delta: 0,
            formattedDelta: deltaToTimeStr(0)
        },
        {
            name: "GTA: San Andreas",
            originalTime: 197828000,
            formattedOriginalTime: msToTimeStr(197828000),
            delta: 0,
            formattedDelta: deltaToTimeStr(0)
        }
    ];
    logger.info("Zresetowano splity");
}

function msToTimeStr(ms) {
    let str = '';
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    if (hours) {
        str += `${hours}:`
    }
    str += `${padTimeNumber(Math.abs(minutes))}:${padTimeNumber(Math.abs(seconds))}`;
    return str;
}

function deltaToTimeStr(ms) {
    let str = '';
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    if (hours) {
        str += `${hours}:`
    }
    str += `${padTimeNumber(Math.abs(minutes))}:${padTimeNumber(Math.abs(seconds))}`;
    if (str.charAt(0) != '-' && ms != 0) {
        str = `+${str}`;
    }
    return str;
}

function padTimeNumber(num) {
  return num.toString().padStart(2, '0');
}

nodecg.listenFor('split', () => {
    handleSplit();
});

nodecg.listenFor('resetSplits', () => {
    resetTimerRep();
});
