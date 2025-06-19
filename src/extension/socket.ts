import io from 'socket.io-client';
import { get as nodecg } from './util/nodecg';
import { completionRep } from './util/replicants';

const config = nodecg().bundleConfig.socket;
const socket = io('ws://' + config.address + ':' + config.port);

socket.on('connect', () => {
  nodecg().log.info('[Socket] Connected to companion socket.');
});

socket.on('disconnect', () => {
  nodecg().log.info('[Socket] Disconnected from companion socket.');
});

socket.on('completion', (data: string) => {
  completionRep.value = data;
});

