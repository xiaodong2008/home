import "./style.css";

import { FastjsDom } from "jsfast";
import { Page } from "@/router";

const page: Page = {
  path: "/",
  load: (root) => {
    root.next<FastjsDom<HTMLAnchorElement>>(".list a")?.set("target", "_blank");
  },
  template: `
    <div class="home">
      <h1 fade-in="200">Hi, I'm XiaoDong</h1>
      <div class="list">
        <a href="https://resume.xiaodong.moe/" fade-in="1200">About Me</a>
        <a href="https://github.com/xiaodong2008" fade-in="1800">GitHub</a>
        <a href="https://twitter.com/dy_xiaodong" fade-in="2400">Twitter</a>
        <a href="https://xlog.xiaodong.moe" fade-in="3000">Blog</a>
        <a href="mailto:hi@xiaodong.moe" fade-in="3600">Email</a>
      </div>
    </div>
`,
};

export default page;
