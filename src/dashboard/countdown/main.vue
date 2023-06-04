<template>
  <div v-if="countdownRunning && countdownRunning.data != undefined">
    <QInput
      v-model="countdownText"
      :disable="countdownRunning.data"
      label="Czas odliczania"
      outlined
      style="margin-bottom: 15px"
    />
    <div style="display: flex; flex-direction: row; gap: 15px">
      <QBtn
        color="primary"
        @click="startCountdown()"
        :disabled="countdownRunning.data || countdownText.length == 0"
        >Rozpocznij</QBtn
      >
      <QBtn
        color="red"
        @click="stopCountdown()"
        :disabled="!countdownRunning.data"
        >Zatrzymaj</QBtn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Countdown, CountdownRunning } from "@gsps-trylogia/types/schemas";
import { useHead } from "@vueuse/head";
import { useReplicant } from "nodecg-vue-composable";
import { ref, watch } from "vue";

useHead({ title: "Odliczanie" });

const countdownText = ref("10:00");
const countdown = useReplicant<Countdown>("countdown", "gsps-trylogia");
const countdownRunning = useReplicant<CountdownRunning>(
  "countdownRunning",
  "gsps-trylogia"
);

function startCountdown() {
  nodecg.sendMessage("startCountdown", countdownText.value);
}

function stopCountdown() {
  nodecg.sendMessage("stopCountdown");
}

watch(
  () => countdown?.data,
  (newVal) => {
    if (newVal) {
      countdownText.value = newVal.formatted;
    }
  },
  { immediate: true }
);
</script>
