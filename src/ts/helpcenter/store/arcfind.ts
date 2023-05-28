import NotImplemented from "../../../lib/HelpCenter/NotImplemented.svelte";
import type { HelpCenterStore } from "../interface";

export default {
  arcfind: {
    title: "ArcFind",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    sep: true,
  },
  arcfindTypes: {
    title: "Types of Results",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "arcfind",
  },
  arcfindInitialIndex: {
    title: "Initial Index",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "arcfind",
  },
} as HelpCenterStore;
