<template>
  <div>
    <div id="logoDiv">
      <img id="logo" src="../gspsLogo.png" />
    </div>
    <div id="completion">
      <b>Postęp ukończenia obecnej gry:</b> {{ completion }}%
    </div>
    <div
      v-for="(cta, i) in CTAs"
      class="cta"
      :id="'cta-' + i"
      :key="i"
      v-html="cta"
    />
    <div id="clockDiv">
      <span id="clock">{{ clock }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter } from "vuex-class";
import gsap from "gsap";

@Component
export default class Omnibar extends Vue {
  @Getter readonly completion!: string;

  data() {
    return {
      CTAs: [
        "Dołącz do naszej społeczności na Discordzie na <b>gsps.pl/discord!</b>",
        "Jako grupa speedrunnerów GTA, próbujemy właśnie razem ukończyć <b>GTA III, Vice City i San Andreas</b> na 100% w jednym podejściu!",
        "Więcej o GSPS (polskim charytatywnym wydarzeniu speedrunningowym) znajdziesz na <b>gsps.pl!</b>",
      ],
      clock: "",
      tl: gsap.timeline({ repeat: -1 }),
    };
  }

  getClock(): void {
    var date_ob = new Date();

    let hours = ("0" + date_ob.getHours()).slice(-2);

    let minutes = ("0" + date_ob.getMinutes()).slice(-2);
    this.$data.clock = hours + ":" + minutes;
  }
  mounted() {
    this.getClock();
    setInterval(() => {
      this.getClock();
    }, 1000);

    for (let i = 0; i < this.$data.CTAs.length; i++) {
      this.$data.tl
        .to(`#cta-${i}`, { left: "170px", duration: 2, ease: "power2.out" })
        .to(
          `#cta-${i}`,
          { left: "-1085px", duration: 2, ease: "power2.in" },
          ">6"
        );
    }
  }
}
</script>

<style scoped>
.cta {
  position: absolute;
  top: 27px;
  left: -1085px;
  font-size: 20px;
  color: white;
}

#completion {
  position: absolute;
  top: 5px;
  left: 170px;
  font-size: 20px;
  color: white;
  text-shadow: 2px 2px 8px black;
}

#logoDiv {
  width: 160px;
  height: 66px;
  background-color: #3a008b;
  z-index: 15;
  position: absolute;
}

#logo {
  margin-top: -12px;
  margin-left: -11px;
  width: 115%;
}

#clockDiv {
  position: absolute;
  left: 1759px;
  top: 0px;
  height: 66px;
  width: 161px;
  background-color: #3a008b;
  z-index: 10;
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
  z-index: 15;
}

#clock {
  position: relative;
  color: white;
  top: 1px;
  font-size: 40px;
  font-weight: bold;
}
</style>
