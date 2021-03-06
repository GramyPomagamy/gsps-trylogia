import {
  replicantModule,
  ReplicantModule,
  ReplicantTypes,
} from '@gsps-trylogia/browser_shared/replicant_store';
import { Countdown, CountdownRunning } from '@gsps-trylogia/types/schemas';
import clone from 'clone';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { Action, getModule, Module, VuexModule } from 'vuex-module-decorators';

Vue.use(Vuex);

@Module({ name: 'OurModule' })
class OurModule extends VuexModule {
  // Helper getter to return all replicants.
  get reps(): ReplicantTypes {
    return this.context.rootState.ReplicantModule.reps;
  }

  // Helper getter to return a specific replicant.
  get countdown(): Countdown {
    return this.reps.countdownReplicant;
  }

  get countdownRunning(): CountdownRunning {
    return this.reps.countdownRunningReplicant;
  }
}

const store = new Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  modules: { ReplicantModule, OurModule },
});
export default store;
export const storeModule = getModule(OurModule, store);
