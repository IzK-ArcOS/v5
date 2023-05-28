import NotImplemented from "../../../lib/HelpCenter/NotImplemented.svelte";
import type { HelpCenterStore } from "../interface";
import configuration from "./arcterm/configuration";

export default {
  arcterm: {
    title: "ArcTerm",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    sep: true,
  },
  ...configuration,
  arctermMode: {
    title: "ArcTerm Mode",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "arcterm",
  },
} as HelpCenterStore;
