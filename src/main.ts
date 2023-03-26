import { createApp } from "vue";
import App from "./App.vue";

import "./scss/app.scss";
import "bootstrap";

import "./registerServiceWorker";
import router from "./router";

createApp(App).use(router).mount("#app");
