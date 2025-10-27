import "./style.scss";

import { FastjsDom, dom } from "jsfast";

import { Page } from "@/router";

const html = (strings: TemplateStringsArray, ...values: any[]) => {
  return strings.reduce((acc, str, i) => {
    return acc + str + (values[i] || "");
  }, "");
};

const titles = [
  "Software Engineer",
  "Web Developer",
  "Open Source Contributor",
];

const achievements = [
  "HKCERT CTF 2022 Cyber Defense Competition;6th Place",
  "HKIRC 2023 Cybersecurity Challenge;Top 10",
  "Hong Kong Python Application Robot Programming Competition;Second Prize",
  "Hong Kong EDB MVPA60 Application Design Competition;Merit Award",
  "HKCERT CTF 2024 Cyber Defense Competition Preliminaries (Open Category);3rd Runner-up, Representative of Hong Kong University of Science and Technology",
  "HKCERT CTF 2024 Cyber Defense Competition Finals (Open Category);1st Runner-up, Representative of Hong Kong University of Science and Technology",
  "AiTLE x CISCO Hong Kong-Macau Youth Cyber Skills Competition 2025 Finals;Gold Award",
  "WorldSkills Hong Kong 2025 (Web Technologies);The Champion in Hong Kong",
  "iGEM Competition 2025 Paris;Repesentative of Guangzhou Medical University"
];

function randomColor() {
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  // check if color is too white, if so, return a darker color
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  console.log("brightness", brightness);
  if (brightness < 128) {
    return randomColor();
  }

  return color;
}

const page: Page = {
  path: "/",
  load: (root) => {
    root.next<FastjsDom<HTMLAnchorElement>>(".list a")?.set("target", "_blank");

    const titlesContainer = root.next<FastjsDom<HTMLDivElement>>(".titles");
    for (let i = 0; i < titles.length; i++) {
      const dot = dom.newEl("span").set("className", `wh-6 size-12 rounded bgc-[${randomColor()}]`);
      const span = dom.newEl("span").text(titles[i]).set("className", `lh-22 pr-6`);
      titlesContainer.insert(dot, "last");
      titlesContainer.insert(span, "last");
    }

    const achievementsContainer = root.next<FastjsDom<HTMLDivElement>>(".achievements");
    for (let i = 0; i < achievements.length; i++) {
      const [achievement, place] = achievements[i].split(";");
      const span = dom.newEl("div").html(`
        <div class="flex-col">
          <div class="flex c-left gap-8 i-center">
            <span class="dot size-12 rounded wh-6 bgc-[var(--primary-color)]"></span>
            <span class="size-16 weight-600">${achievement}</span>
          </div>
          <span class="size-16 color-[gray] nowrap ml-[14px]">${place}</span>
        </div>
      `);
      span.set("className", ``);
      achievementsContainer.insert(span, "last");
    }
  },
  template: html`
    <div class="home flex-col ph-20 gap-100 i-center">
      <div class="container w-full max-w-800 pv-100 gap-24 flex-col">
        <div class="header flex c-between">
          <div class="flex-col c-left">
            <div class="title flex-col gap-8">
              <div class="name flex c-left gap-8 i-center">
                <span class="size-28 color-[black] weight-[bold]">XiaoDong</span>
                <span class="size-20 color-[var(--primary-color)]">xiaodong2008</span>
              </div>
              <span class="pt-8 block max-w-600">
                I'm a software engineer with a passion for building
                applications. Currently a student in Hong Kong Secondary
                School, also having a full-time job as a software engineer in ShenZhen.
              </span>
              <div class="titles flex gap-8 wrap i-center"></div>
            </div>
          </div>
          <div class="avatar">
            <img src="/avatar.png" alt="avatar" class="rounded wh-100" />
          </div>
        </div>
        <span class="grow bt-1 bc-[#e0e0e0]"></span>
        <div class="achievements flex-col gap-8">
          <span class="title size-24 weight-600 lh-24 pb-8">Achievements</span>
        </div>
        <div class="bottom flex c-between mt-80">
          <span class="size-16 color-[#d4d4d4]">
            © 2025 xiaodong2008 & <a href="https://github.com/fastjs-team/core" class="underline disable-hover-underline" target="_blank">Fastjs</a> & <a class="underline disable-hover-underline" href="https://codenav.dev" target="_blank">CodeNav</a>
          </span>
          <span class="flex gap-16 size-16 color-[var(--primary-color)]">
            <a href="https://github.com/xiaodong2008" target="_blank">GitHub</a>
            <a href="https://github.com/sponsors/xiaodong2008" target="_blank">Sponsor</a>
          </span>
        </div>
      </div>
    </div>
  `,
};

export default page;
