"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const nodecg_1 = require("./util/nodecg");
const replicants_1 = require("./util/replicants");
const config = (0, nodecg_1.get)().bundleConfig.socket;
const socket = (0, socket_io_client_1.default)(config.address + ":" + config.port);
socket.on("open", () => {
    (0, nodecg_1.get)().log.info("[Socket] Connected to companion socket.");
});
socket.on("completion", (data) => {
    replicants_1.completionRep.value = data;
});
socket.on("song", (data) => {
    replicants_1.songRep.value = data;
});
