<template>
  <div id="container">
    <img src="./mainLayout.png" />
    <div id="nameplate"></div>
    <div id="currentGame">
      <span id="currentGameTitle">OBECNA GRA</span>
      <span id="currentGameName">{{ currentSplit }}</span>
    </div>
    <div id="splits">
      <span id="splitsTitle">CZASY UKOŃCZENIA GIER</span>
      <span class="splitsGame" v-for="split in splits" :key="split.name">
        <b>{{ split.name }}</b>
        <template v-if="split.delta != 0">
          - {{ split.formattedOriginalTime }} ({{
            split.formattedDelta
          }})</template
        >
      </span>
    </div>
    <span id="timer" :style="{ color: timerColors[timer.phase] }">{{
      timer.time
    }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import type { Timer, Splits } from "@gsps-trylogia/types/schemas";
import { Getter } from "vuex-class";
// import { replicantNS } from '@nodecg-vue-ts-template/browser_shared/replicant_store';
import { storeModule } from "./store";

@Component
export default class extends Vue {
  @Getter readonly timer!: Timer;
  @Getter readonly splits!: Splits;
  @Getter readonly currentSplit!: string;

  data() {
    return {
      timerColors: {
        running: "white",
        finished: "#ffbd16",
        stopped: "#a5a3a3",
        paused: "#a5a3a3",
      },
    };
  }
}
</script>

<style>
@import url("../css/styles.css");

#container {
  display: flex;
  flex-direction: column;
}

#nameplate {
  top: 492px;
  width: 567px;
  height: 36px;
  background-color: #3a008b;
  text-align: center;
  align-items: center;
  position: absolute;
  font-weight: bold;
  color: white;
  font-size: 26px;
}

#currentGame {
  width: 567px;
  position: absolute;
  top: 536px;
  text-align: center;
  text-shadow: 2px 2px 8px black;
  display: flex;
  flex-direction: column;
}

#currentGameTitle {
  color: white;
  margin-top: 15px;
  font-size: 24px;
  font-weight: bold;
}

#currentGameName {
  color: white;
  margin-top: 15px;
  font-size: 48px;
  font-weight: bold;
}

#splits {
  width: 567px;
  position: absolute;
  top: 640px;
  text-align: center;
  text-shadow: 2px 2px 8px black;
  color: white;
  display: flex;
  flex-direction: column;
}

#splitsTitle {
  color: white;
  margin-top: 50px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.splitsGame {
  margin-bottom: 5px;
  width: 100%;
  font-size: 32px;
}

#timer {
  width: 567px;
  text-align: center;
  font-size: 96px;
  font-weight: bold;
  text-shadow: 2px 2px 8px black;
  position: absolute;
  top: 865px;
  left: 0px;
}
</style>
