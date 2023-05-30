<template>
  <div
    v-if="
      splits &&
      splits.data &&
      timer &&
      timer.data &&
      currentSplit &&
      currentSplit.data
    "
  >
    <div style="width: 100%; text-align: center">
      <h5>
        Obecna gra: <b>{{ currentSplit.data }}</b>
      </h5>
    </div>
    <QMarkupTable
      style="margin-bottom: 10px"
      separator="cell"
      flat
      bordered
      v-if="splits && splits.data"
    >
      <thead>
        <tr>
          <th class="text-left"><b>Gra</b></th>
          <th class="text-left"><b>+/-</b></th>
          <th class="text-left"><b>Czas splita</b></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="split in splits.data" :key="split.name">
          <td>{{ split.name }}</td>
          <td>{{ split.formattedDelta }}</td>
          <td>{{ split.formattedOriginalTime }}</td>
        </tr>
      </tbody>
    </QMarkupTable>
    <div style="display: flex; flex-direction: row; gap: 15px">
      <QBtn
        color="primary"
        @click="split"
        :disabled="timer.data.phase != 'running'"
        ><template v-if="currentSplit.data === 'GTA: San Andreas'"
          >Zakończ timer</template
        ><template v-else>Następna gra</template></QBtn
      >
      <QBtn color="red" @click="resetSplits">Zresetuj splity</QBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { useReplicant } from "nodecg-vue-composable";
import { Timer, Splits, CurrentSplit } from "@gsps-trylogia/types/schemas";

useHead({ title: "Splity" });

const timer = useReplicant<Timer>("timer", "gsps-trylogia");
const splits = useReplicant<Splits>("splits", "gsps-trylogia");
const currentSplit = useReplicant<CurrentSplit>(
  "currentSplit",
  "gsps-trylogia"
);

async function split(): Promise<void> {
  try {
    nodecg.sendMessage("split");
  } catch (err) {
    // err
  }
}

async function resetSplits(): Promise<void> {
  try {
    nodecg.sendMessage("resetSplits");
  } catch (err) {
    // err
  }
}
</script>
