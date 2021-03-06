import type {
  Timer,
  Splits,
  CountdownRunning,
  Countdown,
} from "@gsps-trylogia/types/schemas";
import clone from "clone";
import type { ReplicantBrowser } from "nodecg/types/browser";
import Vue from "vue";
import type { Store } from "vuex";
import { namespace } from "vuex-class";
import {
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";

// Declaring replicants.
export const reps: {
  timerRep: ReplicantBrowser<Timer>;
  splitsRep: ReplicantBrowser<Splits>;
  currentSplitRep: ReplicantBrowser<string>;
  currentPlayerRep: ReplicantBrowser<string>;
  completionRep: ReplicantBrowser<string>;
  songRep: ReplicantBrowser<string>;
  countdownReplicant: ReplicantBrowser<Countdown>;
  countdownRunningReplicant: ReplicantBrowser<CountdownRunning>;
  [k: string]: ReplicantBrowser<unknown>;
} = {
  timerRep: nodecg.Replicant("timer"),
  splitsRep: nodecg.Replicant("splits"),
  currentSplitRep: nodecg.Replicant("currentSplit"),
  currentPlayerRep: nodecg.Replicant("currentPlayer", {
    defaultValue: "PokerFacowaty",
  }),
  songRep: nodecg.Replicant("nowPlaying", {
    defaultValue: "",
  }),
  completionRep: nodecg.Replicant("completion", {
    defaultValue: "0",
  }),
  countdownReplicant: nodecg.Replicant("countdown", { persistent: false }),
  countdownRunningReplicant: nodecg.Replicant("countdownRunning", {
    persistent: false,
  }),
};

// All the replicant types.
export interface ReplicantTypes {
  timerRep: Timer;
  splitsRep: Splits;
  currentSplitRep: string;
  currentPlayerRep: string;
  songRep: string;
  completionRep: string;
  countdownReplicant: Countdown;
  countdownRunningReplicant: CountdownRunning;
}

@Module({ name: "ReplicantModule", namespaced: true })
export class ReplicantModule extends VuexModule {
  // Replicant values are stored here.
  reps: { [k: string]: unknown } = {};

  get repsTyped(): ReplicantTypes {
    return this.reps as unknown as ReplicantTypes;
  }

  // This sets the state object above when a replicant sends an update.
  @Mutation
  setState({ name, val }: { name: string; val: unknown }): void {
    Vue.set(this.reps, name, clone(val));
  }

  // This is a generic mutation to update a named replicant.
  @Mutation
  setReplicant<K>({ name, val }: { name: string; val: K }): void {
    Vue.set(this.reps, name, clone(val)); // Also update local copy, although no schema validation!
    reps[name].value = clone(val);
  }
}

// eslint-disable-next-line import/no-mutable-exports
export let replicantModule!: ReplicantModule;
export const replicantNS = namespace("ReplicantModule");

export async function setUpReplicants(store: Store<unknown>): Promise<void> {
  // Listens for each declared replicants "change" event, and updates the state.
  Object.keys(reps).forEach((name) => {
    reps[name].on("change", (val) => {
      store.commit("ReplicantModule/setState", { name, val });
    });
  });
  // We should make sure the replicant are ready to be read, needs to be done in browser context.
  await NodeCG.waitForReplicants(...Object.keys(reps).map((key) => reps[key]));
  replicantModule = getModule(ReplicantModule, store);
}
