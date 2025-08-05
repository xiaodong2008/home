import "./style.scss";

import { FastjsDom } from "jsfast";
import { Page } from "@/router";

const html = (strings: TemplateStringsArray, ...values: any[]) => {
  return strings.reduce((acc, str, i) => {
    return acc + str + (values[i] || "");
  }, "");
};

const page: Page = {
  path: "/",
  load: (root) => {
    root.next<FastjsDom<HTMLAnchorElement>>(".list a")?.set("target", "_blank");
  },
  template: html`
    <div class="home">
      <div class="container">
        <div class="content flex">
          <div class="flex-col c-left">
            <div class="title">
              <div class="name flex c-left gap-8">
                <span class="size-28 weight-[bold]">XiaoDong</span>
                <span class="size-20 color-[gray]">xiaodong2008</span>
              </div>
              <p>
                I'm a software engineer with a passion for building web
                applications.
              </p>
            </div>
          </div>
          <div class="avatar">
            <img src="/avatar.png" alt="avatar" class="rounded wh-100" />
          </div>
        </div>
      </div>
    </div>
  `,
};

export default page;
