<template>
  <div
    class="Flex"
    style="
      width: 100%;
      height: 50px;
      background-color: #e6e6e6;
      color: rgb(60, 60, 60);
    "
  >
    <transition
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutLeft"
      mode="out-in"
      appear
      ><div :key="timestamp" id="cta" v-html="CTAs[currentCTAIndex]"
    /></transition>
    <div id="clock" v-html="clock" />
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { onMounted, ref } from "vue";

const clock = ref(getClockHTML());

function getClockHTML() {
  const date_ob = new Date();
  const hours = ("0" + date_ob.getHours()).slice(-2);
  const minutes = ("0" + date_ob.getMinutes()).slice(-2);
  return `${hours}<span class="blink">:</span>${minutes}`;
}

const CTAs = ref([
  'Dołącz do naszej społeczności na Discordzie na <b class="highlight">gsps.pl/discord</b>!',
  'Jako grupa speedrunnerów GTA, próbujemy właśnie razem ukończyć <b class="highlight">GTA III, Vice City i San Andreas</b> na 100% w jednym podejściu!',
  'Więcej o GSPS (polskim charytatywnym wydarzeniu speedrunningowym) znajdziesz na <b class="highlight">gsps.pl</b>!',
]);
const currentCTAIndex = ref(0);
const timestamp = ref(Date.now());

function setNextCTA() {
  timestamp.value = Date.now();
  currentCTAIndex.value++;
  if (currentCTAIndex.value >= CTAs.value.length) {
    currentCTAIndex.value = 0;
  }
}

onMounted(() => {
  // update clock every half a second
  setInterval(() => {
    clock.value = getClockHTML();
  }, 500);

  // update CTA every 10 seconds
  setInterval(() => {
    setNextCTA();
  }, 10000);
});

useHead({ title: "Omnibar" });
</script>

<style>
@import url("../_misc/style.css");
@import url("../_misc/flex.css");

.Flex {
  justify-content: space-between;
  align-content: space-between;
}

#cta {
  padding-left: 10px;
  font-size: 24px;
}

#clock {
  font-size: 34px;
  align-self: flex-end;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: auto;
  margin-bottom: auto;
  text-align: right;
}

.highlight {
  color: #5f3ac2;
}

.blink {
  animation: blink-animation 1s steps(5, start) infinite;
  -webkit-animation: blink-animation 1s steps(5, start) infinite;
}
@keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
@-webkit-keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
</style>
