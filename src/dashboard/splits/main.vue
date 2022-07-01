<template>
  <v-app>
    <div style="width: 100%; text-align: center">
      <h2>Obecna gra: {{ currentSplit }}</h2>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Gra</th>
            <th class="text-right">+/-</th>
            <th class="text-right">Split Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="split in splits" :key="split.name">
            <td>{{ split.name }}</td>
            <td>{{ split.formattedDelta }}</td>
            <td>{{ split.formattedOriginalTime }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn @click="split" :disabled="phase != 'running'"
      ><template v-if="currentSplit === 'GTA: San Andreas'"
        >Zakończ timer</template
      ><template v-else>Następna gra</template></v-btn
    >
    <v-btn @click="resetSplits">Zresetuj splity</v-btn>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import type { Timer, Splits } from "@gsps-trylogia/types/schemas";
import { Getter } from "vuex-class";

@Component
export default class extends Vue {
  @Getter readonly timer!: Timer; // from store.ts
  @Getter readonly splits!: Splits;
  @Getter readonly currentSplit!: string;

  get phase() {
    return this.timer.phase;
  }
  async split(): Promise<void> {
    try {
      nodecg.sendMessage('split')
    } catch (err) {
      // catch
    }
  }
  async resetSplits(): Promise<void> {
    try {
      await nodecg.sendMessage("resetSplits");
    } catch (err) {
      // error
    }
  }
}
</script>