<template>
  <v-app>
    <div style="margin-bottom: 200px">
      <v-select
        :items="players"
        label="Obecny gracz"
        v-model="selectedPlayer"
        outlined
      />
    </div>
    <v-btn @click="updatePlayer">Zmień obecnego gracza</v-btn>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { storeModule } from "./store";

@Component
export default class extends Vue {
  @Getter readonly currentPlayer!: string; // from store.ts

  data() {
    return {
      selectedPlayer: "PokerFacowaty",
      players: [
        "PokerFacowaty",
        "zola",
        "zibson",
        "Zaborski",
        "pitpo",
        "dexterw",
      ],
    };
  }

  @Watch("currentPlayer")
  onPlayerChange(newVal: string) {
    this.$data.selectedPlayer = newVal;
  }

  mounted() {
    this.$data.selectedPlayer = this.currentPlayer;
  }

  updatePlayer() {
    storeModule.updatePlayer(this.$data.selectedPlayer);
  }
}
</script>
