<template>
  <v-app>
    <v-text-field
      v-model="countdownText"
      :disabled="countdownRunning"
      label="Czas odliczania"
      filled
    ></v-text-field>
    <v-row no-gutters>
      <v-col>
        <v-btn
          @click="startCountdown()"
          :disabled="countdownRunning || countdownText.length == 0"
        >
          <v-icon left>mdi-play</v-icon>Rozpocznij</v-btn
        >
      </v-col>
      <v-col>
        <v-btn @click="stopCountdown()" :disabled="!countdownRunning">
          <v-icon left>mdi-stop</v-icon>Zatrzymaj</v-btn
        >
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator';
  import type { Countdown } from '@gsps-trylogia/types/schemas/countdown';
  import type { CountdownRunning } from '@gsps-trylogia/types/schemas/countdownRunning';
  import { Getter } from 'vuex-class';

  @Component
  export default class extends Vue {
    data() {
      return {
        countdownText: '10:00',
        enteredTime: '10:00',
      };
    }
    @Getter readonly countdown!: Countdown;
    @Getter readonly countdownRunning!: CountdownRunning;

    startCountdown(): void {
      this.$data.enteredTime = this.$data.countdownText;
      nodecg.sendMessage('startCountdown', this.$data.countdownText);
    }

    stopCountdown(): void {
      nodecg.sendMessage('stopCountdown');
      this.$data.countdownText = this.$data.enteredTime;
    }

    mounted() {
      this.$data.countdownText = this.countdown.formatted;
    }

    @Watch('countdown')
    onCountdownChanged(value: Countdown) {
      this.$data.countdownText = value.formatted;
    }
  }
</script>

<style>
  body {
    text-align: center;
  }
</style>
