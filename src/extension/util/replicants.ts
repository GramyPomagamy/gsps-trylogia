/* eslint-disable max-len */
import type { Timer, Splits } from "@gsps-trylogia/types/schemas";
import { get as nodecg } from "./nodecg";
import { msToTimeStr, deltaToTimeStr } from "./helpers";

/**
 * This is where you can declare all your replicant to import easily into other files,
 * and to make sure they have any correct settings on startup.
 */

export const timerRep = nodecg().Replicant<Timer>("timer");
export const songRep = nodecg().Replicant<string>("nowPlaying");
export const completionRep = nodecg().Replicant<string>("completion");
export const currentSplitRep = nodecg().Replicant<string>("currentSplit", {
	defaultValue: "GTA III",
});
export const splitsRep = nodecg().Replicant<Splits>("splits", {
	defaultValue: [
		{
			name: "GTA III",
			originalTime: 40284000,
			formattedOriginalTime: msToTimeStr(40284000),
			delta: 0,
			formattedDelta: deltaToTimeStr(0),
		},
		{
			name: "GTA: Vice City",
			originalTime: 83839000,
			formattedOriginalTime: msToTimeStr(83839000),
			delta: 0,
			formattedDelta: deltaToTimeStr(0),
		},
		{
			name: "GTA: San Andreas",
			originalTime: 177395000,
			formattedOriginalTime: msToTimeStr(177395000),
			delta: 0,
			formattedDelta: deltaToTimeStr(0),
		},
	],
});
