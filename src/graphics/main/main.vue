<template>
  <div>
    {{ text }}
    <br><br>
    <img src="./image.png">
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import type { Configschema } from '@gsps-trylogia/types/schemas/configschema';
import { Getter } from 'vuex-class';
// import { replicantNS } from '@nodecg-vue-ts-template/browser_shared/replicant_store';
import { storeModule } from './store';

@Component
export default class extends Vue {
  text = 'Example';

  // If you want to just read a replicant without assigning a getter anywhere, you can do this too.
  /* @replicantNS.State(
    (s) => s.reps.exampleReplicant,
  ) readonly exampleReplicant!: ExampleReplicant; */

  // Access the bundle configuration with types.
  config = nodecg.bundleConfig as Configschema;

}
</script>
