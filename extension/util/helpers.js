"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deltaToTimeStr = exports.processAck = exports.sleep = exports.msToTimeStr = exports.timeStrToMS = exports.padTimeNumber = void 0;
const nodecg_1 = require("./nodecg");
const nodecg = (0, nodecg_1.get)();
/**
 * Checks if number needs a 0 adding to the start and does so if needed.
 * @param num Number which you want to turn into a padded string.
 */
function padTimeNumber(num) {
    return num.toString().padStart(2, '0');
}
exports.padTimeNumber = padTimeNumber;
/**
 * Converts a time string (HH:MM:SS) into milliseconds.
 * @param time Time string you wish to convert.
 */
function timeStrToMS(time) {
    const ts = time.split(':');
    if (ts.length === 2) {
        ts.unshift('00'); // Adds 0 hours if they are not specified.
    }
    return Date.UTC(1970, 0, 1, Number(ts[0]), Number(ts[1]), Number(ts[2]));
}
exports.timeStrToMS = timeStrToMS;
/**
 * Converts milliseconds into a time string (HH:MM:SS).
 * @param ms Milliseconds you wish to convert.
 */
function msToTimeStr(ms) {
    let string = '';
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    if (hours > 0) {
        string += `${hours}:`;
    }
    string += `${padTimeNumber(minutes)}:${padTimeNumber(seconds)}`;
    return string;
}
exports.msToTimeStr = msToTimeStr;
/**
 * Allow a script to wait for an amount of milliseconds.
 * @param ms Milliseconds to sleep for.
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
/**
 * Simple helper function to handle NodeCG/our message acknowledgements.
 * @param ack The acknoledgement function itself.
 * @param err Error to supply if any.
 * @param data Anything else you want to send alongside.
 */
function processAck(ack, err, data) {
    if (ack && !ack.handled) {
        ack(err, data);
    }
}
exports.processAck = processAck;
function deltaToTimeStr(ms) {
    let negative;
    if (ms < 0) {
        negative = true;
    }
    let str = '';
    const seconds = Math.floor((Math.abs(ms) / 1000) % 60);
    const minutes = Math.floor((Math.abs(ms) / (1000 * 60)) % 60);
    const hours = Math.floor(Math.abs(ms) / (1000 * 60 * 60));
    if (hours) {
        if (negative) {
            str += `-${hours}:`;
        }
        else {
            str += `${hours}:`;
        }
    }
    str += `${padTimeNumber(Math.abs(minutes))}:${padTimeNumber(Math.abs(seconds))}`;
    if (str.charAt(0) != '-' && ms != 0) {
        str = `+${str}`;
    }
    return str;
}
exports.deltaToTimeStr = deltaToTimeStr;
