"use strict";

import io from "socket.io-client";
import { Configschema } from "@gsps-trylogia/types/schemas";
import { get as nodecg } from "./util/nodecg";
import { songRep, completionRep } from "./util/replicants";

const config = (nodecg().bundleConfig as Configschema).socket;
const socket = io(config.address + ":" + config.port);

socket.on("open", () => {
	nodecg().log.info("[Socket] Connected to companion socket.");
});

socket.on("completion", (data: string) => {
	completionRep.value = data;
});

socket.on("song", (data: string) => {
	songRep.value = data;
});
