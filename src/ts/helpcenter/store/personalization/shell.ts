import NotImplemented from "../../../../lib/HelpCenter/NotImplemented.svelte";
import type { HelpCenterArticle, HelpCenterStore } from "../../interface";

export default {
  personalizationShell: {
    title: "Shell",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "personalization",
  },
  personalizationShellColoring: {
    title: "Coloring",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "personalizationShell",
  },
  personalizationShellTaskbar: {
    title: "Taskbar",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "personalizationShell",
  },
  personalizationShellStartMenu: {
    title: "Start Menu",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "personalizationShell",
  },
  personalizationShellActionCenter: {
    title: "Action Center",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "personalizationShell",
  },
} as HelpCenterStore;
