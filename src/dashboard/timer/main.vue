<template>
  <div v-if="timer && timer.data">
    <div style="text-align: center">
      <h3>
        <b>{{ timer.data.time }}</b>
      </h3>
    </div>
    <div
      style="display: flex; text-align: center; justify-content: space-between"
    >
      <QBtn
        color="primary"
        @click="startTimer"
        :disabled="timer.data.phase === 'finished'"
        >{{
          timer.data.phase === "running" ? "Zapauzuj timer" : "Rozpocznij timer"
        }}</QBtn
      >
      <QBtn
        color="red"
        @click="resetTimer"
        :disabled="timer.data.phase === 'stopped'"
        >Resetuj timer</QBtn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Timer } from "@gsps-trylogia/types/schemas";
import { useReplicant } from "nodecg-vue-composable";
import { useHead } from "@vueuse/head";

useHead({ title: "Timer" });
const timer = useReplicant<Timer>("timer", "gsps-trylogia");

async function startTimer(): Promise<void> {
  try {
    if (timer!.data!.phase === "stopped" || timer!.data!.phase === "paused") {
      await nodecg.sendMessage("timerStart");
    } else if (timer!.data!.phase === "running") {
      await nodecg.sendMessage("timerPause");
    }
  } catch (err) {
    // catch
  }
}
async function resetTimer(): Promise<void> {
  try {
    await nodecg.sendMessage("timerReset", true);
  } catch (err) {
    // error
  }
}
</script>
