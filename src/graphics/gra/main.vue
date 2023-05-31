<template><div id="container"></div></template>

<script setup lang="ts">
import { useReplicant } from "nodecg-vue-composable";
import { useHead } from "@vueuse/head";
import { CurrentSplit, Splits, Timer } from "@gsps-trylogia/types/schemas";

useHead({ title: "Główny layout" });

const timer = useReplicant<Timer>("timer", "gsps-trylogia");
const currentSplit = useReplicant<CurrentSplit>(
  "currentSplit",
  "gsps-trylogia"
);
const splits = useReplicant<Splits>("splits", "gsps-trylogia");
</script>

<style>
#container {
  background-image: url("./background.png");
  width: 1920px;
  height: 1030px;
  margin: 0;
  padding: 0;
}
</style>
