import "./style.css";

import { FastjsDom, dom } from "jsfast";

import Home from "./pages/home";
import { renderFadeIn } from "./fadeIn";
import { setupRouter } from "./router";

const root = dom.select<FastjsDom<HTMLDivElement>>("#app");

setupRouter(root, {
  pages: [Home],
  notFound: Home,
  hooks: {
    afterNavigate: renderFadeIn,
  },
}).render(root);
