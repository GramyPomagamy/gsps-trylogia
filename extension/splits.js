'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const nodecg_1 = require("./util/nodecg");
const replicants_1 = require("./util/replicants");
const helpers_1 = require("./util/helpers");
const splitNames = [
    "GTA III",
    "GTA: Vice City",
    "GTA: San Andreas"
];
function handleSplit() {
    const currentSplitIndex = splitNames.indexOf(replicants_1.currentSplitRep.value);
    if (currentSplitIndex < 2) {
        replicants_1.currentSplitRep.value = splitNames[currentSplitIndex + 1];
    }
    if (currentSplitIndex <= 2) {
        const originalSplitTime = replicants_1.splitsRep.value[currentSplitIndex].originalTime;
        const currentSplitTime = replicants_1.timerRep.value.milliseconds;
        const delta = currentSplitTime - originalSplitTime;
        replicants_1.splitsRep.value[currentSplitIndex].originalTime = currentSplitTime;
        replicants_1.splitsRep.value[currentSplitIndex].formattedOriginalTime = (0, helpers_1.msToTimeStr)(currentSplitTime);
        replicants_1.splitsRep.value[currentSplitIndex].delta = delta;
        replicants_1.splitsRep.value[currentSplitIndex].formattedDelta = (0, helpers_1.deltaToTimeStr)(delta);
    }
    if (currentSplitIndex === 2) {
        (0, nodecg_1.get)().sendMessage('timerFinish');
    }
}
function resetTimerRep() {
    replicants_1.currentSplitRep.value = "GTA III";
    replicants_1.splitsRep.value = [
        {
            name: "GTA III",
            originalTime: 40284000,
            formattedOriginalTime: (0, helpers_1.msToTimeStr)(40284000),
            delta: 0,
            formattedDelta: (0, helpers_1.deltaToTimeStr)(0)
        },
        {
            name: "GTA: Vice City",
            originalTime: 83839000,
            formattedOriginalTime: (0, helpers_1.msToTimeStr)(83839000),
            delta: 0,
            formattedDelta: (0, helpers_1.deltaToTimeStr)(0)
        },
        {
            name: "GTA: San Andreas",
            originalTime: 177395000,
            formattedOriginalTime: (0, helpers_1.msToTimeStr)(177395000),
            delta: 0,
            formattedDelta: (0, helpers_1.deltaToTimeStr)(0)
        }
    ];
    (0, nodecg_1.get)().log.info("[Splity] Zresetowano splity");
}
(0, nodecg_1.get)().listenFor('split', () => {
    handleSplit();
});
(0, nodecg_1.get)().listenFor('resetSplits', () => {
    resetTimerRep();
});
