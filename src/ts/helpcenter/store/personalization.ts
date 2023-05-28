import NotImplemented from "../../../lib/HelpCenter/NotImplemented.svelte";
import type { HelpCenterStore } from "../interface";
import desktop from "./personalization/desktop";
import shell from "./personalization/shell";
import windows from "./personalization/windows";

export default {
  personalization: {
    title: "Personalization",
    content: NotImplemented,
    authors: ["Izaak Kuipers"],
  },
  personalizationPerformance: {
    title: "Performance",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "personalization",
  },
  ...shell,
  ...desktop,
  ...windows,
} as HelpCenterStore;
