import { writable } from "svelte/store";
import HomePage from "../../lib/HelpCenter/HomePage.svelte";
import type { HelpCenterStore } from "./interface";

export const helpCenterArticles: HelpCenterStore = {
  homePage: {
    title: "Home",
    authors: ["Izaak Kuipers"],
    content: HomePage,
    sep: true,
    seeAlso: [],
  },
};

export const currentArticle = writable<string>();
