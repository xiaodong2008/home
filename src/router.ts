import { type FastjsDom, dom } from "jsfast";

import { renderFadeIn } from "./fadeIn";

export interface Page {
  path: string;
  template?: string;
  load: (root: FastjsDom, router: Router) => void;
  unload?: () => void;
}

export interface Router {
  navigate: (isInit?: boolean) => void;
  render: (root: FastjsDom<any>) => void;
  location: {
    path: string;
    realPath: string;
  };
}

interface Config {
  pages: Page[];
  notFound: Page;
  hooks?: {
    beforeNavigate?: () => void | boolean;
    afterNavigate?: () => void;
  };
}

let isNavigating = false;

export function setupRouter(root: FastjsDom<any>, config: Config): Router {
  console.log(root.el(), dom.newEl("div"));
  root = dom.newEl("div").set("id", "router").push(root, "lastElementChild").el;

  const setup = (page: Page, withTransition = true) => {
    router.location = {
      path: page.path,
      realPath: window.location.pathname,
    };

    if (withTransition) {
      root.addClass("fade").then(() => {
        page.load(root.html(page.template || ""), router);
        root.removeClass("fade");
        config.hooks?.afterNavigate?.();
        end();
      }, 300);
    } else {
      page.load(root.html(page.template || ""), router);
      end();
    }

    function end() {
      isNavigating = false;
      resolveRouterLink(root);
      renderFadeIn();
    }
  };

  function resolveRouterLink(root: FastjsDom) {
    root.next("a")?.forEach((a: FastjsDom) => {
      if (!a.getAttr("href")?.startsWith("/")) return;
      a.addEvent("click", (dom, e) => {
        e.preventDefault();
        window.history.pushState({}, "", a.getAttr("href")!);
        navigate();
      });
    });
  }

  const navigate = (isInit: boolean = false) => {
    if (isNavigating) return;

    const path = window.location.pathname;
    if (router.location.realPath === path) return;

    if (config.hooks?.beforeNavigate?.() === false) return;
    isNavigating = true;
    const page = config.pages.find((p) => p.path === path);
    if (page) setup(page, !isInit);
    else setup(config.notFound, false);
  };

  const router: Router = {
    navigate: () => {},
    render: resolveRouterLink,
    location: {
      path: "",
      realPath: "",
    },
  };

  window.addEventListener("popstate", () => navigate());
  navigate(true);

  return router;
}
