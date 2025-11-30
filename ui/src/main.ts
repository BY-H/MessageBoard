import { createApp } from "vue";
import router from "./router/index.ts";
import App from "./App.vue";
import Vant from "vant";
import "vant/lib/index.css";

const app = createApp(App);

app.use(router);
app.use(Vant);

app.mount("#app");
