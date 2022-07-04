"use strict";
/* eslint import/prefer-default-export: off */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetTimer = void 0;
const livesplit_core_1 = __importDefault(require("livesplit-core"));
const helpers_1 = require("./util/helpers");
const nodecg_1 = require("./util/nodecg");
const replicants_1 = require("./util/replicants");
let timer;
// Cross references for LiveSplit's TimerPhases.
const LS_TIMER_PHASE = {
    NotRunning: 0,
    Running: 1,
    Ended: 2,
    Paused: 3,
};
/**
 * Resets timer replicant to default settings.
 */
function resetTimerRepToDefault() {
    replicants_1.timerRep.value = {
        time: "00:00",
        milliseconds: 0,
        timestamp: 0,
        phase: "stopped",
    };
    (0, nodecg_1.get)().log.debug("[Timer] Replicant restored to default");
}
/**
 * Set timer replicant string time and milliseconds based off a millisecond value.
 * @param ms Milliseconds you want to set the timer replicant at.
 */
function setTime(ms) {
    replicants_1.timerRep.value.time = (0, helpers_1.msToTimeStr)(ms);
    replicants_1.timerRep.value.milliseconds = ms;
    // nodecg.log.debug(`[Timer] Set to ${msToTimeStr(ms)}/${ms}`);
}
/**
 * Set game time.
 * Game Time is used so we can edit the timer easily.
 * @param ms Milliseconds you want to set the game time at.
 */
function setGameTime(ms) {
    if (replicants_1.timerRep.value.phase === "stopped") {
        livesplit_core_1.default.TimeSpan.fromSeconds(0).with((t) => timer.setLoadingTimes(t));
        timer.initializeGameTime();
    }
    livesplit_core_1.default.TimeSpan.fromSeconds(ms / 1000).with((t) => timer.setGameTime(t));
    (0, nodecg_1.get)().log.debug(`[Timer] Game time set to ${ms}`);
}
/**
 * Start/resume the timer, depending on the current state.
 * @param force Force the timer to start, even if it's state is running/changes are disabled.
 */
function startTimer(force) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Error if the timer is disabled.
            if (!force) {
                throw new Error("Timer changes are disabled");
            }
            // Error if the timer is finished.
            if (replicants_1.timerRep.value.state === "finished") {
                throw new Error("Timer is in the finished state");
            }
            // Error if the timer isn't stopped or paused (and we're not forcing it).
            if (!force && !["stopped", "paused"].includes(replicants_1.timerRep.value.phase)) {
                throw new Error("Timer is not stopped/paused");
            }
            if (timer.currentPhase() === LS_TIMER_PHASE.NotRunning) {
                timer.start();
                (0, nodecg_1.get)().log.debug("[Timer] Started");
            }
            else {
                timer.resume();
                (0, nodecg_1.get)().log.debug("[Timer] Resumed");
            }
            setGameTime(replicants_1.timerRep.value.milliseconds);
            replicants_1.timerRep.value.phase = "running";
        }
        catch (err) {
            (0, nodecg_1.get)().log.debug("[Timer] Cannot start/resume timer:", err);
            throw err;
        }
    });
}
/**
 * Pause the timer.
 */
function pauseTimer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Error if the timer isn't running.
            if (replicants_1.timerRep.value.phase !== "running") {
                throw new Error("Timer is not running");
            }
            timer.pause();
            replicants_1.timerRep.value.phase = "paused";
            (0, nodecg_1.get)().log.debug("[Timer] Paused");
        }
        catch (err) {
            (0, nodecg_1.get)().log.debug("[Timer] Cannot pause timer:", err);
            throw err;
        }
    });
}
/**
 * Reset the timer.
 * @param force Forces a reset even if changes are disabled.
 */
function resetTimer(force) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Error if the timer is disabled.
            if (!force) {
                throw new Error("Timer changes are disabled");
            }
            // Error if the timer is stopped.
            if (replicants_1.timerRep.value.phase === "stopped") {
                throw new Error("Timer is stopped");
            }
            timer.reset(false);
            resetTimerRepToDefault();
            (0, nodecg_1.get)().log.debug("[Timer] Reset");
        }
        catch (err) {
            (0, nodecg_1.get)().log.debug("[Timer] Cannot reset timer:", err);
            throw err;
        }
    });
}
exports.resetTimer = resetTimer;
/**
 * Stop/finish the timer.
 */
function stopTimer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Error if timer is not running.
            if (!["running", "paused"].includes(replicants_1.timerRep.value.phase)) {
                throw new Error("Timer is not running/paused");
            }
            // Stop the timer if all the teams have finished (or no teams exist).
            if (replicants_1.timerRep.value.state === "paused") {
                timer.resume();
            }
            timer.split();
            replicants_1.timerRep.value.phase = "finished";
            (0, nodecg_1.get)().log.debug("[Timer] Finished");
        }
        catch (err) {
            (0, nodecg_1.get)().log.debug("[Timer] Cannot stop timer:", err);
            throw err;
        }
    });
}
/**
 * This stuff runs every 1/10th a second to keep the time updated.
 */
function tick() {
    if (replicants_1.timerRep.value.phase === "running") {
        // Calculates the milliseconds the timer has been running for and updates the replicant.
        const time = timer
            .currentTime()
            .gameTime();
        const ms = Math.floor(time.totalSeconds() * 1000);
        setTime(ms);
        replicants_1.timerRep.value.timestamp = Date.now();
    }
}
// Sets up the timer with a single split.
const liveSplitRun = livesplit_core_1.default.Run.new();
liveSplitRun.pushSegment(livesplit_core_1.default.Segment.new("finish"));
timer = livesplit_core_1.default.Timer.new(liveSplitRun);
// If the timer was running when last closed, tries to resume it at the correct time.
if (replicants_1.timerRep.value.state === "running") {
    const missedTime = Date.now() - replicants_1.timerRep.value.timestamp;
    const previousTime = replicants_1.timerRep.value.milliseconds;
    const timeOffset = previousTime + missedTime;
    setTime(timeOffset);
    (0, nodecg_1.get)().log.info(`[Timer] Recovered ${(missedTime / 1000).toFixed(2)} seconds of lost time`);
    startTimer(true).catch(() => {
        /* catch error if needed, for safety */
    });
}
// NodeCG messaging system.
(0, nodecg_1.get)().listenFor("timerStart", (data, ack) => {
    startTimer(true)
        .then(() => (0, helpers_1.processAck)(ack, null))
        .catch((err) => (0, helpers_1.processAck)(ack, err));
});
(0, nodecg_1.get)().listenFor("timerPause", (data, ack) => {
    pauseTimer()
        .then(() => (0, helpers_1.processAck)(ack, null))
        .catch((err) => (0, helpers_1.processAck)(ack, err));
});
(0, nodecg_1.get)().listenFor("timerReset", (force, ack) => {
    resetTimer(force)
        .then(() => (0, helpers_1.processAck)(ack, null))
        .catch((err) => (0, helpers_1.processAck)(ack, err));
});
(0, nodecg_1.get)().listenFor("timerFinish", (data, ack) => {
    stopTimer()
        .then(() => (0, helpers_1.processAck)(ack, null))
        .catch((err) => (0, helpers_1.processAck)(ack, err));
});
setInterval(() => {
    tick();
}, 1000);
