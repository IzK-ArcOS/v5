import { writable } from "svelte/store";
import HomePage from "../../lib/HelpCenter/HomePage.svelte";
import type { HelpCenterStore } from "./interface";
import NotImplemented from "../../lib/HelpCenter/NotImplemented.svelte";
import personalization from "./store/personalization";
import actioncenter from "./store/actioncenter";
import accounts from "./store/accounts";
import arcterm from "./store/arcterm";
import arcfs from "./store/arcfs";
import arcfind from "./store/arcfind";
import apps from "./store/apps";
import logging from "./store/logging";
import RecentChanges from "../../lib/HelpCenter/RecentChanges.svelte";

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
