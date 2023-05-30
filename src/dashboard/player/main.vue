<template>
  <div v-if="currentPlayer">
    <div style="margin-bottom: 10px; font-size: 20px">
      Obecny gracz: <b>{{ currentPlayer.oldData }}</b>
    </div>
    <div style="display: flex; flex-direction: column; margin-bottom: 15px">
      <QRadio
        v-model="currentPlayer.data"
        v-for="player in players"
        :val="player"
        :label="player"
      />
    </div>

    <QBtn
      color="primary"
      :disable="!currentPlayer.changed"
      @click="currentPlayer?.save()"
      >Zapisz zmiany</QBtn
    >
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { useReplicant } from "nodecg-vue-composable";

useHead({ title: "Wybór gracza" });

const currentPlayer = useReplicant<string>("currentPlayer", "gsps-trylogia", {
  defaultValue: "PokerFacowaty",
});

const players = [
  "hoxi",
  "Mr. Mary",
  "Zaborski",
  "pitpo",
  "zola",
  "Kappajog",
  "Fl1tch",
  "zibson",
];
</script>
