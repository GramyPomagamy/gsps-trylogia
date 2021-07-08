'use strict';

const nodecg = require('./util/nodecg-api-context').get();

const completion = nodecg.Replicant('completion', { defaultValue: "0" });
const song = nodecg.Replicant('nowPlaying');
const logger = new nodecg.Logger(`${nodecg.bundleName}:socket`);
const io = require('socket.io-client');
const socket = io(nodecg.bundleConfig.socketIP + ":" + nodecg.bundleConfig.socketPort);


socket.on('open', () => {
    logger.info('Connected to companion socket.');
});

socket.on('completion', (data) => {
    completion.value = data;
});

socket.on('song', (data) => {
    song.value = data;
});