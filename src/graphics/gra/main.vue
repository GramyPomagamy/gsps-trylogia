<template>
  <div id="container">
    <div id="info" class="Flex">
      <div id="player" v-if="currentPlayer && currentPlayer.data">
        <span
          id="icon"
          style="
            position: absolute;
            left: 5px;
            top: 0px;
          "
          ><v-icon name="md-gamepad-round" scale="1.8"
        /></span>
        <span style="align-self: center">{{ currentPlayer.data }}</span>
      </div>
      <div id="game" class="Flex">
        <p style="font-size: 30px; font-weight: 600">OBECNA GRA</p>
        <p
          v-if="currentSplit && currentSplit.data"
          style="font-weight: 700; margin: 0"
          :style="{
            fontSize:
              currentSplit.data === 'GTA: San Andreas' ? '48px' : '64px',
          }"
          class="shadow"
        >
          {{ currentSplit.data }}
        </p>
        <p style="font-size: 30px" v-if="completion && completion.data">
          <span style="font-weight: 600">POSTĘP UKOŃCZENIA GRY: </span>
          <span style="font-weight: 700">{{ completion.data }}%</span>
        </p>
      </div>
      <div id="timer" v-if="timer && timer.data">
        {{ timer.data.time }}
      </div>
      <div id="splits" class="Flex" v-if="splits && splits.data">
        <p style="font-size: 30px; font-weight: 600">CZASY UKOŃCZENIA GIER</p>
        <div style="margin-bottom: 20px">
          <span class="split" v-for="split in splits.data" :key="split.name"
            ><span
              :style="{
                fontSize:
                  split.name != 'GTA III' && split.delta != 0
                    ? '32px'
                    : '40px',
              }"
              class="shadow"
              >{{ split.name }} </span
            ><span style="font-size: 24px" v-if="split.delta != 0">
              - {{ split.formattedOriginalTime }} ({{
                split.formattedDelta
              }})</span
            ></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReplicant } from "nodecg-vue-composable";
import { useHead } from "@vueuse/head";
import { CurrentSplit, Splits, Timer } from "@gsps-trylogia/types/schemas";

useHead({ title: "Główny layout" });

const currentPlayer = useReplicant<string>("currentPlayer", "gsps-trylogia");
const timer = useReplicant<Timer>("timer", "gsps-trylogia");
const currentSplit = useReplicant<CurrentSplit>(
  "currentSplit",
  "gsps-trylogia"
);
const splits = useReplicant<Splits>("splits", "gsps-trylogia");
const completion = useReplicant<string>("completion", "gsps-trylogia");
</script>

<style>
@import url("../_misc/style.css");

#container {
  background-image: url("./background.png");
  width: 1920px;
  height: 1030px;
  margin: 0;
  padding: 0;
}

#info {
  width: 543px;
  height: 688px;
  position: fixed;
  top: 338px;
  text-align: center;
  justify-content: space-between;
  margin: 0;
}

#game {
  padding: 5px;
  margin: 0;
  flex: 0 0 auto;
  min-height: 0;
  max-height: 300px;
}

#splits {
  min-height: 0;
  gap: 5px;
}

#timer {
  background-color: #e6e6e6;
  color: rgb(60, 60, 60);
  padding: 10px;
  font-size: 64px;
  font-family: "Oswald";
}

#player {
  background-color: #e6e6e6;
  color: rgb(60, 60, 60);
  font-size: 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

.split {
  display: flex;
  flex-direction: row;
  text-align: center;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.Flex {
  display: flex;
  flex-direction: column;
}
</style>
