import { writable } from "svelte/store";
import HomePage from "../../lib/HelpCenter/HomePage.svelte";
import type { HelpCenterStore } from "./interface";
import NotImplemented from "../../lib/HelpCenter/NotImplemented.svelte";
import personalization from "./store/personalization";

export const helpCenterArticles: HelpCenterStore = {
  homePage: {
    title: "Home",
    content: HomePage,
    sep: true,
    authors: ["Izaak Kuipers"],
  },
  ...personalization,
};

export const currentArticle = writable<string>();
