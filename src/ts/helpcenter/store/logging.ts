import NotImplemented from "../../../lib/HelpCenter/NotImplemented.svelte";
import type { HelpCenterStore } from "../interface";

export default {
  logging: {
    title: "Logging",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
  },
  loggingTypes: {
    title: "Log Types",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    sep: true,
    parentId: "logging",
  },
  loggingDevTools: {
    title: "Developer Tools",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    sep: true,
    parentId: "logging",
  },
} as HelpCenterStore;
