<template>
  <div id="container">
    <img id="Logo" src="./gta_trylogia_2022_logo.png" />
    <img id="Background" src="./bg.png" />
    <div id="Countdown">
      <p id="CountdownTitle">ZACZYNAMY ZA</p>
      <div id="CountdownTimer">{{ countdown.formatted }}</div>
    </div>
    <div id="CurrentSong">
      <p id="SongText">OBECNA PIOSENKA</p>
      <div class="marquee" id="SongTitle">
        <p>{{ currentSong }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import type { Countdown } from '@gsps-trylogia/types/schemas';
  import { Getter } from 'vuex-class';

  @Component
  export default class extends Vue {
    @Getter readonly countdown!: Countdown; // from store.ts
    @Getter readonly currentSong!: string;
  }
</script>

<style>
  @import url('../css/styles.css');

  #container {
    text-align: center;
  }

  #Background {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    z-index: -1;
  }

  html {
    display: block;
    width: 1920px;
    height: 1080px;
    background-color: #41228e;
  }

  #Logo {
    margin-top: 60px;
    width: 24%;
  }

  #Countdown {
    position: absolute;
    width: 338px;
    height: 180px;
    left: 791px;
    top: 616px;
  }

  #CountdownTitle {
    position: absolute;
    margin: auto;
    font-size: 28.8px;
    font-weight: bold;
    height: 36px;
    color: white;
    width: 100%;
    text-align: center;
  }

  #CountdownTimer {
    margin-top: 20.4px !important;
    margin-left: 15px;
    margin-right: 15px;
    font-size: 125px;
    color: white !important;
    font-weight: bold;
    margin-bottom: -5px;
    text-shadow: 2px 2px 8px black;
  }

  #CurrentSong {
    position: absolute;
    width: 700px;
    height: 57.6px;
    left: 610px;
    top: 902px;
  }

  #SongText {
    position: absolute;
    margin: auto;
    font-size: 24px;
    font-weight: bold;
    height: 30px;
    color: white;
    width: 100%;
    bottom: 55px;
  }

  #SongTitle {
    margin-top: 2px;
    position: relative;
    font-size: 26.4px;
    color: white;
    margin-left: 12px;
    text-shadow: 2px 2px 8px #000000;
  }
</style>
