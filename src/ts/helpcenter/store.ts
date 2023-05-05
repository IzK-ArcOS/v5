import HomePage from "../../lib/HelpCenter/HomePage.svelte";
import type { HelpCenterStore } from "./interface";

export const helpCenterArticles: HelpCenterStore = {
  homePage: {
    title: "Home",
    authors: ["Izaak Kuipers"],
    content: HomePage,
  },
};
