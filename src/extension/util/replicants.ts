/* eslint-disable max-len */
import type NodeCG from "@nodecg/types";
import type { Timer, Splits, CurrentSplit } from "@gsps-trylogia/types/schemas";
import { get as nodecg } from "./nodecg";
import { msToTimeStr, deltaToTimeStr } from "./helpers";

export const timerRep = nodecg().Replicant<Timer>(
  "timer"
) as unknown as NodeCG.ServerReplicant<Timer>;
export const songRep = nodecg().Replicant<string>("nowPlaying", {
  defaultValue: "",
}) as unknown as NodeCG.ServerReplicant<string>;
export const completionRep = nodecg().Replicant<string>("completion", {
  defaultValue: "0",
}) as unknown as NodeCG.ServerReplicant<string>;
export const currentSplitRep = nodecg().Replicant<CurrentSplit>(
  "currentSplit",
  {
    defaultValue: "GTA III",
  }
) as unknown as NodeCG.ServerReplicant<string>;
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
}) as unknown as NodeCG.ServerReplicant<Splits>;
