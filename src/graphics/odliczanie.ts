import { createHead } from "@vueuse/head";
import { createApp } from "vue";
import App from "./odliczanie/main.vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiMusicNote } from "oh-vue-icons/icons";

addIcons(BiMusicNote);

const app = createApp(App);
const head = createHead();
app.component("v-icon", OhVueIcon);
app.use(head);
app.mount("#app");
