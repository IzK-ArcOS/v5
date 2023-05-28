import NotImplemented from "../../../../lib/HelpCenter/NotImplemented.svelte";
import type { HelpCenterStore } from "../../interface";

export default {
  personalizationWindows: {
    title: "Windows",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "personalization",
  },
  personalizationWindowsTitlebar: {
    title: "Titlebar",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "personalizationWindows",
  },
} as HelpCenterStore;
