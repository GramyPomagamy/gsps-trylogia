"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitsRep = exports.currentSplitRep = exports.completionRep = exports.songRep = exports.timerRep = void 0;
const nodecg_1 = require("./nodecg");
const helpers_1 = require("./helpers");
/**
 * This is where you can declare all your replicant to import easily into other files,
 * and to make sure they have any correct settings on startup.
 */
exports.timerRep = (0, nodecg_1.get)().Replicant("timer");
exports.songRep = (0, nodecg_1.get)().Replicant("nowPlaying", {
    defaultValue: "",
});
exports.completionRep = (0, nodecg_1.get)().Replicant("completion", {
    defaultValue: "0",
});
exports.currentSplitRep = (0, nodecg_1.get)().Replicant("currentSplit", {
    defaultValue: "GTA III",
});
exports.splitsRep = (0, nodecg_1.get)().Replicant("splits", {
    defaultValue: [
        {
            name: "GTA III",
            originalTime: 40284000,
            formattedOriginalTime: (0, helpers_1.msToTimeStr)(40284000),
            delta: 0,
            formattedDelta: (0, helpers_1.deltaToTimeStr)(0),
        },
        {
            name: "GTA: Vice City",
            originalTime: 83839000,
            formattedOriginalTime: (0, helpers_1.msToTimeStr)(83839000),
            delta: 0,
            formattedDelta: (0, helpers_1.deltaToTimeStr)(0),
        },
        {
            name: "GTA: San Andreas",
            originalTime: 177395000,
            formattedOriginalTime: (0, helpers_1.msToTimeStr)(177395000),
            delta: 0,
            formattedDelta: (0, helpers_1.deltaToTimeStr)(0),
        },
    ],
});
