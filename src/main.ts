import "./style.css";

import App from "./App.vue";
import { createApp } from "vue";
import { renderFadeIn } from "./fadeIn";
import { router } from "./router";

createApp(App).use(router).mount("#app");

router.afterEach(() => {
  renderFadeIn();
});
