<template>
  <div id="container">
    <div id="logo">
      <img src="../_misc/img/trylogia_logo.png" />
    </div>
    <div
      id="countdown"
      v-if="
        countdown && countdown.data && countdownRunning && countdownRunning.data
      "
    >
      <span id="time">{{ countdown.data.formatted }}</span>
    </div>
    <div id="song" class="Flex">
      <v-icon name="bi-music-note" scale="1.5" />
      <transition
        mode="out-in"
        appear
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <div
          v-if="song && song.data"
          id="song-name"
          class="marquee"
          :key="song.data"
        >
          <p>{{ song.data }}</p>
        </div></transition
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReplicant } from "nodecg-vue-composable";
import { Countdown, CountdownRunning } from "@gsps-trylogia/types/schemas";

const countdown = useReplicant<Countdown>("countdown", "gsps-trylogia");
const countdownRunning = useReplicant<CountdownRunning>(
  "countdownRunning",
  "gsps-trylogia"
);
const song = useReplicant<string>("nowPlaying", "gsps-trylogia");
</script>

<style>
@import url("../_misc/style.css");

#container {
  background-image: url("../_misc/img/main-background.png");
  width: 1920px;
  height: 1030px;
  margin: 0;
  padding: 0;
}

#logo {
  position: fixed;
  top: 180px;
  width: 1920px;
  height: 500px;
  text-align: center;
}

#logo img {
  height: 100%;
}

#countdown {
  font-size: 96px;
  width: 100%;
  text-align: center;
  position: fixed;
  top: 750px;
}

#time {
  text-shadow: 2px 2px 12px black;
}

#song {
  display: flex;
  position: fixed;
  top: 80px;
  background: #e6e6e6;
  height: 32px;
  color: rgb(60, 60, 60);
  width: 25%;
  flex-direction: row;
  gap: 8px;
  font-size: 20px;
  border-radius: 0px 7px 7px 0px;
  align-content: space-between;
  justify-content: space-between;
}

#song-name {
  width: 100%;
  margin-top: -10px;
}
</style>
