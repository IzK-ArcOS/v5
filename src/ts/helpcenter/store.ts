import { writable } from "svelte/store";
import HomePage from "../../lib/HelpCenter/HomePage.svelte";
import RecentChanges from "../../lib/HelpCenter/RecentChanges.svelte";
import type { HelpCenterStore } from "./interface";
import accounts from "./store/accounts";
import actioncenter from "./store/actioncenter";
import apps from "./store/apps";
import arcfind from "./store/arcfind";
import arcfs from "./store/arcfs";
import arcterm from "./store/arcterm";
import logging from "./store/logging";
import personalization from "./store/personalization";

export const helpCenterArticles: HelpCenterStore = {
  homePage: {
    title: "Home",
    content: HomePage,
    sep: true,
    authors: ["Izaak Kuipers"],
  },
  homePageChanges: {
    title: "Recent Changes",
    content: RecentChanges,
    authors: ["Izaak Kuipers"],
    parentId: "homePage",
  },
  ...personalization,
  ...actioncenter,
  ...accounts,
  ...arcterm,
  ...arcfs,
  ...arcfind,
  ...apps,
  ...logging,
};

export const currentArticle = writable<string>();
