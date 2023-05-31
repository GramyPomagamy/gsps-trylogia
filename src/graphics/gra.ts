import { createHead } from "@vueuse/head";
import { createApp } from "vue";
import App from "./gra/main.vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { MdGamepadRound } from "oh-vue-icons/icons";

addIcons(MdGamepadRound);

const app = createApp(App);
const head = createHead();
app.use(head);
app.component("v-icon", OhVueIcon);
app.mount("#app");
