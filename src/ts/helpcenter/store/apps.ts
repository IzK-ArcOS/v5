import NotImplemented from "../../../lib/HelpCenter/NotImplemented.svelte";
import type { HelpCenterStore } from "../interface";

export default {
  apps: {
    title: "Apps",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    sep: true,
  },
  appsSystem: {
    title: "About System Apps",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "apps",
  },
} as HelpCenterStore;
